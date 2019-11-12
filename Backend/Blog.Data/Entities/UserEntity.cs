using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.Entities
{
    [Table("Users", Schema = "identity")]
    public class UserEntity : IGuidEntity, IAuditableEntity
    {
        [Key]
        public Guid Id { get; set; }
        
        
        [StringLength(256)]
        public string Email { get; set; }
        
        public DateTimeOffset? EmailVerificationDateTime { get; set; }
        
        [StringLength(32)]
        public string Username { get; set; }
        
        [MaxLength(256)]
        public byte[] Password { get; set; }
        
        [MaxLength(16)]
        public byte[] UserSalt { get; set; }

        
        [StringLength(75)]
        public string Nickname { get; set; }
        
        [StringLength(50)]
        public string FirstName { get; set; }
        
        [StringLength(50)]
        public string MiddleName { get; set; }
        
        [StringLength(50)]
        public string LastName { get; set; }
        
        
        [StringLength(16)]
        public string MobileNumber { get; set; }
        
        public DateTimeOffset? MobileVerificationDateTime { get; set; }

        
        [StringLength(10)]
        public string IdNumber { get; set; }
        
        
        public DateTimeOffset CreatedDateTime { get; set; }
        public DateTimeOffset? UpdateDateTime { get; set; }
    }
}