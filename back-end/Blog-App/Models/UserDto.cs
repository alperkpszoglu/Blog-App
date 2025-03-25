using System.ComponentModel.DataAnnotations.Schema;

namespace Blog_App.Models
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
