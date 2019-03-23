using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.DTOs;
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
        public OkObjectResult NewSetlist([FromBody] SetlistDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var setlist = new Setlist
            {
                EnsembleId = dto.EnsembleId,
                Name = dto.Name
            };

            _context.Setlists.Add(setlist);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, setlistId = setlist.SetlistId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updatesetlist")]
        public OkObjectResult UpdateSetlist([FromBody] SetlistDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var setlist = _context.Setlists.Find(dto.SetlistId);

            setlist.Name = dto.Name;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, setlist});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsetlistcomment")]
        public OkObjectResult NewSetlistComment([FromBody] SetlistCommentDto dto)
        {
            var userId = GetUserId();

            var ensembleId = _context.Setlists
                .Where(s => s.SetlistId == dto.SetlistId)
                .Select(s => s.EnsembleId)
                .FirstOrDefault();

            var validMem = _context.EnsembleMembers
                .Any(em => em.EnsembleId == ensembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMem)
            {
                return new OkObjectResult(new {success = false, error = "Not valid member"});
            }

            var comment = new SetlistComment
            {
                SetlistId = dto.SetlistId,
                Text = dto.Text
            };

            _context.SetlistComments.Add(comment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsong")]
        public OkObjectResult NewSetlist([FromBody] SongDto dto)
        {
            var userId = GetUserId();

            var ensId = _context.Songs
                .Where(s => s.SetlistId == dto.SetlistId)
                .Select(s => s.Setlist.Ensemble.EnsembleId)
                .FirstOrDefault();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == ensId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var song = new Song
            {
                SetlistId = dto.SetlistId,
                YouTubeUrl = dto.YouTubeUrl,
                SetlistPosition = dto.SetlistPosition,
                Name = dto.Name,
                PdfUrl = dto.PdfUrl,
                Artist = dto.Artist
            };

            _context.Songs.Add(song);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, song});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updatesong")]
        public OkObjectResult UpdateSong([FromBody] SongDto dto)
        {
            var userId = GetUserId();

            var ensId = _context.Songs
                .Where(s => s.SetlistId == dto.SetlistId)
                .Select(s => s.Setlist.Ensemble.EnsembleId)
                .FirstOrDefault();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == ensId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var song = new Song
            {
                SongId = dto.SongId,
                SetlistId = dto.SetlistId,
                YouTubeUrl = dto.YouTubeUrl,
                SetlistPosition = dto.SetlistPosition,
                Name = dto.Name,
                PdfUrl = dto.PdfUrl,
                Artist = dto.Artist
            };

            _context.Songs.Update(song);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newsongcomment")]
        public OkObjectResult NewSongComment([FromBody] SongCommentDto dto)
        {
            var userId = GetUserId();

            var ensId = _context.Songs
                .Where(s => s.SongId == dto.SongId)
                .Select(s => s.Setlist.Ensemble.EnsembleId)
                .FirstOrDefault();

            var validMem = _context.EnsembleMembers
                .Any(em => em.EnsembleId == ensId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMem)
            {
                return new OkObjectResult(new {success = false, error = "Not valid member"});
            }

            var comm = new SongComment
            {
                Text = dto.Text,
                SongId = dto.SongId,
                UserId = userId
            };

            _context.SongComments.Add(comm);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        public int GetUserId()
        {
            return int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );
        }
    }
}
