using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        public DataContext Dc { get; }
        public UserRepository(DataContext dc)
        {
            this.Dc = dc;
            
        }
        public async Task<Users> Authenticate(string userName, string password)
        {
           return await Dc.users.FirstOrDefaultAsync(x=>x.Username==userName && x.Password==password);
        }
    }
}