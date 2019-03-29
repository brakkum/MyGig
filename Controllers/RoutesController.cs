using System;
using System.Collections.Generic;
using System.Linq;
using Google.Protobuf.WellKnownTypes;
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
            var userId = GetUserId();

            var userExists = _context.Users.Any(u => u.UserId == userId);

            if (!userExists)
            {
                return new OkObjectResult(new {success = false, error = "No User"});
            }

            var ensembles = _context.EnsembleMembers
                .Where(e => e.UserIdRecipient == userId && e.Status == RequestStatus.Accepted)
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Ensemble.Name
                });

            var ensembleIds = ensembles
                .Select(e => e.EnsembleId)
                .ToArray();

            // TODO: Improve this/grab events based on ensemble membership
            var events = _context.Events
                .Include(e => e.Moderators)
                .ThenInclude(m => m.UserIdRecipient)
                .Where(e =>
                    (
                        e.Moderators.Contains(
                            _context.EventModerators
                                .FirstOrDefault(em => em.EventId == e.EventId &&
                                                      em.UserIdRecipient == userId &&
                                                      em.Status == RequestStatus.Accepted))
                    )
                )
                .Select(e => new EventDto
                {
                    Name = e.Name,
                    DateAndTime = e.DateAndTime,
                    Location = e.Location,
                    UserIsMod = _context.EventModerators
                        .Any(evm => evm.EventId == e.EventId &&
                                    evm.UserIdRecipient == userId &&
                                    evm.Status == RequestStatus.Accepted)
                });

            var notifications = _context.Notifications
                .Where(n => n.UserId == userId && n.Status == NotificationStatus.Unseen)
                .Select(n => new NotificationDto
                {
                    Url = n.Url,
                    DisplayMessage = n.Text,
                    Timestamp = n.Timestamp
                });

            var requests = _context.Requests
                .Include(r => r.UserRequester)
                .ThenInclude(u => u.UserPhoto)
                .Where(r => r.UserIdRecipient == userId && r.Status == RequestStatus.Pending)
                .OrderBy(r => r.Timestamp)
                .Select(r => new RequestDto
                {
                    Text = r.Text,
                    RequestId = r.RequestId,
                    Timestamp = r.Timestamp,
                    userPhoto = r.UserRequester.UserPhoto.Url
                });

            return new OkObjectResult(new
            {
                success = true,
                ensembles,
                notifications,
                requests,
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
                            PhotoUrl = m.UserRecipient.UserPhoto.Url,
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
                        PhotoUrl = ec.User.UserPhoto.Url,
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
                .Select(b => new EventDto
                {
                    Name = b.Event.Name,
                    Location = b.Event.Location,
                    DateAndTime = b.Event.DateAndTime
                }).ToList() as ICollection<EventDto>;

            var comments = _context.EnsembleComments
                .Where(ec => ec.EnsembleId == dto.EnsembleId)
                .OrderByDescending(ec => ec.Timestamp)
                .Select(ec => new EnsembleCommentDto
                {
                    Text = ec.Text,
                    Timestamp = ec.Timestamp,
                    User = new MemberDto
                    {
                        FullName = ec.User.FullName,
                        PhotoUrl = ec.User.UserPhoto.Url,
                        UserId = ec.UserId
                    }
                })
                .ToList() as ICollection<EnsembleCommentDto>;

            var members = _context.EnsembleMembers
                .Where(e => e.EnsembleId == dto.EnsembleId && e.Status == RequestStatus.Accepted)
                .Select(e => new MemberDto
                {
                    FullName = e.UserRecipient.FullName,
                    PhotoUrl = e.UserRecipient.UserPhoto.Url,
                    UserId = e.UserRecipient.UserId
                }).ToList() as ICollection<MemberDto>;

            var ensemble = _context.Ensembles
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name,
                    Members = members,
                    Comments = comments,
                    Events = events
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

        public IEnumerable<int> GetUserConnections(int userId)
        {
            var connA = _context.Connections
                .Where(c => c.UserIdRecipient == userId)
                .Select(c => c.UserIdRequester)
                .ToArray();
            var connB = _context.Connections
                .Where(c => c.UserIdRequester == userId)
                .Select(c => c.UserIdRecipient)
                .ToArray();

            return connA.Concat(connB);
        }
    }
}