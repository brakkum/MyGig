using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyGigApi.Context;
using MyGigApi.DTOs;
using MyGigApi.Entities;

namespace MyGigApi.Controllers
{
    public class LoginController : ApiBaseController
    {
        private readonly MyGigContext _context;
        private readonly IConfiguration _config;
        private const string RoutePrefix = "users";

        public LoginController(IConfiguration config, MyGigContext context)
        {
            _config = config;
            _context = context;
        }

        private User GetLoginUser(LoginDto user)
        {
            return _context.Users
                .Include(u => u.UserPhoto)
                .SingleOrDefault(u => u.Email == user.Email &&
                    BCrypt.Net.BCrypt.Verify(user.Password, u.Password));
        }

        private string GenerateJwtToken(UserDto user)
        {
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.WriteLine(_config["Jwt:Key"]);

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("UserId", user.UserId.ToString())
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(RoutePrefix + "/newuser")]
        public OkObjectResult NewUser([FromBody] User user)
        {
            // Main sign up point for new users

            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Model Invalid",
                    ModelState
                });
            }

            var emailInUse = _context.Users.Any(u => u.Email == user.Email);

            if (emailInUse)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Email already in use"
                });
            }

            if (!BCrypt.Net.BCrypt.Verify(user.PasswordConfirm, user.Password))
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Password does not match"
                });
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            string jwtToken = GenerateJwtToken(new UserDto
            {
                UserId = user.UserId
            });

            return new OkObjectResult(new
            {
                success = true,
                user = new UserDto
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    PhotoUrl = null
                },
                jwt = jwtToken
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route(RoutePrefix + "/login")]
        public OkObjectResult Login([FromBody] LoginDto login)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "Model Invalid"
                });
            }

            var user = GetLoginUser(login);

            if (user == null)
            {
                return new OkObjectResult(new
                {
                    success = false,
                    error = "No User"
                });
            }

            string jwtToken = GenerateJwtToken(new UserDto
            {
                UserId = user.UserId
            });

            return new OkObjectResult(new
            {
                success = true,
                user = new UserDto
                {
                    FullName = user.FullName,
                    UserId = user.UserId,
                    PhotoUrl = user.UserPhoto.Url
                },
                jwt = jwtToken
            });
        }

        [HttpPost]
        [Authorize]
        [Route(RoutePrefix + "/getuserfromtoken")]
        public OkObjectResult GetUserFromToken([FromBody] JwtTokenDto jwtToken)
        {
            var userId = User.Claims
                .Where(c => c.Type == "UserId")
                .Select(x => x.Value)
                .SingleOrDefault();

            if (userId == null)
            {
                return new OkObjectResult(new { success = false, error = "User not found with Claims provided" });
            }

            var userObj = _context.Users
                .Find(int.Parse(userId));

            if (userObj == null)
            {
                return new OkObjectResult(new { success = false, error = "User not found by Id" });
            }

            return new OkObjectResult(new {
                success = true,
                user = new UserDto
                {
                    UserId = userObj.UserId,
                    PhotoUrl = userObj.UserPhoto.Url,
                    FullName = userObj.FullName
                },
                jwt = jwtToken.Jwt
            });
        }
    }
}
