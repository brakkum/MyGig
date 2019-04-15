using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class EnsembleController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "ensembles";

        public EnsembleController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newensemble")]
        public OkObjectResult NewEnsemble([FromBody] EnsembleDto dto)
        {
            var userId = GetUserId();

            var ensemble = new Ensemble
            {
                Name = dto.Name
            };

            _context.Ensembles.Add(ensemble);

            // Make ensemble creator Mod
            var mod = new EnsembleModerator
            {
                UserIdRecipient = userId,
                UserIdRequester = userId,
                EnsembleId = ensemble.EnsembleId,
                Status = RequestStatus.Accepted
            };
            _context.EnsembleModerators.Add(mod);
            // Make ensemble creator Member
            var mem = new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserIdRecipient = userId,
                UserIdRequester = userId,
                Status = RequestStatus.Accepted
            };
            _context.EnsembleMembers.Add(mem);

            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleId = ensemble.EnsembleId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateensemble")]
        public OkObjectResult InactivateEnsemble([FromBody] EnsembleDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var ensemble = _context.Ensembles.Find(dto.EnsembleId);

            ensemble.Status = EnsembleStatus.Inactive;
            _context.Ensembles.Update(ensemble);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true });
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getensembles")]
        public OkObjectResult GetEnsembles()
        {
            return new OkObjectResult(new {success = true, _context.Ensembles});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newmember")]
        public OkObjectResult NewEnsembleMember([FromBody] EnsembleMember dto)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var ens = _context.Ensembles.Find(dto.EnsembleId);

            _context.EnsembleMembers.Add(new EnsembleMember
            {
                EnsembleId = dto.EnsembleId,
                UserIdRecipient = dto.UserIdRecipient,
                UserIdRequester = userId,
                Text = $"{user.FullName} wants you to join {ens.Name}"
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemembership")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleMemberDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var mem = _context.EnsembleMembers
                .FirstOrDefault(em => em.EnsembleId == dto.EnsembleId &&
                                      em.UserIdRecipient == dto.UserIdRecipient);

            if (mem == null)
            {
                return new OkObjectResult(new {success = false, error = "No member found"});
            }

            mem.Status = RequestStatus.Inactive;
            _context.EnsembleMembers.Update(mem);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addmod")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleModeratorDto dto)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var ens = _context.Ensembles.Find(dto.EnsembleId);

            _context.EnsembleModerators.Add(new EnsembleModerator
            {
                EnsembleId = dto.EnsembleId,
                UserIdRecipient = dto.UserIdRecipient,
                UserIdRequester = userId,
                Text = $"{user.FullName} wants you to moderate {ens.Name}"
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemod")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleModeratorDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var mod = _context.EnsembleModerators
                .FirstOrDefault(em => em.EnsembleId == dto.EnsembleId &&
                                      em.UserIdRecipient == dto.UserIdRecipient);

            if (mod == null)
            {
                return new OkObjectResult(new {success = false, error = "No mod found"});
            }

            mod.Status = RequestStatus.Inactive;
            _context.EnsembleModerators.Update(mod);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newensemblecomment")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleCommentDto dto)
        {
            var userId = GetUserId();

            var validMem = _context.EnsembleMembers
                .Any(em => em.EnsembleId == dto.Id &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMem)
            {
                return new OkObjectResult(new {success = false, error = "Not a valid member"});
            }

            _context.EnsembleComments.Add(new EnsembleComment
            {
                EnsembleId = dto.Id,
                UserId = userId,
                Text = dto.Text,
                Timestamp = DateTime.Now
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getcomments")]
        public OkObjectResult GetEnsembleComments([FromBody] EnsembleCommentDto dto)
        {
            var userId = GetUserId();

            var eventModIds = _context.EnsembleModerators
                .Where(em => em.EnsembleId == dto.Id &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            var ensembleMemberIds = _context.EnsembleMembers
                .Where(e => e.EnsembleId == dto.Id &&
                            e.Status == RequestStatus.Accepted)
                .Select(b => b.UserIdRecipient)
                .ToArray();

            var validMem = ensembleMemberIds.Contains(userId);
            var validMod = eventModIds.Contains(userId);

            if (!(validMem || validMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var userConnectionIds = GetUserConnections(userId);

            var comments = _context.EnsembleComments
                .Include(c => c.User)
                .Where(c => c.EnsembleId == dto.Id)
                .OrderByDescending(c => c.Timestamp)
                .Select(c => new EnsembleCommentDto
                {
                    Text = c.Text,
                    Timestamp = c.Timestamp,
                    User = new MemberDto
                    {
                        FullName = c.User.FullName,
                        PhotoUrl = c.User.PhotoUrl,
                        UserId = c.UserId,
                        ConnectedToUser = userConnectionIds.Contains(c.UserId)
                    }
                });

            return new OkObjectResult(new {success = true, comments});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/ensemblesnotonevent")]
        public OkObjectResult SearchEnsemblesNotOnEvent([FromBody] SearchDto dto)
        {
            var ensemblesRequestedIds = _context.Bookings
                .Where(b => b.EventId == dto.Id)
                .Select(b => b.EnsembleId)
                .ToArray();

            var ensembles = _context.Ensembles
                .Where(e => e.Name.Contains(dto.Search) &&
                            !ensemblesRequestedIds.Contains(e.EnsembleId))
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name
                });

            return new OkObjectResult(new {success = true, ensembles});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/requestbooking")]
        public OkObjectResult RequestBooking([FromBody] BookingDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EventModerators
                .Any(em => em.EventId == dto.EventId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not a valid event mod"});
            }

            var ensembleMod = _context.EnsembleModerators
                .FirstOrDefault(em => em.EnsembleId == dto.EnsembleId &&
                                      em.Status == RequestStatus.Accepted);

            if (ensembleMod == null)
            {
                return new OkObjectResult(new {success = false, error = "No group mod"});
            }

            var user = _context.Users.Find(userId);
            var ensemble = _context.Ensembles.Find(dto.EnsembleId);
            var ev = _context.Events.Find(dto.EventId);

            _context.Bookings.Add(new Booking
            {
                EnsembleId = dto.EnsembleId,
                EventId = dto.EventId,
                UserIdRecipient = ensembleMod.UserIdRecipient,
                UserIdRequester = userId,
                Text = $"{user.FullName} would like your ensemble {ensemble.Name} to perform at the event {ev.Name}"
            });

            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getSetlist")]
        public OkObjectResult EditSetlist([FromBody] BookingDto dto)
        {
            var userId = GetUserId();

            var booking = _context.Bookings.Find(dto.BookingId);
            var ensembleId = booking.EnsembleId;
            var ensembleModIds = _context.EnsembleModerators
                .Where(em => em.EnsembleId == ensembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            var validMod = ensembleModIds.Contains(userId);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not a valid mod"});
            }

            var setlist = booking.Setlist;

            return new OkObjectResult(new {success = true, setlist, ensembleId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updatesetlist")]
        public OkObjectResult UpdateSetlist([FromBody] BookingDto dto)
        {
            var userId = GetUserId();

            var booking = _context.Bookings.Find(dto.BookingId);
            var ensembleId = booking.EnsembleId;
            var ensembleModIds = _context.EnsembleModerators
                .Where(em => em.EnsembleId == ensembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            var validMod = ensembleModIds.Contains(userId);

            if (!validMod)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Not a valid mod"
                });
            }

            booking.Setlist = dto.Setlist;
            _context.Update(booking);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/downloadSetlist")]
        public OkObjectResult DownloadSetlist([FromBody] EnsembleBookingDto dto)
        {
            var userId = GetUserId();

            var booking = _context.Bookings
                .Include(b => b.Event)
                .Include(b => b.Ensemble)
                .FirstOrDefault(b => b.BookingId == dto.BookingId);

            var userIsMember = _context.EnsembleMembers
                .Any(em => em.UserIdRecipient == userId &&
                           em.EnsembleId == booking.EnsembleId &&
                           em.Status == RequestStatus.Accepted);

            if (!userIsMember || booking == null)
            {
                return new OkObjectResult( new
                {
                    success = false,
                    error = "invalid request"
                });
            }

            var setlist = new SetlistDto
            {
                EnsembleName = booking.Ensemble.Name,
                EventName = booking.Event.Name,
                EventLocation = booking.Event.Location,
                DateAndTime = booking.Event.DateAndTime,
                Setlist = booking.Setlist
            };

            return new OkObjectResult(new { success = true, setlist});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/search")]
        public OkObjectResult SearchUsers([FromBody] SearchDto dto)
        {
            var ensembles = _context.Ensembles
                .Where(e => e.Name.Contains(dto.Search))
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name
                });

            return new OkObjectResult(new {success = true, ensembles});
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
            return int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );
        }
    }
}
