namespace InterviewManagement.API.DTOs.Search
{
    public class SearchRequestDto
    {
        public string? Keyword { get; set; }

        // Selected metadata IDs
        public List<Guid> MetadataIds { get; set; } = new();

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 10;
    }
}