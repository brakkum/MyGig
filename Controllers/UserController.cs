using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/newuser")]
        public JsonResult NewUser([FromBody] User user)
        {
            // Main sign up point for new users
            // TODO: implement JWT stuff.

            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }
            if (!BCrypt.Net.BCrypt.Verify(user.PasswordConfirm, user.Password))
            {
                ModelState.AddModelError("PasswordConfirm", "Password does not match");
                return new JsonResult(Json(new {success = false, ModelState}));
            }
            _context.Users.Add(user);
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true, user}));
        }

        [HttpPost]
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/getuser")]
        public JsonResult GetUser([FromBody] JObject body)
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
                return new JsonResult(Json(new {success = false, userId}));
            }
            return new JsonResult(Json(new {success = true, user}));
        }

        [HttpPost]
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/newuserphoto")]
        public JsonResult NewUserPhoto([FromBody] UserPhoto userPhoto)
        {
            if (ModelState.IsValid)
            {
                _context.UserPhotos.Add(userPhoto);
                var user = _context.Users.Find(userPhoto.UserId);
                user.UserPhotoId = userPhoto.UserPhotoId;
                _context.SaveChanges();
                return new JsonResult(Json(new {success = true, userPhoto}));
            }
            return new JsonResult(Json(new {success = false, ModelState}));
        }

        [HttpPost]
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/newconnection")]
        public JsonResult NewConnection([FromBody] Connection connection)
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
                return new JsonResult(Json(new {success = false, connection, ModelState}));
            }

            _context.Connections.Add(connection);
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true, connection}));
        }

        [HttpPost]
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/confirmconnection")]
        public JsonResult ConfirmConnection([FromBody] Connection connection)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            var conn = _context.Connections
                .Find(connection.UserIdRequester, connection.UserIdRecipient);
            conn.Status = ConnectionStatus.Accepted;
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true}));
        }

        [HttpPost]
        [EnableCors("MyGigCors")]
        [Route(RoutePrefix + "/denyconnection")]
        public JsonResult DenyConnection([FromBody] Connection connection)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }
            var conn = _context.Connections
                .Find(connection.UserIdRequester, connection.UserIdRecipient);
            conn.Status = ConnectionStatus.Declined;
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true}));
        }
    }
}