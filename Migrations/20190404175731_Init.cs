using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyGigApi.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ensembles",
                columns: table => new
                {
                    EnsembleId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 500, nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    Status = table.Column<int>(nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ensembles", x => x.EnsembleId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 20, nullable: false),
                    LastName = table.Column<string>(maxLength: 20, nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Setlists",
                columns: table => new
                {
                    SetlistId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    EnsembleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setlists", x => x.SetlistId);
                    table.ForeignKey(
                        name: "FK_Setlists_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    ConnectionId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    Text = table.Column<string>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.ConnectionId);
                    table.ForeignKey(
                        name: "FK_Connections_Users_UserIdRecipient",
                        column: x => x.UserIdRecipient,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Connections_Users_UserIdRequester",
                        column: x => x.UserIdRequester,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnsembleComments",
                columns: table => new
                {
                    EnsembleCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    EnsembleId = table.Column<int>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleComments", x => x.EnsembleCommentId);
                    table.ForeignKey(
                        name: "FK_EnsembleComments_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnsembleComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnsembleMembers",
                columns: table => new
                {
                    EnsembleMemberId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true),
                    EnsembleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleMembers", x => x.EnsembleMemberId);
                    table.ForeignKey(
                        name: "FK_EnsembleMembers_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnsembleMembers_Users_UserIdRecipient",
                        column: x => x.UserIdRecipient,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnsembleMembers_Users_UserIdRequester",
                        column: x => x.UserIdRequester,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnsembleModerators",
                columns: table => new
                {
                    EnsembleModeratorId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true),
                    EnsembleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleModerators", x => x.EnsembleModeratorId);
                    table.ForeignKey(
                        name: "FK_EnsembleModerators_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnsembleModerators_Users_UserIdRecipient",
                        column: x => x.UserIdRecipient,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnsembleModerators_Users_UserIdRequester",
                        column: x => x.UserIdRequester,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    DateAndTime = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(maxLength: 50, nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    CreatedByUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventId);
                    table.ForeignKey(
                        name: "FK_Events_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Url = table.Column<string>(maxLength: 100, nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Text = table.Column<string>(maxLength: 100, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    Status = table.Column<int>(nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => new { x.UserId, x.Url });
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SetlistComments",
                columns: table => new
                {
                    SetlistCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SetlistId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetlistComments", x => x.SetlistCommentId);
                    table.ForeignKey(
                        name: "FK_SetlistComments_Setlists_SetlistId",
                        column: x => x.SetlistId,
                        principalTable: "Setlists",
                        principalColumn: "SetlistId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SetlistComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    SongId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SetlistPosition = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    YouTubeUrl = table.Column<string>(maxLength: 200, nullable: true),
                    PdfUrl = table.Column<string>(maxLength: 200, nullable: true),
                    Artist = table.Column<string>(maxLength: 50, nullable: true),
                    SetlistId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.SongId);
                    table.ForeignKey(
                        name: "FK_Songs_Setlists_SetlistId",
                        column: x => x.SetlistId,
                        principalTable: "Setlists",
                        principalColumn: "SetlistId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    EnsembleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_Bookings_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_UserIdRecipient",
                        column: x => x.UserIdRecipient,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_UserIdRequester",
                        column: x => x.UserIdRequester,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventComments",
                columns: table => new
                {
                    EventCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    UserId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventComments", x => x.EventCommentId);
                    table.ForeignKey(
                        name: "FK_EventComments_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventModerators",
                columns: table => new
                {
                    EventModeratorId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true),
                    EventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventModerators", x => x.EventModeratorId);
                    table.ForeignKey(
                        name: "FK_EventModerators_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventModerators_Users_UserIdRecipient",
                        column: x => x.UserIdRecipient,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventModerators_Users_UserIdRequester",
                        column: x => x.UserIdRequester,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SongComments",
                columns: table => new
                {
                    SongCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SongId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SongComments", x => x.SongCommentId);
                    table.ForeignKey(
                        name: "FK_SongComments_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "SongId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SongComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookingSetlists",
                columns: table => new
                {
                    BookingId = table.Column<int>(nullable: false),
                    SetlistId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingSetlists", x => new { x.BookingId, x.SetlistId });
                    table.ForeignKey(
                        name: "FK_BookingSetlists_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingSetlists_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BookingSetlists_Setlists_SetlistId",
                        column: x => x.SetlistId,
                        principalTable: "Setlists",
                        principalColumn: "SetlistId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_EnsembleId",
                table: "Bookings",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_EventId",
                table: "Bookings",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserIdRecipient",
                table: "Bookings",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserIdRequester",
                table: "Bookings",
                column: "UserIdRequester");

            migrationBuilder.CreateIndex(
                name: "IX_BookingSetlists_EventId",
                table: "BookingSetlists",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingSetlists_SetlistId",
                table: "BookingSetlists",
                column: "SetlistId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_UserIdRecipient",
                table: "Connections",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_UserIdRequester",
                table: "Connections",
                column: "UserIdRequester");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleComments_EnsembleId",
                table: "EnsembleComments",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleComments_UserId",
                table: "EnsembleComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleMembers_EnsembleId",
                table: "EnsembleMembers",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleMembers_UserIdRecipient",
                table: "EnsembleMembers",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleMembers_UserIdRequester",
                table: "EnsembleMembers",
                column: "UserIdRequester");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleModerators_EnsembleId",
                table: "EnsembleModerators",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleModerators_UserIdRecipient",
                table: "EnsembleModerators",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleModerators_UserIdRequester",
                table: "EnsembleModerators",
                column: "UserIdRequester");

            migrationBuilder.CreateIndex(
                name: "IX_EventComments_EventId",
                table: "EventComments",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventComments_UserId",
                table: "EventComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventModerators_EventId",
                table: "EventModerators",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventModerators_UserIdRecipient",
                table: "EventModerators",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_EventModerators_UserIdRequester",
                table: "EventModerators",
                column: "UserIdRequester");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreatedByUserId",
                table: "Events",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SetlistComments_SetlistId",
                table: "SetlistComments",
                column: "SetlistId");

            migrationBuilder.CreateIndex(
                name: "IX_SetlistComments_UserId",
                table: "SetlistComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Setlists_EnsembleId",
                table: "Setlists",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_SongComments_SongId",
                table: "SongComments",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_SongComments_UserId",
                table: "SongComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Songs_SetlistId",
                table: "Songs",
                column: "SetlistId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingSetlists");

            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "EnsembleComments");

            migrationBuilder.DropTable(
                name: "EnsembleMembers");

            migrationBuilder.DropTable(
                name: "EnsembleModerators");

            migrationBuilder.DropTable(
                name: "EventComments");

            migrationBuilder.DropTable(
                name: "EventModerators");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "SetlistComments");

            migrationBuilder.DropTable(
                name: "SongComments");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Songs");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Setlists");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Ensembles");
        }
    }
}
