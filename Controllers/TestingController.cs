using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Context;
using MyGigApi.DTOs;
using Newtonsoft.Json.Linq;

namespace MyGigApi.Controllers
{
    public class TestingController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "test";

        public TestingController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getallrequests")]
        public OkObjectResult GetAllRequests()
        {
            Console.WriteLine("wtf is goin on? ");
            var req = _context.EnsembleMembers
                .Select(em => new EnsembleMemberDto
                {
                    RequestId = em.RequestId,
                    Text = $"{em.UserRequester.FullName} wants you to join {em.Ensemble.Name}",
                });
            return new OkObjectResult(new { req });
        }
    }
}