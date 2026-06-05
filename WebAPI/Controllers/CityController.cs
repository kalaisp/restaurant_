using WebAPI.Dto;
using WebAPI.Interfaces;
using AutoMapper;
using WebAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace WebAPI.Controllers
{
   
   [Authorize]
    public class CityController : BaseController
    {       
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IunitOfWork uow,IMapper  mapper)
        {
            this.uow = uow;
            this.mapper=mapper;
        }       

        [HttpGet("cities")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {           
            var cities= await uow.cityRepository.GetCitiesAsync();
            var citiesDto=mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(citiesDto);        
        }
        
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city=mapper.Map<City>(cityDto);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            uow.cityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
         public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if(id!=cityDto.Id)
                return BadRequest("Update not allowed");                                                                               
            var cityFromDb=await uow.cityRepository.FindCity(id);
            if(cityFromDb==null)
                return BadRequest("Update not allowed");
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            mapper.Map(cityDto,cityFromDb);
            throw new Exception("Some unkown error occurired");
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb=await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            mapper.Map(cityDto,cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpPatch("update/{id}")]
         public async Task<IActionResult> UpdateCity(int id, JsonPatchDocument<City> cityPatch)
        {
            var cityFromDb=await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            cityPatch.ApplyTo(cityFromDb,ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity( int id)
        {
            uow.cityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}