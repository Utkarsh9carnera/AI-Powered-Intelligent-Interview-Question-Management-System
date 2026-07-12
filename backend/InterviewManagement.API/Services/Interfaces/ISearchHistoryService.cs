using InterviewManagement.API.DTOs.SearchHistory;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface ISearchHistoryService
    {
        Task<IEnumerable<SearchHistoryResponseDto>> GetUserSearchHistoryAsync(Guid userId);

        Task<SearchHistoryResponseDto?> GetSearchHistoryByIdAsync(Guid id);

        Task SaveSearchHistoryAsync(
            Guid userId,
            string query,
            string appliedFilters,
            string aiResponse);

        Task<bool> DeleteSearchHistoryAsync(Guid id);

        Task<bool> ClearSearchHistoryAsync(Guid userId);
    }
}