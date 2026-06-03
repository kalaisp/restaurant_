
namespace WebAPI.Interfaces
{
    public interface IunitOfWork
    {
        ICityRepository cityRepository{get;}
        IunitOfWork iunitOfWork{get;}
        IUserRepository userRepository{get;}
        Task<bool>SaveAsync();
    }
}