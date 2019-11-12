using System;

namespace Blog.Models.Dto.BlogPost
{
    public class BlogPostOutputDto
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        
        public string Content { get; set; }
        
        public LinkDto Writer { get; set; }
        
        public TimeSpan Age { get; set; }
        
        public DateTimeOffset CreatedDateTime { get; set; }
    }
}