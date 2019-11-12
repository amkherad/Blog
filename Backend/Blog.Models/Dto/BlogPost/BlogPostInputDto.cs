using System;

namespace Blog.Models.Dto.BlogPost
{
    public class BlogPostInputDto
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        
        
        public string Content { get; set; }
        
    }
}