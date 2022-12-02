namespace API.DTOs
{
    public class UserDto : PersonDto
    {
        public string Email { get; set; }
        public string Token { get; set; }

        // public string Id { get; set; }
        // // public string? FirstName { get; set; }
        // // public string? LastName { get; set; }
        // // public string? Sex { get; set; }
        // public string Birth { get; set; }
        // // public string? Email { get; set; }
        // // public string? PhoneNumber { get; set; }
        // // public string? Address { get; set; }
        // // public string? Image { get; set; }
        // // public string? Role { get; set; }
        // public string? Token { get; set; }

        // //Student
        // public string? OldEdu { get; set; }
        // public int? TitleId { get; set; } //FK
        // public int? StatusId { get; set; } //FK
        // public int? SchoolId { get; set; } //FK

        // //Teacher
        // public string? IdCard { get; set; }
        // public string? Export { get; set; }
        // public string? LvEdu { get; set; }
        // public string? Program { get; set; }
        // public string? Position { get; set; }
    }
}