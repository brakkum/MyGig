using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class SetlistController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "setlists";

        public SetlistController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route(RoutePrefix + "/newsetlist")]
        [EnableCors("MyGigCors")]
        public JsonResult NewSetlist([FromBody] Setlist setlist)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Setlists.Add(setlist);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, setlist}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/updatesetlist")]
        [EnableCors("MyGigCors")]
        public JsonResult UpdateSetlist([FromBody] Setlist setlist)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Setlists.Update(setlist);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, setlist}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newsetlistcomment")]
        [EnableCors("MyGigCors")]
        public JsonResult NewSetlistComment([FromBody] SetlistComment setlistComment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.SetlistComments.Add(setlistComment);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, setlistComment}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newsong")]
        [EnableCors("MyGigCors")]
        public JsonResult NewSetlist([FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Songs.Add(song);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, song}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/updatesong")]
        [EnableCors("MyGigCors")]
        public JsonResult UpdateSong([FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Songs.Update(song);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, song}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newsongcomment")]
        [EnableCors("MyGigCors")]
        public JsonResult NewSongComment([FromBody] SongComment songComment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.SongComments.Add(songComment);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, songComment}));
        }
    }
}
