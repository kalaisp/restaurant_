using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Dto;
using WebAPI.Errors;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController:BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IConfiguration configuration;
        public AccountController(IunitOfWork uow,IConfiguration configuration)
        {
            this.configuration = configuration;
            this.uow = uow;                 
            
        }
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult>Login(LoginReqdto loginreq)
        {
            var user =await uow.userRepository.Authenticate(loginreq.Username,loginreq.Password);
            ApiError apiError=new ApiError();
            if (user == null)
            {
                apiError.ErrorCode=Unauthorized().StatusCode;
               apiError.ErrorMessage = "Invalid username or password";
                apiError.ErrorDetails = "This error appears when the provided user ID or password does not exist";
                return Unauthorized(apiError);
            }
            var loginRes=new LoginResDto();
            loginRes.UserName=user.Username;
            loginRes.Token=CreateJWT(user);
            return Ok(loginRes);
        }  
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult>Register(LoginReqdto loginreq)
        {
              ApiError apierror=new ApiError();
            if(string.IsNullOrEmpty(loginreq.Username.Trim())||
            string.IsNullOrEmpty(loginreq.Password.Trim()))
            {
                 apierror.ErrorCode=BadRequest().StatusCode;
                apierror.ErrorMessage="User name or password canot be blank";
                return BadRequest(apierror);
            }
          
            if(await uow.userRepository.UserAlreadyExists(loginreq.Username))
            {
                apierror.ErrorCode=BadRequest().StatusCode;
                apierror.ErrorMessage="User already exists,please try different username";
                return BadRequest(apierror);
            }
               
                uow.userRepository.Register(loginreq.Username,loginreq.Password);
                await uow.SaveAsync();
                return StatusCode(201);
        }
        private string CreateJWT(Users user)
        {
            var secretKey=configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),     
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}