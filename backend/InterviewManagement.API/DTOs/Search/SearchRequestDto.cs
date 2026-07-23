namespace InterviewManagement.API.DTOs.Search
{
    public class SearchRequestDto
    {
        // Temporary until JWT authentication is used
        public Guid UserId { get; set; }

        public string? Keyword { get; set; }

        public List<Guid> MetadataIds { get; set; } = new();

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "Relevance";
    }
}