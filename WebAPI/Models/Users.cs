using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Users:BaseEntity
    {
      
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }
        
        public byte[] PasswordKey { get; set; }    
    }
}