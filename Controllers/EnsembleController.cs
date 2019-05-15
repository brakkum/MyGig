using System;
using System.Linq;
using System.Threading.Tasks;
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
        [Route(RoutePrefix + "/newEnsemble")]
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
                Status = RequestStatus.Accepted,
                ConfirmedAt = DateTime.Now
            };
            _context.EnsembleModerators.Add(mod);
            // Make ensemble creator Member
            var mem = new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserIdRecipient = userId,
                UserIdRequester = userId,
                Status = RequestStatus.Accepted,
                ConfirmedAt = DateTime.Now
            };
            _context.EnsembleMembers.Add(mem);

            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleId = ensemble.EnsembleId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newMember")]
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
        [Route(RoutePrefix + "/removeMember")]
        public OkObjectResult RemoveEnsembleMember([FromBody] EnsembleMemberDto dto)
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

            _context.EnsembleMembers.Remove(mem);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newComment")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleCommentDto dto)
        {
            var userId = GetUserId();

            var validMem = _context.EnsembleMembers
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMem)
            {
                return new OkObjectResult(new {success = false, error = "Not a valid member"});
            }
            var user = _context.Users.Find(userId);
            var ensemble = _context.Ensembles.Find(dto.EnsembleId);

            NotifyEnsembleMembers(
                userId,
                dto.EnsembleId,
                $"{user.FullName} commented on the {ensemble.Name} page",
                $"/ensemble/{ensemble.EnsembleId}#comments"
            );

            _context.EnsembleComments.Add(new EnsembleComment
            {
                EnsembleId = dto.EnsembleId,
                UserId = userId,
                Text = dto.Text,
                Timestamp = DateTime.Now
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        public void NotifyEnsembleMembers(int userId, int ensembleId, string text, string url)
        {
            var memberIds = _context.EnsembleMembers
                .Where(em => em.EnsembleId == ensembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            foreach (var memberId in memberIds)
            {
                if (userId == memberId)
                {
                    continue;
                }

                var oldNotification = _context.Notifications
                    .FirstOrDefault(n => n.UserId == memberId &&
                                         n.Url == url);
                if (oldNotification != null)
                {
                    oldNotification.Status = NotificationStatus.Unseen;
                    oldNotification.Text = text;
                    oldNotification.Timestamp = DateTime.Now;
                    _context.Update(oldNotification);
                }
                else
                {
                    _context.Notifications.Add(new Notification
                    {
                        UserId = memberId,
                        Text = text,
                        Url = url
                    });
                }
            }
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getComments")]
        public OkObjectResult GetEnsembleComments([FromBody] EnsembleCommentDto dto)
        {
            var userId = GetUserId();

            var ensembleModIds = _context.EnsembleModerators
                .Where(em => em.EnsembleId == dto.EnsembleId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.UserIdRecipient)
                .ToArray();

            var ensembleMemberIds = _context.EnsembleMembers
                .Where(e => e.EnsembleId == dto.EnsembleId &&
                            e.Status == RequestStatus.Accepted)
                .Select(b => b.UserIdRecipient)
                .ToArray();

            var validMem = ensembleMemberIds.Contains(userId);
            var validMod = ensembleModIds.Contains(userId);

            if (!(validMem || validMod))
            {
                return new OkObjectResult(new {success = false, error = "Not valid member or mod"});
            }

            var userConnectionIds = GetUserConnections(userId);

            var comments = _context.EnsembleComments
                .Include(c => c.User)
                .Where(c => c.EnsembleId == dto.EnsembleId)
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
        [Route(RoutePrefix + "/searchEnsemblesNotOnEvent")]
        public OkObjectResult SearchEnsemblesNotOnEvent([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var ensemblesRequestedIds = _context.Bookings
                .Where(b => b.EventId == dto.EventId)
                .Select(b => b.EnsembleId)
                .ToArray();

            var ensemblesModeratedIds = _context.EnsembleModerators
                .Where(em => em.UserIdRecipient == userId &&
                             em.Status == RequestStatus.Accepted)
                .Select(em => em.EnsembleId)
                .ToArray();

            var ensembles = _context.Ensembles
                .Where(e => e.Name.ToLower().Contains(dto.Search.ToLower()) &&
                            !ensemblesRequestedIds.Contains(e.EnsembleId))
                .Select(e => new EnsembleDto
                {
                    EnsembleId = e.EnsembleId,
                    Name = e.Name,
                    UserIsMod = ensemblesModeratedIds.Contains(e.EnsembleId)
                });

            return new OkObjectResult(new {success = true, ensembles});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getSetlist")]
        public OkObjectResult EditSetlist([FromBody] BookingDto dto)
        {
            var userId = GetUserId();

            var booking = _context.Bookings.Find(dto.BookingId);

            if (booking == null)
            {
                return new OkObjectResult(new {success = false});
            }

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
            var bookingId = booking.BookingId;

            return new OkObjectResult(new {success = true, setlist, bookingId, ensembleId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/updateSetlist")]
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
