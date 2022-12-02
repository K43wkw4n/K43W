namespace API.Entities
{
    public class History
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public DateTime Year { get; set; }
        public string Conpany { get; set; }
        public int JobId { get; set; } //FK
        public Job Job { get; set; }
        public int StudentId { get; set; } //FK
        public Student Student { get; set; }
    }
}