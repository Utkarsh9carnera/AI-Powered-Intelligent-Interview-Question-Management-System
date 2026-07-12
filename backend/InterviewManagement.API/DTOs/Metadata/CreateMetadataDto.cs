using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.Metadata
{
    public class CreateMetadataDto
    {
        [Required]
        [StringLength(100)]
        public string Type { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Value { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }
    }
}