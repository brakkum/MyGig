using System;
using System.IO;
using System.Linq;
using System.Net.Http;
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
        private readonly IHostingEnvironment _env;
        private const string RoutePrefix = "users";
        private const string UserPhotoDir = "static/userphotos/";

        public UserController(MyGigContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
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
        [Route(RoutePrefix + "/newuserphoto")]
        public async Task<IActionResult> NewUserPhoto([FromForm] IFormFile file)
        {
//            var file = HttpContext.Request.Form.Files["file"];
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
                System.IO.File.Delete(oldPhoto);
            }

            using (var fs = System.IO.File.Create(url))
            {
                await file.CopyToAsync(fs);
                fs.Flush();
            }

            user.PhotoUrl = url;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, url});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newconnection")]
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

            var userConnectionIds = GetUserConnections(userId);

            var users = _context.Users
                .Where(u => u.FullName.Contains(dto.Search) && !userConnectionIds.Contains(u.UserId))
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
        [Route(RoutePrefix + "/searchconnections")]
        public OkObjectResult SearchConnections([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var userConnectionIds = GetUserConnections(userId);

            var users = _context.Users
                .Where(u => u.FullName.Contains(dto.Search) && userConnectionIds.Contains(u.UserId))
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
        [Route(RoutePrefix + "/connsnotinensemble")]
        public OkObjectResult SearchConnsNotInEnsemble([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var userConnectionIds = GetUserConnections(userId);

            var ensembleMembersIds = _context.EnsembleMembers
                .Where(em => em.EnsembleId == dto.Id &&
                             em.Status == RequestStatus.Accepted)
                .Select(m => m.UserIdRecipient)
                .ToArray();

            var users = _context.Users
                .Where(u => u.FullName.Contains(dto.Search) &&
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
        [Route(RoutePrefix + "/newpassword")]
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

        public int[] GetUserConnections(int userId)
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
