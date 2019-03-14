using System;
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
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: false),
                    IsActive = table.Column<short>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ensembles", x => x.EnsembleId);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    DateAndTime = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(maxLength: 50, nullable: false),
                    IsPublic = table.Column<short>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Url = table.Column<string>(maxLength: 100, nullable: false),
                    DisplayMessage = table.Column<string>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Url);
                });

            migrationBuilder.CreateTable(
                name: "UserPhotos",
                columns: table => new
                {
                    UserPhotoId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Url = table.Column<string>(nullable: false),
                    UploadedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhotos", x => x.UserPhotoId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    IsActive = table.Column<short>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ensembles");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "UserPhotos");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
