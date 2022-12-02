using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class StudentDto
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string SurName { get; set; }
        [Required]
        public string Sex { get; set; }
        [Required]
        public string Birthday { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Tel { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string OldEdu { get; set; }
        [Required]
        public IFormFile Img { get; set; }
        
        public string OldSchool { get; set; }
        [Required]
        public int TitleId { get; set; } //FK
        [Required]
        public int StatusId { get; set; }//FK
        public string Token { get; set; }
    }
}