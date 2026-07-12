namespace InterviewManagement.API.Models
{
    public class QuestionMetadata
    {
        public Guid Id { get; set; }

        public Guid QuestionId { get; set; }

        public Guid MetadataId { get; set; }

        public Question Question { get; set; } = null!;

        public Metadata Metadata { get; set; } = null!;
    }
}