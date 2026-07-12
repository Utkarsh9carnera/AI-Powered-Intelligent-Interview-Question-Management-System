namespace InterviewManagement.API.Models
{
    public class Metadata
    {
        public Guid Id { get; set; }

        public string Type { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        // Navigation Property
        // Navigation Property
public ICollection<QuestionMetadata> QuestionMetadata { get; set; } = new List<QuestionMetadata>();
    }
}