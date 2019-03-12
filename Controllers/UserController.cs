using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.Entities;

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
            if (ModelState.IsValid)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return new JsonResult(Json(new {success = true, user}));
            }    
            return new JsonResult(Json(new {success = false, ModelState}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newuserphoto")]
        [EnableCors("MyGigCors")]
        public JsonResult NewUserPhoto([FromBody] UserPhoto userPhoto)
        {
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