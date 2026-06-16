using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedDemo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EstPossessionOne",
                table: "Properties",
                newName: "LastUpdatedOn");

            migrationBuilder.AddColumn<DateTime>(
                name: "EstPossessionOn",
                table: "Properties",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LastUpdatedBy",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstPossessionOn",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "LastUpdatedBy",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedOn",
                table: "Properties",
                newName: "EstPossessionOne");
        }
    }
}
