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
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ensembles", x => x.EnsembleId);
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
                    EventId = table.Column<int>(nullable: false),
                    EnsembleId = table.Column<int>(nullable: false),
                    BookedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => new { x.EventId, x.EnsembleId });
                    table.ForeignKey(
                        name: "FK_Bookings_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
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
                });

            migrationBuilder.CreateTable(
                name: "EnsembleMembers",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    EnsembleId = table.Column<int>(nullable: false),
                    JoinedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    IsCurrent = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleMembers", x => new { x.UserId, x.EnsembleId });
                    table.ForeignKey(
                        name: "FK_EnsembleMembers_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EnsembleModerators",
                columns: table => new
                {
                    EnsembleId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    AssignedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleModerators", x => new { x.UserId, x.EnsembleId });
                    table.ForeignKey(
                        name: "FK_EnsembleModerators_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventModerators",
                columns: table => new
                {
                    EventId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    AssignedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventModerators", x => new { x.UserId, x.EventId });
                });

            migrationBuilder.CreateTable(
                name: "EventSetlists",
                columns: table => new
                {
                    EventId = table.Column<int>(nullable: false),
                    SetlistId = table.Column<int>(nullable: false),
                    EventSetlistOrder = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventSetlists", x => new { x.EventId, x.SetlistId });
                    table.ForeignKey(
                        name: "FK_EventSetlists_Setlists_SetlistId",
                        column: x => x.SetlistId,
                        principalTable: "Setlists",
                        principalColumn: "SetlistId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrivateEventComments",
                columns: table => new
                {
                    PrivateEventCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    UserId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateEventComments", x => x.PrivateEventCommentId);
                });

            migrationBuilder.CreateTable(
                name: "PublicEventComments",
                columns: table => new
                {
                    PublicEventCommentId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Text = table.Column<string>(maxLength: 500, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    UserId = table.Column<int>(nullable: false),
                    EventId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicEventComments", x => x.PublicEventCommentId);
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
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UserPhotoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => new { x.UserIdRequester, x.UserIdRecipient });
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
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    DateAndTime = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(maxLength: 50, nullable: false),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    CreatedByUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
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
                    DisplayMessage = table.Column<string>(maxLength: 100, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
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
                name: "UserPhotos",
                columns: table => new
                {
                    UserPhotoId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Url = table.Column<string>(nullable: false),
                    UploadedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhotos", x => x.UserPhotoId);
                    table.ForeignKey(
                        name: "FK_UserPhotos_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_EnsembleId",
                table: "Bookings",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_UserIdRecipient",
                table: "Connections",
                column: "UserIdRecipient");

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
                name: "IX_EnsembleModerators_EnsembleId",
                table: "EnsembleModerators",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_EventModerators_EventId",
                table: "EventModerators",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreatedByUserId",
                table: "Events",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventSetlists_SetlistId",
                table: "EventSetlists",
                column: "SetlistId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateEventComments_EventId",
                table: "PrivateEventComments",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateEventComments_UserId",
                table: "PrivateEventComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicEventComments_EventId",
                table: "PublicEventComments",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicEventComments_UserId",
                table: "PublicEventComments",
                column: "UserId");

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

            migrationBuilder.CreateIndex(
                name: "IX_UserPhotos_UserId",
                table: "UserPhotos",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserPhotoId",
                table: "Users",
                column: "UserPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Events_EventId",
                table: "Bookings",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnsembleComments_Users_UserId",
                table: "EnsembleComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnsembleMembers_Users_UserId",
                table: "EnsembleMembers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EnsembleModerators_Users_UserId",
                table: "EnsembleModerators",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventModerators_Events_EventId",
                table: "EventModerators",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventModerators_Users_UserId",
                table: "EventModerators",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventSetlists_Events_EventId",
                table: "EventSetlists",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateEventComments_Events_EventId",
                table: "PrivateEventComments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateEventComments_Users_UserId",
                table: "PrivateEventComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PublicEventComments_Events_EventId",
                table: "PublicEventComments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PublicEventComments_Users_UserId",
                table: "PublicEventComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetlistComments_Users_UserId",
                table: "SetlistComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongComments_Users_UserId",
                table: "SongComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserPhotos_UserPhotoId",
                table: "Users",
                column: "UserPhotoId",
                principalTable: "UserPhotos",
                principalColumn: "UserPhotoId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPhotos_Users_UserId",
                table: "UserPhotos");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "EnsembleComments");

            migrationBuilder.DropTable(
                name: "EnsembleMembers");

            migrationBuilder.DropTable(
                name: "EnsembleModerators");

            migrationBuilder.DropTable(
                name: "EventModerators");

            migrationBuilder.DropTable(
                name: "EventSetlists");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PrivateEventComments");

            migrationBuilder.DropTable(
                name: "PublicEventComments");

            migrationBuilder.DropTable(
                name: "SetlistComments");

            migrationBuilder.DropTable(
                name: "SongComments");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Songs");

            migrationBuilder.DropTable(
                name: "Setlists");

            migrationBuilder.DropTable(
                name: "Ensembles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserPhotos");
        }
    }
}
