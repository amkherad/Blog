using Blog.Data.Entities.Blog;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Data.Configurations.Blog
{
    public class BlogPostCommentEntityConfigurations : IEntityTypeConfiguration<BlogPostCommentEntity>
    {
        public void Configure(EntityTypeBuilder<BlogPostCommentEntity> builder)
        {
            builder.AsAuditableEntity();
        }
    }
}