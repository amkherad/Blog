using Blog.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Data.Configurations
{
    public class BlogPostConfigurations : IEntityTypeConfiguration<BlogPostEntity>
    {
        public void Configure(EntityTypeBuilder<BlogPostEntity> builder)
        {
            builder.AsAuditableEntity();
        }
    }
}