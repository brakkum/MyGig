using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyGigApi.Migrations
{
    public partial class NotifEnsemble : Migration
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ensembles");

            migrationBuilder.DropTable(
                name: "Notifications");
        }
    }
}
