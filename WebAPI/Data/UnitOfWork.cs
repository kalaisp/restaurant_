using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IunitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork (DataContext dc)
        {
            this.dc=dc;
        }
        public ICityRepository cityRepository => 
            new CityRepository(dc);

        public IUserRepository userRepository=>
            new UserRepository(dc);
        public IunitOfWork iunitOfWork => throw new NotImplementedException();
        // public IFurnishingTypeRepository FurnishingTypeRepository =>         
        //             new FurnishingTypeRepository(dc);
        public IUserRepository iuserRepository => throw new NotImplementedException();

        public IPropertyRepository propertyRepository => 
         new PropertyRepository(dc);

        public IPropertyTypeRepository propertyTypeRepository => 
        new PropertyTypeRepository(dc);

        public IFurnishingTypeRepository FurnishingTypeRepository => 
         new FurnishingTypeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync()>0;
        }
    }
}