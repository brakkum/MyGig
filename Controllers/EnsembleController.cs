using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.DTOs;
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
        public OkObjectResult NewEnsemble([FromBody] EnsembleDto dto)
        {
            var userId = GetUserId();

            var ensemble = new Ensemble
            {
                Name = dto.Name
            };

            _context.Ensembles.Add(ensemble);

            // Make ensemble creator Mod
            var mod = new EnsembleModerator
            {
                UserIdRecipient = userId,
                UserIdRequester = userId,
                EnsembleId = ensemble.EnsembleId,
                Status = RequestStatus.Accepted
            };
            _context.EnsembleModerators.Add(mod);
            // Make ensemble creator Member
            var mem = new EnsembleMember
            {
                EnsembleId = ensemble.EnsembleId,
                UserIdRecipient = userId,
                UserIdRequester = userId,
                Status = RequestStatus.Accepted
            };
            _context.EnsembleMembers.Add(mem);

            _context.SaveChanges();

            return new OkObjectResult(new {success = true, ensembleId = ensemble.EnsembleId});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateensemble")]
        public OkObjectResult InactivateEnsemble([FromBody] EnsembleDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var ensemble = _context.Ensembles.Find(dto.EnsembleId);

            ensemble.Status = EnsembleStatus.Inactive;
            _context.Ensembles.Update(ensemble);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true });
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
        public OkObjectResult NewEnsembleMember([FromBody] EnsembleMember dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            _context.EnsembleMembers.Add(new EnsembleMember
            {
                EnsembleId = dto.EnsembleId,
                UserIdRecipient = dto.UserIdRecipient,
                UserIdRequester = userId
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemembership")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleMemberDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var mem = _context.EnsembleMembers
                .FirstOrDefault(em => em.EnsembleId == dto.EnsembleId &&
                                      em.UserIdRecipient == dto.UserIdRecipient);

            if (mem == null)
            {
                return new OkObjectResult(new {success = false, error = "No member found"});
            }

            mem.Status = RequestStatus.Inactive;
            _context.EnsembleMembers.Update(mem);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addmod")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleModeratorDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            _context.EnsembleModerators.Add(new EnsembleModerator
            {
                EnsembleId = dto.EnsembleId,
                UserIdRecipient = dto.UserIdRecipient,
                UserIdRequester = userId
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivatemod")]
        public OkObjectResult InactivateEnsembleMembership([FromBody] EnsembleModeratorDto dto)
        {
            var userId = GetUserId();

            var validMod = _context.EnsembleModerators
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMod)
            {
                return new OkObjectResult(new {success = false, error = "Permission denied"});
            }

            var mod = _context.EnsembleModerators
                .FirstOrDefault(em => em.EnsembleId == dto.EnsembleId &&
                                      em.UserIdRecipient == dto.UserIdRecipient);

            if (mod == null)
            {
                return new OkObjectResult(new {success = false, error = "No mod found"});
            }

            mod.Status = RequestStatus.Inactive;
            _context.EnsembleModerators.Update(mod);
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/addcomment")]
        public OkObjectResult AddEnsembleModerator([FromBody] EnsembleCommentDto dto)
        {
            var userId = GetUserId();

            var validMem = _context.EnsembleMembers
                .Any(em => em.EnsembleId == dto.EnsembleId &&
                           em.UserIdRecipient == userId &&
                           em.Status == RequestStatus.Accepted);

            if (!validMem)
            {
                return new OkObjectResult(new {success = false, error = "Not a valid member"});
            }

            _context.EnsembleComments.Add(new EnsembleComment
            {
                EnsembleId = dto.EnsembleId,
                UserId = userId,
                Text = dto.Text,
                Timestamp = DateTime.Now
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        public int GetUserId()
        {
            return int.Parse(User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault()
            );
        }
    }
}
