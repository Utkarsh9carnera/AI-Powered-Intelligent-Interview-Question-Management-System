using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.Search;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InterviewManagement.API.Controllers
{
    [ApiController]
    [Route("api/v1/search")]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        // POST: api/v1/search/questions
        [HttpPost("questions")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SearchResponseDto>>>> SearchQuestions(
            [FromBody] SearchRequestDto request)
        {
            var result = await _searchService.SearchQuestionsAsync(request);

            return Ok(new ApiResponse<IEnumerable<SearchResponseDto>>
            {
                Success = true,
                Message = "Questions retrieved successfully.",
                Data = result
            });
        }
    }
}