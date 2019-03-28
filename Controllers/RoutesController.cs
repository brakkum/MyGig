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

            var validMod = _context.EventModerators
                .Any(em => em.UserIdRecipient == userId &&
                           em.EventId == dto.EventId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Not valid mod"});
            }

            var ensembles = _context.Bookings
                .Include(b => b.Ensemble)
                .Where(b => b.EventId == dto.EventId && b.Status == RequestStatus.Accepted)
                .Select(b => new EnsembleDto
                {
                    Name = b.Ensemble.Name,
                    Members = _context.EnsembleMembers
                        .Include(em => em.UserRecipient)
                        .ThenInclude(u => u.UserPhoto)
                        .Where(e => e.EnsembleId == b.EnsembleId && e.Status == RequestStatus.Accepted)
                        .Select(em => new UserDto
                        {
                            FullName = em.UserRecipient.FullName,
                            PhotoUrl = em.UserRecipient.UserPhoto.Url,
                            UserId = em.UserIdRecipient
                        }).ToList() as ICollection<UserDto>
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
                        UserId = ec.UserId
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
                    UserIsMod = _context.EventModerators
                        .Any(evm => evm.EventId == dto.EventId &&
                                    evm.UserIdRecipient == userId &&
                                    evm.Status == RequestStatus.Accepted)
                }).FirstOrDefault();

            return new OkObjectResult(new
            {
                success = true,
                ev
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
    }
}