namespace InterviewManagement.API.DTOs.Search
{
    public class SearchResultDto
    {
        public int TotalRecords { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public List<SearchResponseDto> Questions { get; set; } = new();
    }
}