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
            _context.SaveChanges();
            return new JsonResult(Json(new {success = true, ensemble}));
        }

        [HttpPost]
        [Route(RoutePrefix + "/getensembles")]
        [EnableCors("MyGigCors")]
        public JsonResult GetEnsembles()
        {
            return new JsonResult(Json(new {success = true, _context.Ensembles }));
        }
    }
}