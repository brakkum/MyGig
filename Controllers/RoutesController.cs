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

            var events = _context.Bookings
                .Where(b => ensembleIds.Contains(b.EnsembleId) && b.Event.DateAndTime > DateTime.Now)
                .Select(b => new EventDto
                {
                    Name = b.Event.Name,
                    DateAndTime = b.Event.DateAndTime,
                    Location = b.Event.Location
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