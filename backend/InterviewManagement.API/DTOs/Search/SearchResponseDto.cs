namespace InterviewManagement.API.DTOs.Search
{
    public class SearchResponseDto
    {
        public Guid QuestionId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public Guid CreatedBy { get; set; }

        public string CreatedByName { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public List<MetadataDto> Metadata { get; set; } = new();
    }

    public class MetadataDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;
    }
}