using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dto;
using WebAPI.Interfaces;
namespace WebAPI.Controllers
{
    public class PropertyTypeController:BaseController
    {
         private readonly IunitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IunitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        //property/type/1
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyTypes()
        {
            var propertyTypes = await uow.propertyTypeRepository.GetPropertyTypesAsync();
            var propertyTypesDto=mapper.Map<IEnumerable<KeyValuePairDto>>(propertyTypes);
            return Ok(propertyTypesDto);
        }
        
    }

    
}