using System;

namespace Blog.Data
{
    public interface IAuditableEntity
    {
        DateTimeOffset CreatedDateTime { get; set; }
        
        DateTimeOffset? UpdateDateTime { get; set; }
    }
}