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
                UserId = 1 // TODO: Change UserId to JWT bearer
            });
            // Make ensemble creator Member
            _context.EnsembleMembers.Add(new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserId = 1 // TODO: Change UserId to JWT bearer
            });
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
        [Route(RoutePrefix + "/adduser")]
        [EnableCors("MyGigCors")]
        public JsonResult AddUserToEnsemble([FromBody] EnsembleMember ensembleMember)
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
