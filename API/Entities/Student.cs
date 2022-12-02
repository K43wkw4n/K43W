namespace API.Entities
{
    public class Student
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Sex { get; set; }
        public string Birthday { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public string Address { get; set; }
        public string OldEdu { get; set; }
        public string Img { get; set; } = string.Empty;
        public string OldSchool { get; set; } //#\\
        public int TitleId { get; set; } //FK
        public Title Title { get; set; }
        public int StatusId { get; set; }//FK
        public Status Status { get; set; }

        // public int SchoolId { get; set; }//FK
        // public School School { get; set; }
    }
}