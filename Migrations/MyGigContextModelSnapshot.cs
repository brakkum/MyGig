﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyGigApi.Context;

namespace MyGigApi.Migrations
{
    [DbContext(typeof(MyGigContext))]
    partial class MyGigContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MyGigApi.Entities.Booking", b =>
                {
                    b.Property<int>("EventId");

                    b.Property<int>("EnsembleId");

                    b.Property<DateTime>("BookedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.HasKey("EventId", "EnsembleId");

                    b.HasIndex("EnsembleId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("MyGigApi.Entities.Connection", b =>
                {
                    b.Property<int>("UserIdRequester");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.HasKey("UserIdRequester", "UserIdRecipient");

                    b.HasIndex("UserIdRecipient");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("MyGigApi.Entities.Ensemble", b =>
                {
                    b.Property<int>("EnsembleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("EnsembleId");

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.HasKey("EnsembleId");

                    b.ToTable("Ensembles");
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleComment", b =>
                {
                    b.Property<int>("EnsembleCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EnsembleId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("EnsembleCommentId");

                    b.HasIndex("EnsembleId");

                    b.HasIndex("UserId");

                    b.ToTable("EnsembleComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleMember", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("EnsembleId");

                    b.Property<bool>("IsCurrent")
                        .HasColumnType("bit");

                    b.Property<DateTime>("JoinedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.HasKey("UserId", "EnsembleId");

                    b.HasIndex("EnsembleId");

                    b.ToTable("EnsembleMembers");
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleModerator", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("EnsembleId");

                    b.Property<DateTime>("AssignedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "EnsembleId");

                    b.HasIndex("EnsembleId");

                    b.ToTable("EnsembleModerators");
                });

            modelBuilder.Entity("MyGigApi.Entities.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CreatedByUserId");

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<DateTime>("DateAndTime");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("bit");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("EventId");

                    b.HasIndex("CreatedByUserId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("MyGigApi.Entities.EventModerator", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("EventId");

                    b.Property<DateTime>("AssignedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "EventId");

                    b.HasIndex("EventId");

                    b.ToTable("EventModerators");
                });

            modelBuilder.Entity("MyGigApi.Entities.EventSetlist", b =>
                {
                    b.Property<int>("EventId");

                    b.Property<int>("SetlistId");

                    b.Property<int>("EventSetlistOrder");

                    b.HasKey("EventId", "SetlistId");

                    b.HasIndex("SetlistId");

                    b.ToTable("EventSetlists");
                });

            modelBuilder.Entity("MyGigApi.Entities.Notification", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("Url")
                        .HasMaxLength(100);

                    b.Property<string>("DisplayMessage")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.HasKey("UserId", "Url");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("MyGigApi.Entities.PrivateEventComment", b =>
                {
                    b.Property<int>("PrivateEventCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EventId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("PrivateEventCommentId");

                    b.HasIndex("EventId");

                    b.HasIndex("UserId");

                    b.ToTable("PrivateEventComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.PublicEventComment", b =>
                {
                    b.Property<int>("PublicEventCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EventId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("PublicEventCommentId");

                    b.HasIndex("EventId");

                    b.HasIndex("UserId");

                    b.ToTable("PublicEventComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.Setlist", b =>
                {
                    b.Property<int>("SetlistId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EnsembleId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("SetlistId");

                    b.HasIndex("EnsembleId");

                    b.ToTable("Setlists");
                });

            modelBuilder.Entity("MyGigApi.Entities.SetlistComment", b =>
                {
                    b.Property<int>("SetlistCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SetlistId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("SetlistCommentId");

                    b.HasIndex("SetlistId");

                    b.HasIndex("UserId");

                    b.ToTable("SetlistComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.Song", b =>
                {
                    b.Property<int>("SongId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Artist")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("PdfUrl")
                        .HasMaxLength(200);

                    b.Property<int>("SetlistId");

                    b.Property<int>("SetlistPosition");

                    b.Property<string>("YouTubeUrl")
                        .HasMaxLength(200);

                    b.HasKey("SongId");

                    b.HasIndex("SetlistId");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("MyGigApi.Entities.SongComment", b =>
                {
                    b.Property<int>("SongCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SongId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("SongCommentId");

                    b.HasIndex("SongId");

                    b.HasIndex("UserId");

                    b.ToTable("SongComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("UserId");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<int?>("UserPhotoId");

                    b.HasKey("UserId");

                    b.HasIndex("UserPhotoId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MyGigApi.Entities.UserPhoto", b =>
                {
                    b.Property<int>("UserPhotoId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("UploadedAt")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<string>("Url")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("UserPhotoId");

                    b.HasIndex("UserId");

                    b.ToTable("UserPhotos");
                });

            modelBuilder.Entity("MyGigApi.Entities.Booking", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany("Bookings")
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("Ensembles")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Connection", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "UserB")
                        .WithMany("ConPoolB")
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserA")
                        .WithMany("ConPoolA")
                        .HasForeignKey("UserIdRequester")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany()
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleMember", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany("Members")
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany("Ensembles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleModerator", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany("Moderators")
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany("EnsemblesModerated")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Event", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EventModerator", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("Moderators")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany("EventsModerated")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EventSetlist", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("EventSetlists")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.Setlist", "Setlist")
                        .WithMany("EventSetlists")
                        .HasForeignKey("SetlistId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Notification", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.PrivateEventComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("PrivateEventComments")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.PublicEventComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("PublicEventComments")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Setlist", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany()
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.SetlistComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Setlist", "Setlist")
                        .WithMany("SetlistComments")
                        .HasForeignKey("SetlistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Song", b =>
                {
                    b.HasOne("MyGigApi.Entities.Setlist", "Setlist")
                        .WithMany("Songs")
                        .HasForeignKey("SetlistId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.SongComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Song", "Song")
                        .WithMany("SongComments")
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.User", b =>
                {
                    b.HasOne("MyGigApi.Entities.UserPhoto", "UserPhoto")
                        .WithMany()
                        .HasForeignKey("UserPhotoId");
                });

            modelBuilder.Entity("MyGigApi.Entities.UserPhoto", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
