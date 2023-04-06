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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        }

    }
}
