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
            var blogs = context.Blogs.Include(x => x.User).Select(x =>
            new
            {
                Id = x.Id,
                BlogTitle = x.BlogTitle,
                BlogCoverPhotoURL = x.BlogCoverPhotoURL,
                BlogHtml = x.BlogHtml,
                UserId = x.UserId,
                CreatedDate = x.CreatedDate,
                User = new
                {
                    FirstName = x.User.FirstName,
                    LastName = x.User.LastName,
                    IsAdmin = x.User.IsAdmin,
                    UserName = x.User.UserName
                }
            }).OrderByDescending(x => x.CreatedDate).ToList();

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

        [HttpGet("RemoveBlog"), Authorize(Roles = "Admin")]
        public IActionResult RemoveBlog(string blogId)
        {

            var blog = context.Blogs.Where(x => x.Id == Guid.Parse(blogId)).FirstOrDefault();

            context.Entry(blog).State = EntityState.Deleted;
            context.SaveChanges();

            return Ok();
        }

        [HttpGet("UpdateBlog"), Authorize(Roles = "Admin")]
        public IActionResult UpdateBlog(string blogId, string blogHtml, string blogTitle, string blogCoverPhotoURL)
        {
            var blog = context.Blogs.Where(x => x.Id == Guid.Parse(blogId)).FirstOrDefault();
            blog.BlogTitle = blogTitle;
            blog.BlogHtml = blogHtml;
            blog.BlogCoverPhotoURL = blogCoverPhotoURL;
            context.Update(blog);
            context.SaveChanges();

            return Ok();
        }


    }
}
