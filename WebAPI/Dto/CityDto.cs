
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dto
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is mandatory field")]
        [StringLength(50,MinimumLength =2)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "City name should contain only letters")]
         public string? Name { get; set; }
        [Required]
        public string? Country { get; set; }
    }
}