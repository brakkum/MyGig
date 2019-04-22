using System.Linq;
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
        [Route(RoutePrefix + "/newEvent")]
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
        [Route(RoutePrefix + "/newMod")]
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
        [Route(RoutePrefix + "/newComment")]
        public OkObjectResult NewPrivateEventComment([FromBody] EventCommentDto dto)
        {
            var userId = GetUserId();

            var ensembles = _context.Bookings
                .Where(ev => ev.EventId == dto.EventId &&
                             ev.Status == RequestStatus.Accepted)
                .Select(ev => ev.EnsembleId);

            var userIsInValidEnsemble = _context.EnsembleMembers
                .Any(em => ensembles.Contains(em.EnsembleId) &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            var userIsEventMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted);

            if (!(userIsInValidEnsemble || userIsEventMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var comment = new EventComment
            {
                EventId = dto.EventId,
                Text = dto.Text,
                UserId = userId
            };

            _context.EventComments.Add(comment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getComments")]
        public OkObjectResult GetEventComments([FromBody] EventCommentDto dto)
        {
            var userId = GetUserId();

            var ensembles = _context.Bookings
                .Where(ev => ev.EventId == dto.EventId)
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
                .Where(c => c.EventId == dto.EventId)
                .OrderByDescending(c => c.Timestamp)
                .Select(c => new EventCommentDto
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
        [Route(RoutePrefix + "/requestBooking")]
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

            // if user is default ensemble mod, immediate accept
            var status = ensembleMod.UserIdRecipient == userId ? RequestStatus.Accepted : RequestStatus.Pending;
            var user = _context.Users.Find(userId);
            var ensemble = _context.Ensembles.Find(dto.EnsembleId);
            var ev = _context.Events.Find(dto.EventId);

            _context.Bookings.Add(new Booking
            {
                EnsembleId = dto.EnsembleId,
                EventId = dto.EventId,
                UserIdRecipient = ensembleMod.UserIdRecipient,
                UserIdRequester = userId,
                Status = status,
                Text = $"{user.FullName} would like your ensemble {ensemble.Name} to perform at the event {ev.Name}"
            });

            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/removeBooking")]
        public OkObjectResult RemoveBooking([FromBody] BookingDto dto)
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

            var booking = _context.Bookings.Find(dto.BookingId);

            _context.Bookings.Remove(booking);
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