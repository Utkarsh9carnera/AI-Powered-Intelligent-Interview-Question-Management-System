namespace InterviewManagement.API.DTOs.QuestionMetadata
{
    public class QuestionMetadataResponseDto
    {
        public Guid Id { get; set; }

        public Guid QuestionId { get; set; }

        public Guid MetadataId { get; set; }

        public string QuestionTitle { get; set; } = string.Empty;

        public string MetadataType { get; set; } = string.Empty;

        public string MetadataValue { get; set; } = string.Empty;
    }
}