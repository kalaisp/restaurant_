using System.Security.Cryptography;
using System.Text;
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
        public async Task<Users> Authenticate(string userName, string passwordText)
        {
           var user= await Dc.users.FirstOrDefaultAsync(x=>x.Username==userName);
            if (user == null||user.PasswordKey==null)
            {
                 Console.WriteLine($"User '{userName}' not found!");
           return null;
            }
          
           if(!MatchPasswordHash(passwordText,user.Password,user.PasswordKey))
            {
                Console.WriteLine("Password does NOT match!");
                 return null;
            }
          
          Console.WriteLine("Login successful!");
    return user;
        }

       private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
{
    using (var hmac = new HMACSHA512(passwordKey))
    {
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != password[i])
                return false;
        }
        return true;
    }
}
        public void Register(string userName, string password)
        {
           byte[] passswordHash,passwordKey;
           using(var hmac =new HMACSHA512())
            {
                passwordKey=hmac.Key;
                passswordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            Users user=new Users();
            user.Username=userName;
            user.Password=passswordHash;
            user.PasswordKey=passwordKey;
            Dc.users.Add(user);
        }

        public async Task<bool> UserAlreadyExists(string userName)
        {
            return await Dc.users.AnyAsync(x=>x.Username==userName);
        }
    }
}