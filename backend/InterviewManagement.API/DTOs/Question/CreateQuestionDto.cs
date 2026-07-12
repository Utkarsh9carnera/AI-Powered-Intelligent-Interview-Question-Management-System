using System.ComponentModel.DataAnnotations;
using InterviewManagement.API.Common;

namespace InterviewManagement.API.DTOs.Question
{
    public class CreateQuestionDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, ErrorMessage = "Title cannot exceed 200 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(2000, ErrorMessage = "Description cannot exceed 2000 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Answer is required.")]
        [StringLength(5000, ErrorMessage = "Answer cannot exceed 5000 characters.")]
        public string Answer { get; set; } = string.Empty;

        [Required(ErrorMessage = "CreatedBy is required.")]
        public Guid CreatedBy { get; set; }
    }
}