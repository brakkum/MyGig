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
                name: "Requests",
                columns: table => new
                {
                    RequestId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserIdRequester = table.Column<int>(nullable: false),
                    UserIdRecipient = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false, defaultValue: 0),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    Discriminator = table.Column<string>(nullable: false),
                    EventId = table.Column<int>(nullable: true),
                    EnsembleId = table.Column<int>(nullable: true),
                    ConfirmedAt = table.Column<DateTime>(nullable: true),
                    EnsembleMember_EnsembleId = table.Column<int>(nullable: true),
                    JoinedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "CURRENT_TIMESTAMP()"),
                    EnsembleModerator_EnsembleId = table.Column<int>(nullable: true),
                    EventModerator_EventId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_Requests_Ensembles_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Requests_Ensembles_EnsembleMember_EnsembleId",
                        column: x => x.EnsembleMember_EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Requests_Ensembles_EnsembleModerator_EnsembleId",
                        column: x => x.EnsembleModerator_EnsembleId,
                        principalTable: "Ensembles",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
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
                    UserPhotoId = table.Column<int>(nullable: true),
                    Status = table.Column<int>(nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
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
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
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
                name: "IX_EnsembleComments_EnsembleId",
                table: "EnsembleComments",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_EnsembleComments_UserId",
                table: "EnsembleComments",
                column: "UserId");

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
                name: "IX_Requests_EnsembleId",
                table: "Requests",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_EventId",
                table: "Requests",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_EnsembleMember_EnsembleId",
                table: "Requests",
                column: "EnsembleMember_EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_EnsembleModerator_EnsembleId",
                table: "Requests",
                column: "EnsembleModerator_EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_EventModerator_EventId",
                table: "Requests",
                column: "EventModerator_EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_UserIdRecipient",
                table: "Requests",
                column: "UserIdRecipient");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_UserIdRequester",
                table: "Requests",
                column: "UserIdRequester");

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
                name: "FK_EnsembleComments_Users_UserId",
                table: "EnsembleComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Users_UserIdRecipient",
                table: "Requests",
                column: "UserIdRecipient",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Users_UserIdRequester",
                table: "Requests",
                column: "UserIdRequester",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Events_EventId",
                table: "Requests",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Events_EventModerator_EventId",
                table: "Requests",
                column: "EventModerator_EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventSetlists_Events_EventId",
                table: "EventSetlists",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateEventComments_Users_UserId",
                table: "PrivateEventComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PrivateEventComments_Events_EventId",
                table: "PrivateEventComments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PublicEventComments_Users_UserId",
                table: "PublicEventComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PublicEventComments_Events_EventId",
                table: "PublicEventComments",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
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
                name: "EnsembleComments");

            migrationBuilder.DropTable(
                name: "EventSetlists");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PrivateEventComments");

            migrationBuilder.DropTable(
                name: "PublicEventComments");

            migrationBuilder.DropTable(
                name: "Requests");

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
