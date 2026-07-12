using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.QuestionMetadata
{
    public class CreateQuestionMetadataDto
    {
        [Required]
        public Guid QuestionId { get; set; }

        [Required]
        public Guid MetadataId { get; set; }
    }
}