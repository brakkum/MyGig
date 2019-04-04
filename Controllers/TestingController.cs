using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class TestingController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "test";

        public TestingController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getallrequests")]
        public OkObjectResult GetAllRequests()
        {
            var userId = int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );

            var ensMem = _context.EnsembleMembers
                .Where(u => u.UserIdRecipient == userId && u.Status == RequestStatus.Pending)
                .Select(em => new EnsembleMemberDto
                {
                    RequestType = RequestType.EnsembleMember,
                    TypeId = em.EnsembleMemberId,
                    Text = $"{em.UserRequester.FullName} wants you to join {em.Ensemble.Name}",
                    Timestamp = em.Timestamp
                });

            var ensMod = _context.EnsembleModerators
                .Where(em => em.UserIdRecipient == userId && em.Status == RequestStatus.Pending)
                .Select(em => new EnsembleModeratorDto
                {
                    RequestType = RequestType.EnsembleModerator,
                    TypeId = em.EnsembleModeratorId,
                    Text = $"{em.UserRequester.FullName} wants you to moderate {em.Ensemble.Name}",
                    Timestamp = em.Timestamp
                });

            var ensBook = _context.Bookings
                .Where(b => b.UserIdRecipient == userId && b.Status == RequestStatus.Pending)
                .Select(b => new BookingDto
                {
                    RequestType = RequestType.Booking,
                    TypeId = b.BookingId,
                    Text = $"{b.UserRequester.FullName} wants your ensemble ${b.Ensemble.Name} to perform at {b.Event.Name}",
                    Timestamp = b.Timestamp
                });

            var eveMod = _context.EventModerators
                .Where(em => em.UserIdRecipient == userId && em.Status == RequestStatus.Pending)
                .Select(em => new EventModeratorDto
                {
                    RequestType = RequestType.EventModerator,
                    TypeId = em.EventModeratorId,
                    Text = $"{em.UserRequester.FullName} wants you to moderate the event {em.Event.Name}",
                    Timestamp = em.Timestamp
                });

            var conn = _context.Connections
                .Where(c => c.UserIdRecipient == userId && c.Status == RequestStatus.Pending)
                .Select(b => new ConnectionDto
                {
                    RequestType = RequestType.Connection,
                    TypeId = b.ConnectionId,
                    Text = $"{b.UserRequester.FullName} wants to connect with you",
                    Timestamp = b.Timestamp
                });

            var requests = ensMem.Concat<RequestDto>(ensMod)
                .Concat(ensBook)
                .Concat(eveMod)
                .Concat(conn)
                .OrderBy(r => r.Timestamp);

            return new OkObjectResult(new { requests });
        }
    }
}