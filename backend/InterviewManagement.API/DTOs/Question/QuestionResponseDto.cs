namespace InterviewManagement.API.DTOs.Question
{
    public class QuestionResponseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public string Topic { get; set; } = string.Empty;

        public string Difficulty { get; set; } = string.Empty;

        public string Organization { get; set; } = string.Empty;

        public string Manager { get; set; } = string.Empty;

        public Guid CreatedBy { get; set; }

        public string CreatedByName { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}