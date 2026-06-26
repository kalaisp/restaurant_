using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Dto;
using WebAPI.Models;
using AutoMapper;


namespace WebAPI.Controllers
{
    public class PropertyController:BaseController
    {
        // public IunitOfWork uow { get; }
        private readonly IunitOfWork uow ;

         private readonly  IPhotoService PhotoService;

        private readonly IMapper mapper;
        public PropertyController(IunitOfWork uow,IMapper mapper,
        IPhotoService photoService)
        {
            this.mapper = mapper;
            PhotoService = photoService;
            this.uow = uow;
            
        }
        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult>GetPropertyList(int sellRent)
        {
            var properties=await uow.propertyRepository.GetProperiesAsync(sellRent);
            var propertyListDTO=mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDTO);
        }
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult>GetPropertyDetail(int id)
        {
            var properties=await uow.propertyRepository.GetPropertiesDetailAsync(id);
            var propertyListDTO=mapper.Map<PropertyDetailDto>(properties);
            return Ok(propertyListDTO);
        }
        [HttpPost("add")]
        // [AllowAnonymous]
        [Authorize]
        public async Task<IActionResult>AddProperty(PropertyDto propertyDto)
        {
            // var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var property=mapper.Map<Property>(propertyDto);
            var userId=GetUserId();
            property.PostedBy=userId;
            property.LastUpdatedBy=userId;
            // property.UsersId = 2; 
            uow.propertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);
           
        }
        [HttpPost("add/photo/{propId}")]
        // [AllowAnonymous]
        [Authorize]
        public async Task<IActionResult>AddPropertyPhoto(IFormFile file,
        int propId)
        {
           var result=await PhotoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var property=await uow.propertyRepository.GetPropertyByIdAsync(propId);
            var photo=new Photo
            {
                ImageUrl=result.SecureUrl.AbsoluteUri,
                PublicId=result.PublicId
            };
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary=true;
            }
            property.Photos.Add(photo);
            await uow.SaveAsync();
            return StatusCode(201);
        } 
        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        [AllowAnonymous]
        public async Task<IActionResult>SetPrimaryPhoto(int propId,string photoPublicId)
        {
            var userId=GetUserId();
            var property=await uow.propertyRepository.GetPropertyByIdAsync(propId);
            
            if (property == null)
            { 
                return BadRequest("not such property or photo exists");
            }
            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorized to change the photo");
            }
            var photo=property.Photos.FirstOrDefault(p=>p.PublicId==photoPublicId);
            if (photo == null)
            {
                return BadRequest("No such property or photo exists");
            }
            if(photo.IsPrimary)
            {
                return BadRequest("This is already a primary photo");
            }
            var currentPrimary=property.Photos.FirstOrDefault(p=>p.IsPrimary);
            if(currentPrimary!=null)
            {
                currentPrimary.IsPrimary=false;
            }
            photo.IsPrimary=true;
            if(await uow.SaveAsync())
            {
                return NoContent();
            }
            return BadRequest("Some error has occured, failed to set primary photo");
        }
        [HttpDelete("delete-photo/{propId}/{photoPublicId}")]
        [AllowAnonymous]
        public async Task<IActionResult>DeletePhoto(int propId,string photoPublicId)
        {
            var userId=GetUserId();
            var property=await uow.propertyRepository.GetPropertyByIdAsync(propId);
            
            if (property == null)
            { 
                return BadRequest("not such property or photo exists");
            }
            if (property.PostedBy != userId)
            {
                return BadRequest("You are not authorized to delete the photo");
            }
            var photo=property.Photos.FirstOrDefault(p=>p.PublicId==photoPublicId);
            if (photo == null)
            {
                return BadRequest("No such property or photo exists");
            }
            if(photo.IsPrimary)
            {
                return BadRequest("You can not delete the primary photo");
            }
            var result=await PhotoService.DeletePhotoAsync(photoPublicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            property.Photos.Remove(photo);
            
            if(await uow.SaveAsync())
            {
                return Ok();
            }
            return BadRequest("Some error has occured, failed to Delete photo");
        }
    }
}