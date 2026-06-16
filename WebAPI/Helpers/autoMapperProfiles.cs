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
            CreateMap<Property, PropertyDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City != null ? src.City.Name : null))
                .ForMember(d => d.Country,opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType,opt => opt.MapFrom(src => src.propertyType.Name))
                .ForMember(d => d.FurnishingType,opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(d => d.Photo,opt => opt.MapFrom(src => src.Photos
                .FirstOrDefault(p=>p.IsPrimary).ImageUrl));   
            CreateMap<Property, PropertyDetailDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City != null ? src.City.Name : null))
                .ForMember(d => d.Country,opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType,opt => opt.MapFrom(src => src.propertyType.Name))
                .ForMember(d => d.FurnishingType,opt => opt.MapFrom(src => src.FurnishingType.Name));                 
            CreateMap<PropertyType,KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDto>(); 
        }
    }
}