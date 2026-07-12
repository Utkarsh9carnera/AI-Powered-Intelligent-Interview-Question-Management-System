namespace InterviewManagement.API.DTOs.Search
{
    public class QuestionSearchRequestDto
    {
        public string? Keyword { get; set; }

        public Guid? MetadataId { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
    }
}