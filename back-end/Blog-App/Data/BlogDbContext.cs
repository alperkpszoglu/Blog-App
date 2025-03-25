using Blog_App.Models;
using Microsoft.EntityFrameworkCore;

namespace Blog_App.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Blog> Blogs { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique(true);

            modelBuilder.Entity<User>()
            .HasIndex(u => u.UserName)
            .IsUnique(true);
        }

    }
}
