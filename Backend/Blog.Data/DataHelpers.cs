using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Blog.Data
{
    public static class DataHelpers
    {
        public static EntityTypeBuilder<T> AsAuditableEntity<T>(this EntityTypeBuilder<T> builder)
            where T : class, IAuditableEntity
        {
            builder
                .Property(u => u.CreatedDateTime)
                .HasDefaultValueSql("(CURRENT_TIMESTAMP)");

            return builder;
        }
    }
}