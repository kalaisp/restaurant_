using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }
        
        public byte[] PasswordKey { get; set; }    
    }
}