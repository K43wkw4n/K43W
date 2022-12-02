namespace API.Entities
{
    public class Picture
    {
        public int Id { get; set; }
        public string Img { get; set; } = string.Empty;
        public string Name { get; set; }
        public string PublicId { get; set; } = string.Empty;
        
    }
}