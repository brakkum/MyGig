using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class RoutesController : ApiBaseController
    {
        private const string RoutePrefix = "routes";
        private readonly MyGigContext _context;

        public RoutesController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/home")]
        public OkObjectResult GetHomePage()
        {
            // TODO: Clean up entire method
            var userId = GetUserId();

            var userExists = _context.Users.Any(u => u.UserId == userId);

            if (!userExists)
            {
                return new OkObjectResult(new {success = false, error = "No User"});
            }

            var ensemblesAsMember = _context.EnsembleMembers
                .Where(e => e.UserIdRecipient == userId && e.Status == RequestStatus.Accepted)
                .Select(e => e.EnsembleId)
                .ToArray();

            var ensemblesAsMod = _context.EnsembleModerators
                .Where(e => e.UserIdRecipient == userId && e.Status == RequestStatus.Accepted)
                .Select(e => e.EnsembleId)
                .ToArray();

            var ensembleIds = ensemblesAsMember.Concat(ensemblesAsMod).Distinct();

            var ensembles = _context.Ensembles
                .Where(e => ensembleIds.Contains(e.EnsembleId))
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name,
                    UserIsMod = ensemblesAsMod.Contains(e.EnsembleId)
                });

            var eventsModeratedIds = _context.EventModerators
                .Where(em => em.UserIdRecipient == userId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.EventId)
                .ToArray();

            var eventsFromEnsemblesIds = _context.Bookings
                .Where(b => ensembleIds.Contains(b.EnsembleId) &&
                            b.Status == RequestStatus.Accepted)
                .Select(b => b.EventId)
                .ToArray();

            var performances = _context.Bookings
                .Where(b => eventsFromEnsemblesIds.Contains(b.EventId))
                .Select(b => new EnsembleBookingDto
                {
                    EventName = b.Event.Name,
                    EventLocation = b.Event.Location,
                    EnsembleName = b.Ensemble.Name,
                    EnsembleId = b.EnsembleId,
                    EventId = b.EventId,
                    DateAndTime = b.Event.DateAndTime,
                    UserIsMod = ensemblesAsMod.Contains(b.EnsembleId),
                    BookingId = b.BookingId,
                    Setlist = b.Setlist
                });

            var eventIds = eventsModeratedIds
                .Concat(eventsFromEnsemblesIds)
                .Distinct()
                .ToArray();

            var events = _context.Events
                .Where(e => eventIds.Contains(e.EventId))
                .Select(e => new EventDto
                {
                    EventId = e.EventId,
                    Name = e.Name,
                    DateAndTime = e.DateAndTime,
                    Location = e.Location
                });

            var notifications = _context.Notifications
                .Where(n => n.UserId == userId &&
                            n.Status == NotificationStatus.Unseen)
                .Select(n => new NotificationDto
                {
                    Url = n.Url,
                    DisplayMessage = n.Text,
                    Timestamp = n.Timestamp
                });

            // Requests extravaganza
            var bookings = _context.Bookings
                .Where(b => b.UserIdRecipient == userId
                            && b.Status == RequestStatus.Pending)
                .Select(b => new RequestDto
                {
                    RequestType = RequestType.Booking,
                    TypeId = b.BookingId,
                    Text = b.Text,
                    Timestamp = b.Timestamp,
                    UserPhoto = b.UserRequester.PhotoUrl
                });

            var connections = _context.Connections
                .Where(c => c.UserIdRecipient == userId
                            && c.Status == RequestStatus.Pending)
                .Select(c => new RequestDto
                {
                    RequestType = RequestType.Connection,
                    TypeId = c.ConnectionId,
                    Text = c.Text,
                    Timestamp = c.Timestamp,
                    UserPhoto = c.UserRequester.PhotoUrl
                });

            var ensMems = _context.EnsembleMembers
                .Where(em => em.UserIdRecipient == userId
                            && em.Status == RequestStatus.Pending)
                .Select(em => new RequestDto
                {
                    RequestType = RequestType.EnsembleMember,
                    TypeId = em.EnsembleMemberId,
                    Text = em.Text,
                    Timestamp = em.Timestamp,
                    UserPhoto = em.UserRequester.PhotoUrl
                });

            var ensMods = _context.EnsembleModerators
                .Where(em => em.UserIdRecipient == userId
                            && em.Status == RequestStatus.Pending)
                .Select(em => new RequestDto
                {
                    RequestType = RequestType.EnsembleModerator,
                    TypeId = em.EnsembleModeratorId,
                    Text = em.Text,
                    Timestamp = em.Timestamp,
                    UserPhoto = em.UserRequester.PhotoUrl
                });

            var evMods = _context.EventModerators
                .Where(em => em.UserIdRecipient == userId
                             && em.Status == RequestStatus.Pending)
                .Select(em => new RequestDto
                {
                    RequestType = RequestType.EventModerator,
                    TypeId = em.EventModeratorId,
                    Text = em.Text,
                    Timestamp = em.Timestamp,
                    UserPhoto = em.UserRequester.PhotoUrl
                });

            var requests = bookings
                .Concat(connections)
                .Concat(ensMems)
                .Concat(ensMods)
                .Concat(evMods);

            return new OkObjectResult(new
            {
                success = true,
                ensembles,
                notifications,
                requests = requests
                    .OrderBy(r => r.Timestamp),
                performances,
                events
            });
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/event")]
        public OkObjectResult GetEventPage([FromBody] EventDto dto)
        {
            var userId = GetUserId();

            var eventModIds = _context.EventModerators
                .Where(em => em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            var ensembleIds = _context.Bookings
                .Where(b => b.EventId == dto.EventId &&
                            b.Status == RequestStatus.Accepted)
                .Select(b => b.EnsembleId)
                .ToArray();

            var validMem = _context.EnsembleMembers
                .Any(em => em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted &&
                           ensembleIds.Contains(em.EnsembleId));
            var validMod = eventModIds.Contains(userId);

            if (!(validMem || validMod))
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Not valid mod or ensemble member"
                });
            }

            var userConnectionIds = GetUserConnections(userId);

            var ensembles = _context.Bookings
                .Include(b => b.Ensemble)
                .Where(b => b.EventId == dto.EventId && b.Status == RequestStatus.Accepted)
                .Select(b => new EnsembleDto
                {
                    Name = b.Ensemble.Name,
                    Members = b.Ensemble.Members
                        .Select(m => new MemberDto
                        {
                            FullName = m.UserRecipient.FullName,
                            PhotoUrl = m.UserRecipient.PhotoUrl,
                            UserId = m.UserIdRecipient,
                            ConnectedToUser = userConnectionIds.Contains(m.UserIdRecipient)
                        }).ToList() as ICollection<MemberDto>
                }).ToList() as ICollection<EnsembleDto>;

            var comments = _context.EventComments
                .Where(ec => ec.EventId == dto.EventId)
                .OrderByDescending(ec => ec.Timestamp)
                .Select(ec => new EventCommentDto
                {
                    Text = ec.Text,
                    Timestamp = ec.Timestamp,
                    User = new MemberDto
                    {
                        FullName = ec.User.FullName,
                        PhotoUrl = ec.User.PhotoUrl,
                        UserId = ec.UserId,
                        ConnectedToUser = userConnectionIds.Contains(ec.UserId)
                    }
                })
                .ToList() as ICollection<EventCommentDto>;

            var ev = _context.Events
                .Where(e => e.EventId == dto.EventId)
                .Select(e => new EventDto
                {
                    Name = e.Name,
                    Ensembles = ensembles,
                    DateAndTime = e.DateAndTime,
                    EventId = e.EventId,
                    Location = e.Location,
                    Comments = comments,
                    UserIsMod = validMod
                }).FirstOrDefault();

            return new OkObjectResult(new
            {
                success = true,
                ev
            });
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/ensemble")]
        public OkObjectResult GetEnsemblePage([FromBody] EnsembleDto dto)
        {
            var userId = GetUserId();

            var ensMems = _context.EnsembleMembers
                .Where(em => em.EnsembleId == dto.EnsembleId &&
					   em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient).ToArray();

            var ensMods = _context.EnsembleModerators
                .Where(em => em.EnsembleId == dto.EnsembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient).ToArray();

            var validMem = ensMems.Contains(userId);
            var validMod = ensMods.Contains(userId);

            if (!(validMem || validMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var events = _context.Bookings
                .Include(b => b.Event)
                .Where(b => b.EnsembleId == dto.EnsembleId && b.Status == RequestStatus.Accepted)
                .Select(b => new EnsembleBookingDto
                {
                    EventName = b.Event.Name,
                    EventLocation = b.Event.Location,
                    DateAndTime = b.Event.DateAndTime,
                    BookingId = b.BookingId,
                    Setlist = b.Setlist
                }).ToList() as ICollection<EnsembleBookingDto>;

            var userConnectionIds = GetUserConnections(userId);

            var comments = _context.EnsembleComments
                .Where(ec => ec.EnsembleId == dto.EnsembleId)
                .OrderByDescending(ec => ec.Timestamp)
                .Select(ec => new EnsembleCommentDto
                {
                    Id = ec.EnsembleCommentId,
                    Text = ec.Text,
                    Timestamp = ec.Timestamp,
                    User = new MemberDto
                    {
                        FullName = ec.User.FullName,
                        PhotoUrl = ec.User.PhotoUrl,
                        UserId = ec.UserId,
                        ConnectedToUser = validMod
                    }
                })
                .ToList() as ICollection<EnsembleCommentDto>;

            var members = _context.EnsembleMembers
                .Where(e => e.EnsembleId == dto.EnsembleId && e.Status == RequestStatus.Accepted)
                .Select(e => new MemberDto
                {
                    FullName = e.UserRecipient.FullName,
                    PhotoUrl = e.UserRecipient.PhotoUrl,
                    UserId = e.UserRecipient.UserId,
                    ConnectedToUser = userConnectionIds.Contains(e.UserIdRecipient)
                }).ToList() as ICollection<MemberDto>;

            var ensemble = _context.Ensembles
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name,
                    Members = members,
                    Comments = comments,
                    Events = events,
                    UserIsMod = ensMods.Contains(userId)
                })
                .FirstOrDefault(e => e.EnsembleId == dto.EnsembleId);

            return new OkObjectResult(new
            {
                success = true,
                ensemble
            });
        }

        public int GetUserId()
        {
            return int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );
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
    }
}