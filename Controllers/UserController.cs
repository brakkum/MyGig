using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;
using Newtonsoft.Json.Linq;

namespace MyGigApi.Controllers
{
    public class UserController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private const string RoutePrefix = "users";

        public UserController(MyGigContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/inactivateuser")]
        public OkObjectResult InactivateUser()
        {
            var userId = GetUserId();

            var user = _context.Users.Find(userId);

            user.Status = UserStatus.Inactive;
            _context.SaveChanges();

            return new OkObjectResult(new {success = true, user});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getuser")]
        public OkObjectResult GetUser([FromBody] JObject body)
        {
            var requestedUserId = (int)body["UserId"];
            var userId = GetUserId();

            var requestedUser = _context.Users
                .Include(us => us.UserPhoto)
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.UserPhoto.Url,
                    ConnectedToUser =
                        _context.Connections
                        .Any(u =>
                            // Is this user connected successfully to user?
                            (
                                (
                                    (u.UserIdRecipient == requestedUserId && u.UserIdRequester == userId) ||
                                    (u.UserIdRecipient == userId && u.UserIdRequester == requestedUserId)
                                )
                                && u.Status == RequestStatus.Accepted
                            )
                            // Or are we looking at this logged in user?
                            || requestedUserId == userId
                        )
                }).SingleOrDefault(us => us.UserId == requestedUserId);

            if (requestedUser == null)
            {
                return new OkObjectResult(new {success = false, error = "No user found"});
            }

            return new OkObjectResult(new {success = true, user = requestedUser});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newuserphoto")]
        public OkObjectResult NewUserPhoto([FromBody] UserPhotoDto userPhotoDto)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new {success = false, error = "Model invalid"});
            }

            var userId = GetUserId();

            var newPhoto = new UserPhoto
            {
                UserId = userId,
                Url = userPhotoDto.Url
            };

            _context.UserPhotos.Add(newPhoto);

            var user = _context.Users.Find(userId);
            user.UserPhotoId = newPhoto.UserPhotoId;
            _context.Users.Update(user);

            _context.SaveChanges();

            return new OkObjectResult(new {success = true, newPhoto});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/newconnection")]
        public OkObjectResult RequestNewConnection([FromBody] ConnectionDto request)
        {
            var userId = GetUserId();
            var user = _context.Users.Find(userId);

            var existingRequest = _context.Connections
                .FirstOrDefault(c => c.UserIdRecipient == userId &&
                                     c.UserIdRequester == request.UserIdRecipient);

            if (existingRequest != null)
            {
                existingRequest.Status = RequestStatus.Accepted;
                _context.SaveChanges();

                return new OkObjectResult(new
                {
                    success = true,
                    info = "Instant accept, other user already requested"
                });
            }

            var alreadyRequested = _context.Connections
                .Any(c => c.UserIdRecipient == request.UserIdRecipient &&
                          c.UserIdRequester == userId);

            if (alreadyRequested)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    info = "Hold your horses"
                });
            }

            _context.Connections.Add(new Connection
            {
                UserIdRecipient = request.UserIdRecipient,
                UserIdRequester = userId,
                Status = RequestStatus.Pending,
                Text = $"{user.FullName} wants to connect with you"
            });
            _context.SaveChanges();

            return new OkObjectResult(new {success = true});
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/search")]
        public OkObjectResult SearchUsers([FromBody] SearchDto dto)
        {
            var userId = GetUserId();

            var users = _context.Users
                .Include(us => us.UserPhoto)
                .Where(u => u.FullName.Contains(dto.Search) && !(_context.Connections
                    .Any(c => (
                        (c.UserIdRecipient == userId && c.UserIdRequester == u.UserId) ||
                        (c.UserIdRecipient == u.UserId && c.UserIdRequester == userId)
                            )) || u.UserId == userId))
                .Select(us => new MemberDto
                {
                    UserId = us.UserId,
                    FullName = us.FullName,
                    PhotoUrl = us.UserPhoto.Url
                });

            return new OkObjectResult(new {success = true, users});
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
