using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
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
        public OkObjectResult NewEvent([FromBody] Event ev)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            var userId = int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );

            _context.Events.Add(ev);
            _context.EventModerators.Add(new EventModerator
            {
                EventId = ev.EventId,
                UserIdRecipient = userId,
                UserIdRequester = userId
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ev});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newmod")]
        public OkObjectResult NewEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.EventModerators.Add(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/acceptmod")]
        public OkObjectResult AcceptEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = RequestStatus.Accepted;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/denymod")]
        public OkObjectResult DenyEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = RequestStatus.Denied;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/invalidatemod")]
        public OkObjectResult InvalidateEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = RequestStatus.Inactive;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newpubliccomment")]
        public OkObjectResult NewPublicEventComment([FromBody] PublicEventComment publicEventComment)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.PublicEventComments.Add(publicEventComment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, publicEventComment});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newprivatecomment")]
        public OkObjectResult NewPrivateEventComment([FromBody] PrivateEventComment privateEventComment)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.PrivateEventComments.Add(privateEventComment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, privateEventComment});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newbooking")]
        public OkObjectResult NewBooking([FromBody] Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, booking});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addsetlist")]
        public OkObjectResult AddSetlistToEvent([FromBody] EventSetlist eventSetlist)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.EventSetlists.Add(eventSetlist);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventSetlist});
        }
    }
}