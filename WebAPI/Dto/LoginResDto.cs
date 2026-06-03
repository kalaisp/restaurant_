using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dto
{
    public class LoginResDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}