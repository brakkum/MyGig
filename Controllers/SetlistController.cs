using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [Route(RoutePrefix + "/newsetlist")]
        public OkObjectResult NewSetlist([FromBody] Setlist setlist)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Setlists.Add(setlist);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, setlist});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updatesetlist")]
        public OkObjectResult UpdateSetlist([FromBody] Setlist setlist)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Setlists.Update(setlist);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, setlist});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsetlistcomment")]
        public OkObjectResult NewSetlistComment([FromBody] SetlistComment setlistComment)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.SetlistComments.Add(setlistComment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, setlistComment});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsong")]
        public OkObjectResult NewSetlist([FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Songs.Add(song);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, song});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updatesong")]
        public OkObjectResult UpdateSong([FromBody] Song song)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Songs.Update(song);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, song});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsongcomment")]
        public OkObjectResult NewSongComment([FromBody] SongComment songComment)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.SongComments.Add(songComment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, songComment});
        }
    }
}
