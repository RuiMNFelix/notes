using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notes.Api.Migrations
{
    /// <inheritdoc />
    public partial class UniqueNoteTitlePerUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Notes_OwnerId",
                table: "Notes");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_OwnerId_Title",
                table: "Notes",
                columns: new[] { "OwnerId", "Title" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Notes_OwnerId_Title",
                table: "Notes");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_OwnerId",
                table: "Notes",
                column: "OwnerId");
        }
    }
}
