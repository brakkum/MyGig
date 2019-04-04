
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class RequestController : ApiBaseController
    {
        private MyGigContext _context;
        private const string RoutePrefix = "requests";

        public RequestController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/confirm")]
        public OkObjectResult ConfirmRequest([FromBody] RequestDto dto)
        {
            var userId = GetUserId();

            var success = false;

            switch (dto.RequestType)
            {
                case RequestType.Booking:
                    var b = _context.Bookings.Find(dto.TypeId);
                    if (b.UserIdRecipient != userId)
                    {
                        break;
                    }
                    b.ConfirmedAt = DateTime.Now;
                    b.Status = RequestStatus.Accepted;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.Connection:
                    var c = _context.Connections.Find(dto.TypeId);
                    if (c.UserIdRecipient != userId)
                    {
                        break;
                    }
                    c.ConfirmedAt = DateTime.Now;
                    c.Status = RequestStatus.Accepted;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EnsembleMember:
                    var enMem = _context.EnsembleMembers.Find(dto.TypeId);
                    if (enMem.UserIdRecipient != userId)
                    {
                        break;
                    }
                    enMem.ConfirmedAt = DateTime.Now;
                    enMem.Status = RequestStatus.Accepted;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EventModerator:
                    var evMod = _context.EventModerators.Find(dto.TypeId);
                    if (evMod.UserIdRecipient != userId)
                    {
                        break;
                    }
                    evMod.ConfirmedAt = DateTime.Now;
                    evMod.Status = RequestStatus.Accepted;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EnsembleModerator:
                    var enMod = _context.EnsembleModerators.Find(dto.TypeId);
                    if (enMod.UserIdRecipient != userId)
                    {
                        break;
                    }
                    enMod.ConfirmedAt = DateTime.Now;
                    enMod.Status = RequestStatus.Accepted;
                    _context.SaveChanges();
                    success = true;
                    break;
                default:
                    Console.WriteLine("Invalid Request Type " + dto.RequestType);
                    break;
            }

            if (!success)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Bad request type"
                });
            }

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/deny")]
        public OkObjectResult DenyRequest([FromBody] RequestDto dto)
        {
            var userId = GetUserId();

            var success = false;

            switch (dto.RequestType)
            {
                case RequestType.Booking:
                    var b = _context.Bookings.Find(dto.TypeId);
                    if (b.UserIdRecipient != userId)
                    {
                        break;
                    }
                    b.ConfirmedAt = DateTime.Now;
                    b.Status = RequestStatus.Denied;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.Connection:
                    var c = _context.Connections.Find(dto.TypeId);
                    if (c.UserIdRecipient != userId)
                    {
                        break;
                    }
                    c.ConfirmedAt = DateTime.Now;
                    c.Status = RequestStatus.Denied;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EnsembleMember:
                    var enMem = _context.EnsembleMembers.Find(dto.TypeId);
                    if (enMem.UserIdRecipient != userId)
                    {
                        break;
                    }
                    enMem.ConfirmedAt = DateTime.Now;
                    enMem.Status = RequestStatus.Denied;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EventModerator:
                    var evMod = _context.EventModerators.Find(dto.TypeId);
                    if (evMod.UserIdRecipient != userId)
                    {
                        break;
                    }
                    evMod.ConfirmedAt = DateTime.Now;
                    evMod.Status = RequestStatus.Denied;
                    _context.SaveChanges();
                    success = true;
                    break;
                case RequestType.EnsembleModerator:
                    var enMod = _context.EnsembleModerators.Find(dto.TypeId);
                    if (enMod.UserIdRecipient != userId)
                    {
                        break;
                    }
                    enMod.ConfirmedAt = DateTime.Now;
                    enMod.Status = RequestStatus.Denied;
                    _context.SaveChanges();
                    success = true;
                    break;
            }

            if (!success)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Bad request type"
                });
            }

            return new OkObjectResult(new {success = true});
        }

        public int GetUserId()
        {
            return int.Parse(
                User.Claims
                    .Where(c => c.Type == "UserId")
                    .Select(x => x.Value)
                    .SingleOrDefault()
            );
        }
    }
}