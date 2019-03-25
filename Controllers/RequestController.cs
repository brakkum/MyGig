
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
        public OkObjectResult ConfirmRequest([FromBody] RequestDto requestDto)
        {
            var req = _context.Requests
                .Find(requestDto.RequestId);

            var userId = GetUserId();

            if (req.UserIdRecipient != userId && req.UserIdRequester != userId)
            {
                // this user isn't a part of this request
                return new OkObjectResult(new {success = false});
            }

            req.ConfirmedAt = DateTime.Now;
            req.Status = RequestStatus.Accepted;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/deny")]
        public OkObjectResult DenyRequest([FromBody] RequestDto requestDto)
        {
            var req = _context.Requests
                .Find(requestDto.RequestId);

            var userId = GetUserId();

            if (req.UserIdRecipient != userId && req.UserIdRequester != userId)
            {
                // this user isn't a part of this request
                return new OkObjectResult(new {success = false});
            }

            req.Status = RequestStatus.Denied;
            _context.SaveChanges();

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