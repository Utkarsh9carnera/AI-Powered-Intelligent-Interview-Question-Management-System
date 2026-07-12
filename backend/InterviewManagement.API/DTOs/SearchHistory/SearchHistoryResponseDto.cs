namespace InterviewManagement.API.DTOs.SearchHistory
{
    public class SearchHistoryResponseDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Query { get; set; } = string.Empty;

        public string AppliedFilters { get; set; } = string.Empty;

        public string AIResponse { get; set; } = string.Empty;

        public DateTime SearchedAt { get; set; }
    }
}