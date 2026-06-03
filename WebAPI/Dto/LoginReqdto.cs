using System.Threading.Tasks;

namespace WebAPI.Dto
{
    public class LoginReqdto
    {
        public string Username { get; set; }
        // [Required]
        public string Password { get; set; }   
    }
}