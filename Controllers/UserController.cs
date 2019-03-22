using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public UserController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateuser")]
        public OkObjectResult InactivateUser()
        {
            var userId = int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );

            var user = _context.Users.Find(userId);

            user.Status = UserStatus.Inactive;
            _context.Users.Update(user);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, user});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getuser")]
        public OkObjectResult GetUser([FromBody] JObject body)
        {
            var requestedUserId = (int)body["UserId"];
            var userId = int.Parse(
                User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );

            var requestedUser = _context.Users
                .Include(us => us.UserPhoto)
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.UserPhoto.Url,
                    ConnectedToUser =
                        _context.Connections
                        .Any(u =>
                            // Is this user connected successfully to user?
                            (
                                (
                                    (u.UserIdRecipient == requestedUserId && u.UserIdRequester == userId) ||
                                    (u.UserIdRecipient == userId && u.UserIdRequester == requestedUserId)
                                )
                                && u.Status == RequestStatus.Accepted
                            )
                            // Or are we looking at this logged in user?
                            || requestedUserId == userId
                        )
                }).SingleOrDefault(us => us.UserId == requestedUserId);

            if (requestedUser == null)
            {
                return new OkObjectResult(new {success = false, userId});
            }

            return new OkObjectResult(new {success = true, user = requestedUser});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newuserphoto")]
        public OkObjectResult NewUserPhoto([FromBody] UserPhotoDto userPhotoDto)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, error = "Model invalid"});
            }

            var userId = int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );

            var newPhoto = new UserPhoto
            {
                UserId = userId,
                Url = userPhotoDto.Url
            };

            _context.UserPhotos.Add(newPhoto);

            var user = _context.Users.Find(userId);
            user.UserPhotoId = newPhoto.UserPhotoId;

            _context.SaveChanges();

            return new OkObjectResult(new {success = true, newPhoto});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newconnection")]
        public OkObjectResult RequestNewConnection([FromBody] ConnectionRequestDto connectionRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            var userId = int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );

            var existingRequest = _context.Connections
                .FirstOrDefault(c => c.UserIdRecipient == userId &&
                          c.UserIdRequester == connectionRequestDto.UserIdRecipient);

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

            _context.Connections.Add(new Connection
            {
                UserIdRecipient = connectionRequestDto.UserIdRecipient,
                UserIdRequester = userId
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/confirmconnection")]
        public OkObjectResult ConfirmConnection([FromBody] ConnectionDto connectionDto)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            var conn = _context.Connections
                .Find(connectionDto.RequestId);
            conn.Status = RequestStatus.Accepted;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/denyconnection")]
        public OkObjectResult DenyConnection([FromBody] ConnectionDto connectionDto)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            var conn = _context.Connections
                .Find(connectionDto.RequestId);
            conn.Status = RequestStatus.Denied;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }
    }
}
