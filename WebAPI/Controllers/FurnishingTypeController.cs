using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto;
using WebAPI.Interfaces;
namespace WebAPI.Controllers
{
    public class FurnishingTypeController:BaseController
    {
         private readonly IunitOfWork uow;
        private readonly IMapper mapper;
        public FurnishingTypeController(IunitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
                      
            this.mapper = mapper;
        }
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFurnishingTypes()
        {
            var furnishingtypes = await uow.FurnishingTypeRepository.GetFurnishingTypesAsync();
            var furnishingypesDto=mapper.Map<IEnumerable<KeyValuePairDto>>(furnishingtypes);
            return Ok(furnishingypesDto);
        }
    }
}