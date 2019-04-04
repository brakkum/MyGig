using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MyGigApi.DbInterceptors;
using MyGigApi.Entities;

namespace MyGigApi.Context
{
    public class MyGigContext : DbContext
    {
        public MyGigContext(DbContextOptions<MyGigContext> options) : base(options)
        {
            var listener = this.GetService<DiagnosticSource>();
            (listener as DiagnosticListener).SubscribeWithAdapter(new QueryInterceptor());
        }

        public DbSet<Booking> Bookings { get; set; }
//        public DbSet<BookingSetlist> BookingSetlists { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Ensemble> Ensembles { get; set; }
        public DbSet<EnsembleComment> EnsembleComments { get; set; }
        public DbSet<EnsembleMember> EnsembleMembers { get; set; }
        public DbSet<EnsembleModerator> EnsembleModerators { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventModerator> EventModerators { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<EventComment> EventComments { get; set; }
//        public DbSet<Setlist> Setlists { get; set; }
//        public DbSet<SetlistComment> SetlistComments { get; set; }
//        public DbSet<Song> Songs { get; set; }
//        public DbSet<SongComment> SongComments { get; set; }
        public DbSet<User> Users { get; set; }

        // Configure Entity properties, keys, etc.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Booking
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Event)
                .WithMany(b => b.Ensembles);
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Ensemble)
                .WithMany(b => b.Bookings);
            modelBuilder.Entity<Booking>()
                .Property(b => b.Status)
                .HasDefaultValue(RequestStatus.Pending);
            // BookingSetlist
//            modelBuilder.Entity<BookingSetlistetlist>()
//                .HasKey(bs => new {bs.BookingId, bs.SetlistId});
//            modelBuilder.Entity<BookingSetlist>()
//                .HasOne(es => es.Setlist)
//                .WithMany(e => e.BookingSetlists)
//                .HasForeignKey(es => es.SetlistId);
            // Connection
            modelBuilder.Entity<Connection>()
                .Property(c => c.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            modelBuilder.Entity<Connection>()
                .Property(c => c.Status)
                .HasDefaultValue(RequestStatus.Pending);
            // Ensemble
            modelBuilder.Entity<Ensemble>()
                .Property(e => e.Status)
                .HasDefaultValue(EnsembleStatus.Active);
            modelBuilder.Entity<Ensemble>()
                .Property(e => e.CreatedOn)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // EnsembleComment
            modelBuilder.Entity<EnsembleComment>()
                .Property(ec => ec.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // EnsembleMember
            modelBuilder.Entity<EnsembleMember>()
                .Property(em => em.Status)
                .HasDefaultValue(RequestStatus.Pending);
            modelBuilder.Entity<EnsembleMember>()
                .HasOne(em => em.Ensemble)
                .WithMany(m => m.Members);
            // EnsembleModerator
            modelBuilder.Entity<EnsembleModerator>()
                .Property(em => em.Status)
                .HasDefaultValue(RequestStatus.Pending);
            modelBuilder.Entity<EnsembleModerator>()
                .HasOne(em => em.Ensemble)
                .WithMany(e => e.Moderators);
            // Event
            modelBuilder.Entity<Event>()
                .Property(e => e.CreatedOn)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // EventComment
            modelBuilder.Entity<EventComment>()
                .Property(p => p.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // EventModerator
            modelBuilder.Entity<EventModerator>()
                .Property(em => em.Status)
                .HasDefaultValue(RequestStatus.Pending);
            modelBuilder.Entity<EventModerator>()
                .HasOne(em => em.Event)
                .WithMany(e => e.Moderators);
            // Notification
            modelBuilder.Entity<Notification>()
                .HasKey(n => new { n.UserId, n.Url });
            modelBuilder.Entity<Notification>()
                .Property(n => n.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            modelBuilder.Entity<Notification>()
                .Property(n => n.Status)
                .HasDefaultValue(NotificationStatus.Unseen);
            // SetlistComment
//            modelBuilder.Entity<SetlistComments>()
//                .Property(sc => sc.Timestamp)
//                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // SongComment
//            modelBuilder.Entity<SongComment>()
//                .Property(sc => sc.Timestamp)
//                .HasDefaultValueSql("CURRENT_TIMESTAMP()");
            // User
            modelBuilder.Entity<User>()
                .Property(u => u.Status)
                .HasDefaultValue(UserStatus.Active);
        }
    }
}
