using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models; 
namespace WebAPI.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext dc;
        public PropertyRepository(DataContext dc)
        {
            this.dc = dc;
            
        }
        public void AddProperty(Property property)
        {
           dc.Properties.Add(property);
        }

        

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Property> getproper(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetProperiesAsync(int sellRent) // ✅ camelCase
        {
            var properties = await dc.Properties
            .Include(p=>p.propertyType)
            .Include(p=>p.City)
            .Include(p=>p.FurnishingType)
            .Include(p=>p.Photos)
                .Where(p => p.SellRent == sellRent) // ✅ matches parameter
                .ToListAsync();
            return properties;
        }

        public async Task<Property> GetPropertiesDetailAsync(int id)
        {
           var properties = await dc.Properties
            .Include(p=>p.propertyType)
            .Include(p=>p.City)
            .Include(p=>p.FurnishingType)
            .Include(p=>p.Photos)
            .Where(p => p.Id == id).FirstAsync();
            return properties;
        }
         public async Task<Property> GetPropertyByIdAsync(int id)
        {
           var properties = await dc.Properties            
            .Include(p=>p.Photos)
            .Where(p => p.Id == id).FirstOrDefaultAsync();
            return properties;
        }
        
       
    }
}