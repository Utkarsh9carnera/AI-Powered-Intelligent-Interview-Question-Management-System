using InterviewManagement.API.DTOs.Search;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface ISearchService
    {
        Task<SearchResultDto> SearchQuestionsAsync(SearchRequestDto request);
    }
}