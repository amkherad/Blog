using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Entities
{
    public class TagEntity : IGuidEntity, IAuditableEntity
    {
        public Guid Id { get; set; }
        
        
        [StringLength(50)]
        public string Name { get; set; }
        
        [StringLength(100)]
        public string Description { get; set; }
        
        
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
    }
}