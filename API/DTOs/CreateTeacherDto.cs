using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateTeacherDto
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string SurName { get; set; }
        [Required]
        public string Email { get; set; }
        public DateTime? Birth { get; set; }
        [Required]
        public int IdCard { get; set; }
        [Required]
        public IFormFile Img { get; set; }
        [Required]
        public string Export { get; set; }
        [Required]
        public string LvEdu { get; set; }
        [Required]
        public string Program { get; set; }
        [Required]
        public string Position { get; set; }
        [Required]
        public int TitleId { get; set; } //FK
        

    }
}