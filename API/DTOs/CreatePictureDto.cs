using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreatePictureDto
    {
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Name { get; set; }
    }
}