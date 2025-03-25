using System.ComponentModel.DataAnnotations.Schema;

namespace Blog_App.Models
{
    public class Blog
    {
        public Guid Id { get; set; }
        public string BlogTitle { get; set; }
        public string BlogHtml { get; set;}
        public string BlogCoverPhotoURL { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public User? User { get; set;}
        public Guid? UserId { get; set; }
    }
}
