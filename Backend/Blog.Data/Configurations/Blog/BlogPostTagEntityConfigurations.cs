using Blog.Data.Entities.Blog;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Data.Configurations.Blog
{
    public class BlogPostTagEntityConfigurations : IEntityTypeConfiguration<BlogPostTagEntity>
    {
        public void Configure(EntityTypeBuilder<BlogPostTagEntity> builder)
        {
            builder.AsAuditableEntity();
        }
    }
}