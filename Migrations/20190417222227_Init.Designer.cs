﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyGigApi.Context;

namespace MyGigApi.Migrations
{
    [DbContext(typeof(MyGigContext))]
    [Migration("20190417222227_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MyGigApi.Entities.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ConfirmedAt");

                    b.Property<int>("EnsembleId");

                    b.Property<int>("EventId");

                    b.Property<string>("Setlist");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text");

                    b.Property<DateTime>("Timestamp");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("UserIdRequester");

                    b.HasKey("BookingId");

                    b.HasIndex("EnsembleId");

                    b.HasIndex("EventId");

                    b.HasIndex("UserIdRecipient");

                    b.HasIndex("UserIdRequester");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("MyGigApi.Entities.Connection", b =>
                {
                    b.Property<int>("ConnectionId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ConfirmedAt");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text");

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("UserIdRequester");

                    b.HasKey("ConnectionId");

                    b.HasIndex("UserIdRecipient");

                    b.HasIndex("UserIdRequester");

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

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(1);

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
                    b.Property<int>("EnsembleMemberId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ConfirmedAt");

                    b.Property<int>("EnsembleId");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text");

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("UserIdRequester");

                    b.HasKey("EnsembleMemberId");

                    b.HasIndex("EnsembleId");

                    b.HasIndex("UserIdRecipient");

                    b.HasIndex("UserIdRequester");

                    b.ToTable("EnsembleMembers");
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleModerator", b =>
                {
                    b.Property<int>("EnsembleModeratorId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ConfirmedAt");

                    b.Property<int>("EnsembleId");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text");

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("UserIdRequester");

                    b.HasKey("EnsembleModeratorId");

                    b.HasIndex("EnsembleId");

                    b.HasIndex("UserIdRecipient");

                    b.HasIndex("UserIdRequester");

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

            modelBuilder.Entity("MyGigApi.Entities.EventComment", b =>
                {
                    b.Property<int>("EventCommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EventId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<int>("UserId");

                    b.HasKey("EventCommentId");

                    b.HasIndex("EventId");

                    b.HasIndex("UserId");

                    b.ToTable("EventComments");
                });

            modelBuilder.Entity("MyGigApi.Entities.EventModerator", b =>
                {
                    b.Property<int>("EventModeratorId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("ConfirmedAt");

                    b.Property<int>("EventId");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text");

                    b.Property<DateTime>("Timestamp");

                    b.Property<int>("UserIdRecipient");

                    b.Property<int>("UserIdRequester");

                    b.HasKey("EventModeratorId");

                    b.HasIndex("EventId");

                    b.HasIndex("UserIdRecipient");

                    b.HasIndex("UserIdRequester");

                    b.ToTable("EventModerators");
                });

            modelBuilder.Entity("MyGigApi.Entities.Notification", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("Url")
                        .HasMaxLength(100);

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<DateTime>("Timestamp")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.HasKey("UserId", "Url");

                    b.ToTable("Notifications");
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

                    b.Property<DateTime>("JoinedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("CURRENT_TIMESTAMP()");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("PhotoUrl");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(1);

                    b.HasKey("UserId");

                    b.ToTable("Users");
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

                    b.HasOne("MyGigApi.Entities.User", "UserRecipient")
                        .WithMany()
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRequester")
                        .WithMany()
                        .HasForeignKey("UserIdRequester")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Connection", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "UserRecipient")
                        .WithMany()
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRequester")
                        .WithMany()
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

                    b.HasOne("MyGigApi.Entities.User", "UserRecipient")
                        .WithMany()
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRequester")
                        .WithMany()
                        .HasForeignKey("UserIdRequester")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EnsembleModerator", b =>
                {
                    b.HasOne("MyGigApi.Entities.Ensemble", "Ensemble")
                        .WithMany("Moderators")
                        .HasForeignKey("EnsembleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRecipient")
                        .WithMany()
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRequester")
                        .WithMany()
                        .HasForeignKey("UserIdRequester")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Event", b =>
                {
                    b.HasOne("MyGigApi.Entities.User", "CreatedByUser")
                        .WithMany()
                        .HasForeignKey("CreatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EventComment", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("EventComments")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.EventModerator", b =>
                {
                    b.HasOne("MyGigApi.Entities.Event", "Event")
                        .WithMany("Moderators")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRecipient")
                        .WithMany()
                        .HasForeignKey("UserIdRecipient")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MyGigApi.Entities.User", "UserRequester")
                        .WithMany()
                        .HasForeignKey("UserIdRequester")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MyGigApi.Entities.Notification", b =>
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