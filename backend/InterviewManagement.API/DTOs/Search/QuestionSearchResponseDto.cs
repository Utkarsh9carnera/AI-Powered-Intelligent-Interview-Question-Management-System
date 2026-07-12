namespace InterviewManagement.API.DTOs.Search
{
    public class QuestionSearchResponseDto
    {
        public Guid Id { get; set; }

        public string QuestionText { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public string Difficulty { get; set; } = string.Empty;

        public string Organization { get; set; } = string.Empty;

        public string CreatedBy { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

        public List<string> Metadata { get; set; } = new();
    }
}