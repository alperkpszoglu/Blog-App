namespace Blog_App.Models
{
    public class Blog
    {
        public string Id { get; set; }
        public string BlogHtml { get; set;}
        public string BlogCoverPhoto { get; set; }
        public DateTime Date { get; set;}

        public User User { get; set;}
        public Guid UserId { get; set; }
    }
}
