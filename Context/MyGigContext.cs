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
        public DbSet<Ensemble> Ensembles { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Event> Events { get; set; }

        // Configure Entity properties, keys, etc.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User
            modelBuilder.Entity<User>().Property(u => u.IsActive).HasColumnType("bit");
            // UserPhoto
            modelBuilder.Entity<UserPhoto>().Property(u => u.UploadedAt).HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // Ensemble
            modelBuilder.Entity<Ensemble>().Property(e => e.IsActive).HasColumnType("bit");
            modelBuilder.Entity<Ensemble>().Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // Notification
            modelBuilder.Entity<Notification>().Property(n => n.Timestamp).HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // Event
            modelBuilder.Entity<Event>().Property(e => e.IsPublic).HasColumnType("bit");
            modelBuilder.Entity<Event>().Property(e => e.CreatedOn).HasDefaultValueSql("CURRENT_TIMESTAMP()");

        }
    }
}