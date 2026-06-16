using WebAPI.Interfaces;
using AutoMapper;
using WebAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace WebAPI.Controllers
{
     [ApiController]
    [Route("api/[controller]")]
    public class BaseController:ControllerBase
    {
        protected int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
    }
}