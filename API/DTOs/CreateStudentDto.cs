using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateStudentDto
    {
        [Required]
        public string Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string SurName { get; set; }
        [Required]
        public string Sex { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
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
        [Required]
        public string OldSchool { get; set; }
        [Required]
        public int TitleId { get; set; } //FK
        [Required]
        public int StatusId { get; set; }//FK
        // [Required]
        // public int SchoolId { get; set; }//FK
        
    }
}