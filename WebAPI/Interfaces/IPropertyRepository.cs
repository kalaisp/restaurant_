using WebAPI.Models;


namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<Property>GetPropertiesDetailAsync(int id);
          Task<Property>GetPropertyByIdAsync(int id);
        Task<IEnumerable<Property>>GetProperiesAsync(int SellRent);
        void AddProperty(Property property);
        void DeleteProperty(int id); 
    }
}