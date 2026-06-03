using AutoMapper;
using WebAPI.Dto;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class autoMapperProfiles:Profile
    {
        public autoMapperProfiles()
        {
            CreateMap<City,CityDto>().ReverseMap();
             CreateMap<City,CityUpdateDto>().ReverseMap();
            
        }
    }
}