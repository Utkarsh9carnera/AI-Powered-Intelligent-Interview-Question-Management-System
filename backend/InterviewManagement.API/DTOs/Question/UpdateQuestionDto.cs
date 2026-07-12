using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.Question
{
    public class UpdateQuestionDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(5000)]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Answer is required.")]
        public string Answer { get; set; } = string.Empty;
    }
}