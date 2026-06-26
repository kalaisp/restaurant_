
namespace WebAPI.Interfaces
{
    public interface IunitOfWork
    {
        ICityRepository cityRepository{get;}
        IunitOfWork iunitOfWork{get;}
        IUserRepository userRepository{get;}
        IPropertyRepository propertyRepository{get;}
        IFurnishingTypeRepository FurnishingTypeRepository {get; }

        IPropertyTypeRepository propertyTypeRepository{get;}
        Task<bool>SaveAsync();
    }
}