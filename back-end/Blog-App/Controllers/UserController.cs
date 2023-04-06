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

        public UserController(BlogDbContext _context, IMapper mapper)
        {
            this.context = _context;
            this.mapper = mapper;
        }


        [HttpGet("GetUsers"), Authorize(Roles = "Admin")]
        public IActionResult GetUsers()
        {
           return Ok(context.Users.ToList());
        }




        [HttpGet("GetCurrentUser"), Authorize]
        public IActionResult GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            return Ok(mapper.Map<UserDto>(user));
        }


    }
}
