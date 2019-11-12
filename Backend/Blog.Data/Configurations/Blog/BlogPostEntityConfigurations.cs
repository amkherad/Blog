using Blog.Data.Entities.Blog;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Data.Configurations.Blog
{
    public class BlogPostEntityConfigurations : IEntityTypeConfiguration<BlogPostEntity>
    {
        public void Configure(EntityTypeBuilder<BlogPostEntity> builder)
        {
            builder.AsAuditableEntity();
        }
    }
}