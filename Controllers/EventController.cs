using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class EventController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "events";

        public EventController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newevent")]
        public OkObjectResult NewEvent([FromBody] EventDto dto)
        {
            var userId = GetUserId();

            var ev = new Event
            {
                Name = dto.Name,
                Location = dto.Location,
                CreatedByUserId = userId,
                DateAndTime = dto.DateAndTime
            };

            _context.Events.Add(ev);
            _context.EventModerators.Add(new EventModerator
            {
                EventId = ev.EventId,
                UserIdRecipient = userId,
                UserIdRequester = userId,
                Status = RequestStatus.Accepted
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventId = ev.EventId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newmod")]
        public OkObjectResult NewEventModerator([FromBody] EventModeratorDto dto)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var ev = _context.Events.Find(dto.EventId);

            _context.EventModerators.Add(new EventModerator
            {
                EventId = dto.EventId,
                UserIdRecipient = dto.UserIdRecipient,
                UserIdRequester = userId,
                Text = $"{user.FullName} wants you to moderate the event {ev.Name}"
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/invalidatemod")]
        public OkObjectResult InvalidateEventModerator([FromBody] EventModeratorDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var mod = _context.EventModerators
                .FirstOrDefault(em => em.EventId == dto.EventId &&
                                      em.UserIdRecipient == dto.UserIdRecipient &&
                                      em.Status == RequestStatus.Accepted);

            if (mod == null)
            {
                return new OkObjectResult(new {success = false, error = "No mod found"});
            }

            mod.Status = RequestStatus.Inactive;

            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/neweventcomment")]
        public OkObjectResult NewPrivateEventComment([FromBody] EventCommentDto dto)
        {
            var userId = GetUserId();

            var ensembles = _context.Bookings
                .Where(ev => ev.EventId == dto.Id)
                .Select(ev => ev.Ensemble);

            var validUser = ensembles.Any(en =>
                en.Members.Any(u => u.UserIdRecipient == userId &&
                                    u.Status == RequestStatus.Accepted));

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!(validUser || validMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var comment = new EventComment
            {
                EventId = dto.Id,
                Text = dto.Text,
                UserId = userId
            };

            _context.EventComments.Add(comment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getcomments")]
        public OkObjectResult GetEventComments([FromBody] EventCommentDto dto)
        {
            var userId = GetUserId();

            var ensembles = _context.Bookings
                .Where(ev => ev.EventId == dto.Id)
                .Select(ev => ev.Ensemble);

            var validUser = ensembles.Any(en =>
                en.Members.Any(u => u.UserIdRecipient == userId &&
                                    u.Status == RequestStatus.Accepted));

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!(validUser || validMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var userConnectionIds = GetUserConnections(userId);

            var comments = _context.EventComments
                .Include(c => c.User)
                .ThenInclude(u => u.UserPhoto)
                .Where(c => c.EventId == dto.Id)
                .OrderByDescending(c => c.Timestamp)
                .Select(c => new EventCommentDto
                {
                    Text = c.Text,
                    Timestamp = c.Timestamp,
                    User = new MemberDto
                    {
                        FullName = c.User.FullName,
                        PhotoUrl = c.User.UserPhoto.Url,
                        UserId = c.UserId,
                        ConnectedToUser = userConnectionIds.Contains(c.UserId)
                    }
                });

            return new OkObjectResult(new {success = true, comments});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newbooking")]
        public OkObjectResult NewBooking([FromBody] BookingDto dto)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var firstEnsMod = _context.EnsembleModerators
                .Where(em => em.EnsembleId == dto.EnsembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserRecipient)
                .FirstOrDefault();

            if (firstEnsMod == null)
            {
                return new OkObjectResult(new {success = false, error = "Could not find mod of ensemble"});
            }

            var ev = _context.Events.Find(dto.EventId);
            var en = _context.Ensembles.Find(dto.EnsembleId);

            var booking = new Booking
            {
                EnsembleId = dto.EnsembleId,
                UserIdRecipient = firstEnsMod.UserId,
                UserIdRequester = userId,
                EventId = dto.EventId,
                Text = $"{user.FullName} has asked {en.Name} to perform at {ev.Name}"
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addsetlist")]
        public OkObjectResult AddSetlistToBooking([FromBody] BookingSetlistDto dto)
        {
            var userId = GetUserId();
            var ensembleId = _context.Bookings
                .Where(b => b.EventId == dto.Booking.EventId &&
                            b.EnsembleId == dto.Setlist.EnsembleId)
                .Select(b => b.EnsembleId)
                .FirstOrDefault();

            var validMod = _context.EnsembleModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EnsembleId == ensembleId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var bookingSetlist = new BookingSetlist
            {
                SetlistId = dto.SetlistId,
                BookingId = dto.BookingId
            };

            _context.BookingSetlists.Add(bookingSetlist);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
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