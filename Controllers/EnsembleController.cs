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
        public OkObjectResult NewEnsemble([FromBody] Ensemble ensemble)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState.Keys});
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

            return new OkObjectResult(new {success = true, ensemble});
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivateensemble")]
        [EnableCors("MyGigCors")]
        public OkObjectResult InactivateEnsemble([FromBody] Ensemble ensemble)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState.Keys});
            }

            ensemble.Status = EnsembleStatus.Inactive;
            _context.Ensembles.Update(ensemble);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensemble});
        }

        [HttpPost]
        [Route(RoutePrefix + "/getensembles")]
        [EnableCors("MyGigCors")]
        public OkObjectResult GetEnsembles()
        {
            return new OkObjectResult(new {success = true, _context.Ensembles});
        }

        [HttpPost]
        [Route(RoutePrefix + "/newmember")]
        [EnableCors("MyGigCors")]
        public OkObjectResult NewEnsembleMember([FromBody] EnsembleMember ensembleMember)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.EnsembleMembers.Add(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Route(RoutePrefix + "/confirmmembership")]
        [EnableCors("MyGigCors")]
        public OkObjectResult ConfirmEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Active;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Route(RoutePrefix + "/denymembership")]
        [EnableCors("MyGigCors")]
        public OkObjectResult DenyEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Declined;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivatemembership")]
        [EnableCors("MyGigCors")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = EnsembleMemberStatus.Inactive;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Route(RoutePrefix + "/addmod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.EnsembleModerators.Add(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/confirmmod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult ConfirmEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Active;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/denymod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult DenyEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Declined;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/inactivatemod")]
        [EnableCors("MyGigCors")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = EnsembleModeratorStatus.Inactive;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Route(RoutePrefix + "/addcomment")]
        [EnableCors("MyGigCors")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleComment ensembleComment)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, ModelState});
            }

            _context.EnsembleComments.Add(ensembleComment);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleComment});
        }
    }
}
