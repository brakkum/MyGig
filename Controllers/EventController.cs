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
        public JsonResult NewEvent([FromBody] Event ev)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Events.Add(ev);
            _context.EventModerators.Add(new EventModerator(){EventId = ev.EventId, UserId = ev.CreatedByUserId});
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ev}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newmod")]
        [EnableCors("MyGigCors")]
        public JsonResult NewEventModerator([FromBody] EventModerator eventModerator)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.EventModerators.Add(eventModerator);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, eventModerator}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newpubliccomment")]
        [EnableCors("MyGigCors")]
        public JsonResult NewPublicEventComment([FromBody] PublicEventComment publicEventComment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.PublicEventComments.Add(publicEventComment);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, publicEventComment}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newprivatecomment")]
        [EnableCors("MyGigCors")]
        public JsonResult NewPrivateEventComment([FromBody] PrivateEventComment privateEventComment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.PrivateEventComments.Add(privateEventComment);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, privateEventComment}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newbooking")]
        [EnableCors("MyGigCors")]
        public JsonResult NewBooking([FromBody] Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, booking}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/addsetlist")]
        [EnableCors("MyGigCors")]
        public JsonResult AddSetlistToEvent([FromBody] EventSetlist eventSetlist)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.EventSetlists.Add(eventSetlist);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, eventSetlist}));
        }
    }
}