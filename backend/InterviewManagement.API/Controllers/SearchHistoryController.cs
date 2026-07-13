using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.SearchHistory;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InterviewManagement.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/search-history")]
    public class SearchHistoryController : ControllerBase
    {
        private readonly ISearchHistoryService _searchHistoryService;

        public SearchHistoryController(ISearchHistoryService searchHistoryService)
        {
            _searchHistoryService = searchHistoryService;
        }

        // GET: api/v1/search-history/{userId}
        [HttpGet("{userId:guid}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SearchHistoryResponseDto>>>> GetUserSearchHistory(Guid userId)
        {
            var history = await _searchHistoryService.GetUserSearchHistoryAsync(userId);

            return Ok(new ApiResponse<IEnumerable<SearchHistoryResponseDto>>
            {
                Success = true,
                Message = "Search history retrieved successfully.",
                Data = history
            });
        }

        // GET: api/v1/search-history/details/{id}
        [HttpGet("details/{id:guid}")]
        public async Task<ActionResult<ApiResponse<SearchHistoryResponseDto>>> GetSearchHistory(Guid id)
        {
            var history = await _searchHistoryService.GetSearchHistoryByIdAsync(id);

            if (history == null)
                throw new KeyNotFoundException("Search history not found.");

            return Ok(new ApiResponse<SearchHistoryResponseDto>
            {
                Success = true,
                Message = "Search history retrieved successfully.",
                Data = history
            });
        }

        // DELETE: api/v1/search-history/{id}
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<ApiResponse<object>>> DeleteSearchHistory(Guid id)
        {
            var deleted = await _searchHistoryService.DeleteSearchHistoryAsync(id);

            if (!deleted)
                throw new KeyNotFoundException("Search history not found.");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Search history deleted successfully."
            });
        }

        // DELETE: api/v1/search-history/clear/{userId}
        [HttpDelete("clear/{userId:guid}")]
        public async Task<ActionResult<ApiResponse<object>>> ClearSearchHistory(Guid userId)
        {
            var cleared = await _searchHistoryService.ClearSearchHistoryAsync(userId);

            if (!cleared)
                throw new KeyNotFoundException("No search history found.");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "Search history cleared successfully."
            });
        }
    }
}