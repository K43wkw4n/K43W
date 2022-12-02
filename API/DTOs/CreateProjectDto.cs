using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateProjectDto
    {
        [Required]
        public string NameTH { get; set; }
        [Required]
        public string NameENG { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string TypePj { get; set; }
        [Required]
        public int Typefile { get; set; }
        [Required]
        public IFormFile File { get; set; }
        [Required]
        public string Github { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string LinkWeb { get; set; }
        [Required]
        public string Video { get; set; }
        [Required]
        public int TeacherId { get; set; } //FK 
        [Required]
        public int StudentId { get; set; } //FK 
    }
}