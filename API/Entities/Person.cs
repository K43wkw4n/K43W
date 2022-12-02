using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Person : IdentityUser
    {
        //Student And Teacher
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public string Birth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public string Role { get; set; }
        
        //Student
        public string? OldEdu { get; set; }
        public int TitleId { get; set; } //FK
        public Title Title { get; set; }
        public int StatusId { get; set; } //FK
        public Status Status { get; set; }
        public string? OldSchool { get; set; }
        // public int SchoolId { get; set; } //FK
        // public School School { get; set; }

        //Teacher
        public string? IdCard { get; set; }
        public string? Export { get; set; }
        public string? LvEdu { get; set; }
        public string? Program { get; set; }
        public string? Position { get; set; }
    }
}