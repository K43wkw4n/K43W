namespace API.Entities
{ 
    public class Teacher
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Email { get; set; }
        public string Birth { get; set; }
        public string IdCard { get; set; }
        public string Img { get; set; }
        public string Export { get; set; }
        public string LvEdu { get; set; }
        public string Program { get; set; }
        public string Position { get; set; }
        public int TitleId { get; set; } //FK
        public Title Title { get; set; }
    }
}