using AutoMapper;
using Blog_App.Data;
using Blog_App.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Blog_App.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly BlogDbContext context;
        private readonly IMapper mapper;

        UserDto currentUser = new UserDto();

        public UserController(BlogDbContext _context, IMapper mapper)
        {
            this.context = _context;
            this.mapper = mapper;
        }

        [HttpGet("GetUsers"), Authorize(Roles = "Admin,User")]
        public IActionResult GetUsers()
        {
            return Ok(context.Users.ToList());
        }

        [HttpGet("GetCurrentUser"), Authorize]
        public IActionResult GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            currentUser = mapper.Map<UserDto>(user);
            return Ok(currentUser);
        }

        [HttpPost("UpdateUser"), Authorize]
        public IActionResult UpdateUser(UserDto user)
        {
            var existingUser = context.Users.FirstOrDefault(x => x.Email == user.Email);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            existingUser.UserName = user.UserName;

            context.SaveChanges();
            return Ok();
        }

        [HttpGet("SetAdminRole"), Authorize(Roles = "Admin")]
        public IActionResult SetAdminRole(string email)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            if(user == null)
            {
                return NotFound();
            }
            user.IsAdmin = true;
            context.SaveChanges();
            return Ok();
        }

    }
}
