using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }    
    }
}