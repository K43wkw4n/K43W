namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string NameTH { get; set; }
        public string NameENG { get; set; }
        public DateTime Date { get; set; }
        public string TypePj { get; set; }
        public int Typefile { get; set; }
        public string File { get; set; } = string.Empty;
        public string Github { get; set; }
        public string Description { get; set; }
        public string LinkWeb { get; set; }
        public string Video { get; set; }
        public int TeacherId { get; set; } //FK
        public Teacher Teacher { get; set; }
        public int StudentId { get; set; } //FK
        public Student Student { get; set; }
    }
}