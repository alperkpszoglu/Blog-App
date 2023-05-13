using Blog_App.Data;
using Blog_App.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Blog_App.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]
    public class BlogController : Controller
    {

        private readonly BlogDbContext context;

        public BlogController(BlogDbContext _context)
        {
            this.context = _context;
        }

        [HttpGet("GetAllBlogs")]
        public IActionResult GetAllBlogs()
        {
            var blogs = context.Blogs.Include(x => x.User).OrderByDescending(x => x.CreatedDate).ToList();

            return Ok(blogs);
        }

        [HttpPost("UploadBlog"), Authorize(Roles = "Admin")]
        public IActionResult UploadBlog(Blog blog)
        {
            
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = context.Users.FirstOrDefault(u => u.Email == email);

            blog.User = user;

            context.Blogs.Add(blog);

            context.SaveChanges();


            return Ok();
        }

    }
}
