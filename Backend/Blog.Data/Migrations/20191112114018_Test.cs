using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blog.Data.Migrations
{
    public partial class Test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "blog");

            migrationBuilder.EnsureSchema(
                name: "identity");

            migrationBuilder.CreateTable(
                name: "BlogPostTags",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(nullable: false, defaultValueSql: "(CURRENT_TIMESTAMP)"),
                    UpdateDateTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPostTags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BlogPosts",
                schema: "blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 120, nullable: false),
                    Content = table.Column<string>(nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(nullable: false, defaultValueSql: "(CURRENT_TIMESTAMP)"),
                    UpdateDateTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: false),
                    EmailVerificationDateTime = table.Column<DateTimeOffset>(nullable: true),
                    Username = table.Column<string>(maxLength: 32, nullable: false),
                    Password = table.Column<byte[]>(maxLength: 256, nullable: false),
                    UserSalt = table.Column<byte[]>(maxLength: 16, nullable: false),
                    Nickname = table.Column<string>(maxLength: 75, nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    MobileNumber = table.Column<string>(maxLength: 16, nullable: false),
                    MobileVerificationDateTime = table.Column<DateTimeOffset>(nullable: true),
                    IdNumber = table.Column<string>(maxLength: 10, nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(nullable: false, defaultValueSql: "(CURRENT_TIMESTAMP)"),
                    UpdateDateTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BlogPostComments",
                schema: "blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    ReplyToId = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 75, nullable: false),
                    Content = table.Column<string>(maxLength: 600, nullable: false),
                    IsPublic = table.Column<bool>(nullable: false),
                    IsApproved = table.Column<bool>(nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(nullable: false, defaultValueSql: "(CURRENT_TIMESTAMP)"),
                    UpdateDateTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPostComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogPostComments_BlogPostComments_ReplyToId",
                        column: x => x.ReplyToId,
                        principalSchema: "blog",
                        principalTable: "BlogPostComments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BlogPostComments_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogPostComments_ReplyToId",
                schema: "blog",
                table: "BlogPostComments",
                column: "ReplyToId");

            migrationBuilder.CreateIndex(
                name: "IX_BlogPostComments_UserId",
                schema: "blog",
                table: "BlogPostComments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPostTags");

            migrationBuilder.DropTable(
                name: "BlogPostComments",
                schema: "blog");

            migrationBuilder.DropTable(
                name: "BlogPosts",
                schema: "blog");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "identity");
        }
    }
}
