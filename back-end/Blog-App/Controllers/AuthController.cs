using Blog_App.Data;
using Blog_App.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Blog_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly BlogDbContext _context;

        public AuthController(BlogDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            var user = new User();
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.UserName = request.UserName;
            user.Email = request.Email;
            user.PasswordHash = passwordHash;

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPost("login")]
        public ActionResult<User> Login(UserLoginDto request)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == request.Email);
            if (user != null)
            {

                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return BadRequest("Sifreniz yanlis");
                }

                string jwtToken = CreateToken(user);
                return Ok(jwtToken);
            }
            else
            {
                return BadRequest("Kullanici bulunamadi");
            }

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Delete the authentication cookie
            HttpContext.Request.Headers.Remove("Authorization");
            return Ok();
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Admin")
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}

