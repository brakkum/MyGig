using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
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
        [Route(RoutePrefix + "/newensemble")]
        [EnableCors("MyGigCors")]
        public JsonResult NewEnsemble([FromBody] Ensemble ensemble)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState.Keys}));
            }

            _context.Ensembles.Add(ensemble);
            // Make ensemble creator Mod
            _context.EnsembleModerators.Add(new EnsembleModerator
            {
                EnsembleId = ensemble.EnsembleId,
                UserId = 1, // TODO: Change UserId to JWT bearer
                Status = EnsembleModeratorStatus.Active
            });
            // Make ensemble creator Member
            _context.EnsembleMembers.Add(new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserId = 1, // TODO: Change UserId to JWT bearer
                Status = EnsembleMemberStatus.Active
            });
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true, ensemble}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivateensemble")]
        [EnableCors("MyGigCors")]
        public JsonResult InactivateEnsemble([FromBody] Ensemble ensemble)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState.Keys}));
            }

            ensemble.Status = EnsembleStatus.Inactive;
            _context.Ensembles.Update(ensemble);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensemble}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/getensembles")]
        [EnableCors("MyGigCors")]
        public JsonResult GetEnsembles()
        {
            return new JsonResult(Json(new {success = true, _context.Ensembles}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/newmember")]
        [EnableCors("MyGigCors")]
        public JsonResult NewEnsembleMember([FromBody] EnsembleMember ensembleMember)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.EnsembleMembers.Add(ensembleMember);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleMember}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/confirmmembership")]
        [EnableCors("MyGigCors")]
        public JsonResult ConfirmEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Active;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleMember}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/denymembership")]
        [EnableCors("MyGigCors")]
        public JsonResult DenyEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Declined;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleMember}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivatemembership")]
        [EnableCors("MyGigCors")]
        public JsonResult InactivateEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Inactive;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleMember}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/addmod")]
        [EnableCors("MyGigCors")]
        public JsonResult AddEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.EnsembleModerators.Add(ensembleModerator);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleModerator}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/confirmmod")]
        [EnableCors("MyGigCors")]
        public JsonResult ConfirmEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Active;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleModerator}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/denymod")]
        [EnableCors("MyGigCors")]
        public JsonResult DenyEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Declined;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleModerator}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivatemod")]
        [EnableCors("MyGigCors")]
        public JsonResult InactivateEnsembleMembership([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Inactive;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleModerator}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/addcomment")]
        [EnableCors("MyGigCors")]
        public JsonResult AddEnsembleModerator([FromBody] EnsembleComment ensembleComment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(Json(new {success = false, ModelState}));
            }

            _context.EnsembleComments.Add(ensembleComment);
            _context.SaveChanges();

            return new JsonResult(Json(new {success = true, ensembleComment}));
        }
    }
}
