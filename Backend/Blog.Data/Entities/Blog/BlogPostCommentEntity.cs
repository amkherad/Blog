using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.Entities.Blog
{
    [Table("BlogPostComments", Schema = "blog")]
    public class BlogPostCommentEntity : IGuidEntity, IAuditableEntity
    {
        [Key]
        public Guid Id { get; set; }
        
        
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        
        public UserEntity User { get; set; }
        
        
        [ForeignKey(nameof(ReplyTo))]
        public Guid ReplyToId { get; set; }
        
        public BlogPostCommentEntity ReplyTo { get; set; }
        
        
        [StringLength(75)]
        public string Title { get; set; }
        
        
        [StringLength(600)]
        public string Content { get; set; }
        
        
        public bool IsPublic { get; set; }
        public bool IsApproved { get; set; }
        
        
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
    }
}