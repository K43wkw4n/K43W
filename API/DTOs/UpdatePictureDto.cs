using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdatePictureDto
    {
        public int Id { get; set; }
        
        public IFormFile? File { get; set; }
        [Required]
        public string Name { get; set; }
    }
}