using Microsoft.AspNetCore.Cors;
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
        [Route(RoutePrefix + "/newevent")]
        [EnableCors("MyGigCors")]
        public OkObjectResult NewEvent([FromBody] Event ev)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.Events.Add(ev);
            _context.EventModerators.Add(new EventModerator(){EventId = ev.EventId, UserId = ev.CreatedByUserId});
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ev});
        }

        [HttpPost]
        [Route(RoutePrefix + "/newmod")]
        [EnableCors("MyGigCors")]
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
        [Route(RoutePrefix + "/acceptmod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult AcceptEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = EventModeratorStatus.Active;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/denymod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult DenyEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = EventModeratorStatus.Declined;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/invalidatemod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult InvalidateEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            eventModerator.Status = EventModeratorStatus.Inactive;
            _context.EventModerators.Update(eventModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, eventModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/newpubliccomment")]
        [EnableCors("MyGigCors")]
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
        [Route(RoutePrefix + "/newprivatecomment")]
        [EnableCors("MyGigCors")]
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
        [Route(RoutePrefix + "/newbooking")]
        [EnableCors("MyGigCors")]
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
        [Route(RoutePrefix + "/addsetlist")]
        [EnableCors("MyGigCors")]
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