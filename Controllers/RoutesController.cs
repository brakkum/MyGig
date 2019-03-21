using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
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
            var userId = int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );

            var ensembles = _context.EnsembleMembers
                .Include(em => em.Ensemble)
                .ThenInclude(e => new {e.Name, e.EnsembleId})
                .Select(e => e.UserIdRecipient == userId && e.Status == RequestStatus.Accepted)
                .DefaultIfEmpty();

            var notifications = _context.Notifications
                .Select(n => n.UserId == userId && n.Status == NotificationStatus.Unseen);

            var requests = _context.Requests
                .OrderBy(r => r.Timestamp)
                .Select(r => r.Status == RequestStatus.Pending);

            return new OkObjectResult(new
            {
                ensembles,
                notifications,
                requests
            });
        }
    }
}