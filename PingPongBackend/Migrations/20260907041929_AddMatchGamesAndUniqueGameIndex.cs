using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PingPongBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchGamesAndUniqueGameIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MatchType",
                table: "Matches",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Winner",
                table: "Matches",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MatchGames",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    MatchId = table.Column<Guid>(type: "TEXT", nullable: false),
                    GameNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    P1Score = table.Column<int>(type: "INTEGER", nullable: false),
                    P2Score = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchGames_Matches_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchGames_MatchId_GameNumber",
                table: "MatchGames",
                columns: new[] { "MatchId", "GameNumber" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchGames");

            migrationBuilder.DropColumn(
                name: "MatchType",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "Winner",
                table: "Matches");
        }
    }
}
