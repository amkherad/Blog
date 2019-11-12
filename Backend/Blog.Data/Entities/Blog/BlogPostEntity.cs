using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.Entities.Blog
{
    [Table("BlogPosts", Schema = "blog")]
    public class BlogPostEntity : IGuidEntity, IAuditableEntity
    {
        [Key]
        public Guid Id { get; set; }

        
        [StringLength(120)]
        public string Title { get; set; }
        
        
        public string Content { get; set; }
        
        
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
    }
}