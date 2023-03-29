using Blog_App.Data;
using Microsoft.AspNetCore.Mvc;

namespace Blog_App.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly BlogDbContext context;

        public UserController(BlogDbContext _context)
        {
            this.context = _context;
        }


        [HttpGet]
        public IActionResult GetUsers()
        {
           return Ok(context.Users.ToList());
        }
    }
}
