using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
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
            var userId = (int)body["UserId"];

            var user = _context.Users
                .Include(u => u.UserPhoto)
                .Include(u => u.ConnectionsByUser)
                .Include(u => u.ConnectionsByOther)
                .Include(u => u.Ensembles)
                .Include(u => u.EventsModerated)
                .ThenInclude(em => em.Event)
                .Include(u => u.EnsemblesModerated)
                .ThenInclude(em => em.Ensemble)
                .Include(u => u.Notifications)
                .FirstOrDefault(u => u.UserId == userId);

            if (user == null)
            {
                return new OkObjectResult(new {success = false, userId});
            }
            return new OkObjectResult(new {success = true, user});
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
