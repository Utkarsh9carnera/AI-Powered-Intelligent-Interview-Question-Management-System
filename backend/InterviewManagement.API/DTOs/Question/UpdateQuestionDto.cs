using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.Question
{
    public class UpdateQuestionDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(5000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Answer { get; set; } = string.Empty;

        // Replace all metadata associations
        public List<Guid> MetadataIds { get; set; } = new();
    }
}