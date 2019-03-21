using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [Route(RoutePrefix + "/newensemble")]
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
                Status = RequestStatus.Accepted
            });
            // Make ensemble creator Member
            _context.EnsembleMembers.Add(new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserId = 1, // TODO: Change UserId to JWT bearer
                Status = RequestStatus.Accepted
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensemble});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateensemble")]
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
        [Authorize]
        [Route(RoutePrefix + "/getensembles")]
        public OkObjectResult GetEnsembles()
        {
            return new OkObjectResult(new {success = true, _context.Ensembles});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newmember")]
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
        [Authorize]
        [Route(RoutePrefix + "/confirmmembership")]
        public OkObjectResult ConfirmEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = RequestStatus.Accepted;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/denymembership")]
        public OkObjectResult DenyEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = RequestStatus.Denied;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemembership")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleMember ensembleMember)
        {
            ensembleMember.Status = RequestStatus.Inactive;

            _context.EnsembleMembers.Update(ensembleMember);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleMember});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addmod")]
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
        [Authorize]
        [Route(RoutePrefix + "/confirmmod")]
        public OkObjectResult ConfirmEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = RequestStatus.Accepted;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/denymod")]
        public OkObjectResult DenyEnsembleModerator([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = RequestStatus.Denied;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemod")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleModerator ensembleModerator)
        {
            ensembleModerator.Status = RequestStatus.Inactive;

            _context.EnsembleModerators.Update(ensembleModerator);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleModerator});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addcomment")]
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
