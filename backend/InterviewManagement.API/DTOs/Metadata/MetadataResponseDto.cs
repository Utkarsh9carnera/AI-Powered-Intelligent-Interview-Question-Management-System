namespace InterviewManagement.API.DTOs.Metadata
{
    public class MetadataResponseDto
    {
        public Guid Id { get; set; }

        public string Type { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}