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
        [Route(RoutePrefix + "/newuser")]
        [EnableCors("MyGigCors")]
        public JsonResult NewUser([FromBody] User user)
        {
            // Main sign up point for new users
            // TODO: implement JWT stuff.

            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState.Keys}));
            }
            if (!BCrypt.Net.BCrypt.Verify(user.PasswordConfirm, user.Password))
            {
                ModelState.AddModelError("PasswordConfirm", "Password does not match");
                return new JsonResult(Json(new {success = false, ModelState.Keys}));
            }
            _context.Users.Add(user);
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true, user}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/getuser")]
        [EnableCors("MyGigCors")]
        public JsonResult GetUser([FromBody] JObject body)
        {
            int userId = (int)body["UserId"];

            User user = _context.Users
                .Include(u => u.UserPhoto)
                .FirstOrDefault(u => u.UserId == userId);

            if (user == null)
            {
                return new JsonResult(Json(new {success = false, userId}));
            }
            return new JsonResult(Json(new {success = true, user}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newuserphoto")]
        [EnableCors("MyGigCors")]
        public JsonResult NewUserPhoto([FromBody] UserPhoto userPhoto)
        {
            // TODO: Update User Entity with UserPhotoId
            if (ModelState.IsValid)
            {
                _context.UserPhotos.Add(userPhoto);
                _context.SaveChanges();
                return new JsonResult(Json(new {success = true, userPhoto}));
            }
            return new JsonResult(Json(new {success = false, ModelState}));
        }
    }
}