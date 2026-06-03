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

        public IUserRepository iuserRepository => throw new NotImplementedException();

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync()>0;
        }
    }
}