using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;
using Newtonsoft.Json.Linq;

namespace MyGigApi.Controllers
{
    public class UserController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "users";
        private const string UserPhotoDir = "static/userphotos/";

        public UserController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateuser")]
        public OkObjectResult InactivateUser()
        {
            var userId = GetUserId();

            var user = _context.Users.Find(userId);

            user.Status = UserStatus.Inactive;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, user});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getuser")]
        public OkObjectResult GetUser([FromBody] JObject body)
        {
            var requestedUserId = (int)body["UserId"];
            var userId = GetUserId();

            var userConnectionIds = GetUserConnections(userId);

            var requestedUser = _context.Users
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.PhotoUrl,
                    ConnectedToUser = userConnectionIds.Contains(us.UserId)
                }).SingleOrDefault(us => us.UserId == requestedUserId);

            if (requestedUser == null)
            {
                return new OkObjectResult(new {success = false, error = "No user found"});
            }

            return new OkObjectResult(new {success = true, user = requestedUser});
        }

        [HttpPost]
        [Authorize]
        [DisableRequestSizeLimit]
        [Route(RoutePrefix + "/newUserPhoto")]
        public async Task<IActionResult> NewUserPhoto([FromForm] IFormFile file)
        {
            var userId = GetUserId();

            var user = _context.Users.Find(userId);

            if (file == null)
            {
                return new OkObjectResult(new {success = false, error = "Null file"});
            }

            var supportedTypes = new[] {"image/jpeg", "image/png", "image/gif"};

            if (!supportedTypes.Contains(file.ContentType))
            {
                return new OkObjectResult(new {success = false, error = "Unsupported file type, please use an image."});
            }

            Directory.CreateDirectory(UserPhotoDir);

            var fileName = ContentDispositionHeaderValue
                .Parse(file.ContentDisposition)
                .FileName;
            var dateTimeHash = DateTime.Now.Ticks
                .GetHashCode()
                .ToString("x");
            var ext = Path.GetExtension(fileName).ToString();
            var url = Path.Combine(
                UserPhotoDir,
                $"user{userId}_{dateTimeHash}{ext}");

            var oldPhoto = user.PhotoUrl;

            if (oldPhoto != null)
            {
                // remove leading slash
                var photoLocation = oldPhoto.Remove(0, 1);
                System.IO.File.Delete(photoLocation);
            }

            using (var fs = System.IO.File.Create(url))
            {
                await file.CopyToAsync(fs);
                fs.Flush();
            }

            user.PhotoUrl = $"/{url}";
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, url});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newConnection")]
        public OkObjectResult RequestNewConnection([FromBody] ConnectionDto request)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var existingRequest = _context.Connections
                .FirstOrDefault(c => c.UserIdRecipient == userId &&
                                     c.UserIdRequester == request.UserIdRecipient);

            if (existingRequest != null)
            {
                existingRequest.Status = RequestStatus.Accepted;
                _context.SaveChanges();

                return new OkObjectResult(new
                {
                    success = true,
                    info = "Instant accept, other user already requested"
                });
            }

            var alreadyRequested = _context.Connections
                .Any(c => c.UserIdRecipient == request.UserIdRecipient &&
                          c.UserIdRequester == userId);

            if (alreadyRequested)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    info = "Hold your horses"
                });
            }

            _context.Connections.Add(new Connection
            {
                UserIdRecipient = request.UserIdRecipient,
                UserIdRequester = userId,
                Status = RequestStatus.Pending,
                Text = $"{user.FullName} wants to connect with you"
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/search")]
        public OkObjectResult SearchUsers([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var userConnectionIds = GetUserConnectionsAnyStatus(userId);

            var users = _context.Users
                .Where(u => u.FullName.ToLower().Contains(dto.Search.ToLower()) &&
                            !userConnectionIds.Contains(u.UserId))
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.PhotoUrl,
                    MemberSince = us.JoinedOn
                });

            return new OkObjectResult(new {success = true, users});
        }


        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/searchConnections")]
        public OkObjectResult SearchConnections([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var userConnectionIds = GetUserConnections(userId);

            var users = _context.Users
                .Where(u => u.FullName.ToLower().Contains(dto.Search.ToLower()) &&
                            userConnectionIds.Contains(u.UserId))
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.PhotoUrl
                });

            return new OkObjectResult(new {success = true, users});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/searchConnectionsNotInEnsemble")]
        public OkObjectResult SearchConnsNotInEnsemble([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var userConnectionIds = GetUserConnectionsAnyStatus(userId);

            var ensembleMembersIds = _context.EnsembleMembers
                .Where(em => em.EnsembleId == dto.EnsembleId)
                .Select(m => m.UserIdRecipient)
                .ToArray();

            var users = _context.Users
                .Where(u => u.FullName.ToLower().Contains(dto.Search.ToLower()) &&
                            userConnectionIds.Contains(u.UserId) &&
                            !ensembleMembersIds.Contains(u.UserId))
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.PhotoUrl
                });

            return new OkObjectResult(new {success = true, users});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newPassword")]
        public OkObjectResult ChangePassword([FromBody] PasswordChangeDto dto)
        {
            var userId = GetUserId();

            var user = _context.Users.Find(userId);

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.Password) ||
                dto.OldPassword != dto.OldPasswordConfirm)
            {
                return new OkObjectResult(new {success = false, error = "Password mismatch"});
            }

            user.Password = dto.NewPassword;
            _context.Update(user);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getUserInfo")]
        public OkObjectResult GetUserInfo()
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);
            var userConn = _context.Connections
                .FirstOrDefault(c => c.UserIdRecipient == userId &&
                                     c.UserIdRequester == userId);
            var ensembleMemberCount = _context.EnsembleMembers
                .Count(em => em.UserIdRecipient == userId &&
                             em.Status == RequestStatus.Accepted);

            if (userConn == null)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "bad user request"
                });
            }

            var accountDto = new AccountDto
            {
                FullName = user.FullName,
                PhotoUrl = user.PhotoUrl,
                JoinedOn = userConn.Timestamp,
                NumEnsembles = ensembleMemberCount
            };

            return new OkObjectResult(new
            {
                success = true,
                user = accountDto
            });
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getAllConnections")]
        public OkObjectResult GetAllConnections()
        {
            var userId = GetUserId();

            var connA = _context.Connections
                .Where(c => c.UserIdRecipient == userId &&
                            c.UserIdRequester != userId &&
                            c.Status == RequestStatus.Accepted)
                .Select(c => new MemberDto
                {
                    FullName = c.UserRequester.FullName,
                    PhotoUrl = c.UserRequester.PhotoUrl,
                    ConfirmedAt = c.ConfirmedAt,
                    UserId = c.UserIdRequester
                });
            var connB = _context.Connections
                .Where(c => c.UserIdRequester == userId &&
                            c.UserIdRecipient != userId &&
                            c.Status == RequestStatus.Accepted)
                .Select(c => new MemberDto
                {
                    FullName = c.UserRecipient.FullName,
                    PhotoUrl = c.UserRecipient.PhotoUrl,
                    ConfirmedAt = c.ConfirmedAt,
                    UserId = c.UserIdRecipient
                });

            var connections = connA.Concat(connB).ToArray();

            return new OkObjectResult(new {success = true, connections});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/deleteConnection")]
        public OkObjectResult DeleteConnection([FromBody] MemberDto dto)
        {
            var userId = GetUserId();
            var memberId = dto.UserId;

            var conn = _context.Connections
                .FirstOrDefault(c => ((c.UserIdRecipient == userId && c.UserIdRequester == memberId) ||
                                      (c.UserIdRecipient == memberId && c.UserIdRequester == userId)) &&
                                       c.Status == RequestStatus.Accepted);

            if (conn == null)
            {
                return new OkObjectResult(new {success = false, error = "no connection found"});
            }

            _context.Connections.Remove(conn);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        public int[] GetUserConnections(int userId)
        {
            var connA = _context.Connections
                .Where(c => c.UserIdRecipient == userId && c.Status == RequestStatus.Accepted)
                .Select(c => c.UserIdRequester)
                .ToArray();
            var connB = _context.Connections
                .Where(c => c.UserIdRequester == userId && c.Status == RequestStatus.Accepted)
                .Select(c => c.UserIdRecipient)
                .ToArray();

            return connA.Concat(connB).ToArray();
        }

        public int[] GetUserConnectionsAnyStatus(int userId)
        {
            var connA = _context.Connections
                .Where(c => c.UserIdRecipient == userId)
                .Select(c => c.UserIdRequester)
                .ToArray();
            var connB = _context.Connections
                .Where(c => c.UserIdRequester == userId)
                .Select(c => c.UserIdRecipient)
                .ToArray();

            return connA.Concat(connB).ToArray();
        }

        public int GetUserId()
        {
            return int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );
        }
    }
}
