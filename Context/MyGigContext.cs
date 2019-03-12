using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using MyGigApi.Entities;

namespace MyGigApi.Context
{
    public class MyGigContext : DbContext
    {
        public MyGigContext(DbContextOptions<MyGigContext> options) : base(options) {}
        
        public DbSet<User> Users { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User
            modelBuilder.Entity<User>().Property(u => u.IsActive).HasColumnType("bit");

            // UserPhoto
            modelBuilder.Entity<UserPhoto>().Property(u => u.UploadedAt).HasDefaultValueSql("CURRENT_TIMESTAMP()");
        }
    }
}