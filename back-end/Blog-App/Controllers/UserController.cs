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

        public UserController(BlogDbContext _context)
        {
            this.context = _context;
        }

        [HttpGet("GetUsers"), Authorize(Roles = "Admin,User")]
        public IActionResult GetUsers()
        {
            return Ok(context.Users.ToList());
        }

        [HttpGet("GetCurrentUser"), Authorize]
        public UserDto GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = context.Users.FirstOrDefault(u => u.Email == email);

            var currentUser = new UserDto
            {
                FirstName = user.FirstName,
                UserName = user.UserName,
                Email = user.Email,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin,
                CreatedDate = user.CreatedDate
            };

            return currentUser;
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
