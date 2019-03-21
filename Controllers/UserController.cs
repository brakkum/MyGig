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
        public OkObjectResult InactivateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

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
                        _context.Users
                        .Find(us.UserId)
                        .Connections
                        .Any(u =>
                            // Is this user connected successfully to user?
                            (
                                (
                                    (u.UserIdRecipient == requestedUserId && u.UserIdRequester == userId) ||
                                    (u.UserIdRecipient == userId && u.UserIdRequester == requestedUserId)
                                )
                                && u.Status == ConnectionStatus.Accepted
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
        public OkObjectResult NewUserPhoto([FromBody] UserPhoto userPhoto)
        {
            if (ModelState.IsValid)
            {
                _context.UserPhotos.Add(userPhoto);
                var user = _context.Users.Find(userPhoto.UserId);
                user.UserPhotoId = userPhoto.UserPhotoId;
                _context.SaveChanges();
                return new OkObjectResult(new {success = true, userPhoto});
            }
            return new OkObjectResult(new {success = false, ModelState});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newconnection")]
        public OkObjectResult NewConnection([FromBody] Connection connection)
        {
            var alreadyRequested = _context.Connections
                .Any(c => c.UserIdRecipient == connection.UserIdRequester &&
                          c.UserIdRequester == connection.UserIdRecipient);
            if (alreadyRequested)
            {
                ModelState.AddModelError("Key", "Request exists from opposite party");
            }
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, connection, ModelState});
            }

            _context.Connections.Add(connection);
            _context.SaveChanges();
            return new OkObjectResult(new {success = true, connection});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/confirmconnection")]
        public OkObjectResult ConfirmConnection([FromBody] Connection connection)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            var conn = _context.Connections
                .Find(connection.UserIdRequester, connection.UserIdRecipient);
            conn.Status = ConnectionStatus.Accepted;
            _context.SaveChanges();
            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/denyconnection")]
        public OkObjectResult DenyConnection([FromBody] Connection connection)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }
            var conn = _context.Connections
                .Find(connection.UserIdRequester, connection.UserIdRecipient);
            conn.Status = ConnectionStatus.Declined;
            _context.SaveChanges();
            return new OkObjectResult(new {success = true});
        }
    }
}
