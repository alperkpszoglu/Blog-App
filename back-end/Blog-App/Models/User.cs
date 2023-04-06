using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Blog_App.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; } // unique
        public string PasswordHash{ get; set; }
    }
}
