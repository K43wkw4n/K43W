using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateStudentDto
    {
        [Required]
        public string Id { get; set; }
        public string? Name { get; set; }
        public string? SurName { get; set; }
        public string? Sex { get; set; }
        public string? Birthday { get; set; }
        public string? Email { get; set; }
        public string? Tel { get; set; }
        public string? Address { get; set; }
        public string? OldEdu { get; set; }
        
        public IFormFile? Img { get; set; }
        public string? OldSchool { get; set; }
        public string? TitleId { get; set; } //FK 
        public int? StatusId { get; set; }//FK 
        // public int? SchoolId { get; set; }//FK 
    }
}