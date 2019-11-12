using Blog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data.DataContext
{
    public class BlogContext : DbContext, IUnitOfWork
    {
        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BlogContext).Assembly);
            
            base.OnModelCreating(modelBuilder);
        }
        
        
        public DbSet<BlogPostEntity> BlogPosts { get; set; }
        
        public DbSet<TagEntity> Tags { get; set; }
    }
}