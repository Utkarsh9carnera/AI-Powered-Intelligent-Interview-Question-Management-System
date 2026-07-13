using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Search;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class SearchService : ISearchService
    {
        private readonly ApplicationDbContext _context;
        private readonly ISearchHistoryService _searchHistoryService;
        private readonly IAuditLogService _auditLogService;

        public SearchService(
            ApplicationDbContext context,
            ISearchHistoryService searchHistoryService,
            IAuditLogService auditLogService)
        {
            _context = context;
            _searchHistoryService = searchHistoryService;
            _auditLogService = auditLogService;
        }

        public async Task<SearchResultDto> SearchQuestionsAsync(SearchRequestDto request)
        {
            var query = _context.Questions
                .Include(q => q.CreatedByUser)
                .Include(q => q.QuestionMetadata)
                    .ThenInclude(qm => qm.Metadata)
                .Where(q => !q.IsDeleted)
                .AsQueryable();

            // Keyword Search
            if (!string.IsNullOrWhiteSpace(request.Keyword))
            {
                query = query.Where(q =>
                    q.Title.Contains(request.Keyword) ||
                    q.Description.Contains(request.Keyword) ||
                    q.Answer.Contains(request.Keyword));
            }

            // Metadata Filter
            if (request.MetadataIds.Any())
            {
                query = query.Where(q =>
                    request.MetadataIds.All(metadataId =>
                        q.QuestionMetadata.Any(qm => qm.MetadataId == metadataId)));
            }

            // Pagination
            query = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize);

            var totalRecords = await query.CountAsync();

var questions = await query
    .Skip((request.PageNumber - 1) * request.PageSize)
    .Take(request.PageSize)
    .ToListAsync();

            var result = questions.Select(q => new SearchResponseDto
            {
                QuestionId = q.Id,
                Title = q.Title,
                Description = q.Description,
                Answer = q.Answer,
                CreatedBy = q.CreatedBy,
                CreatedByName = $"{q.CreatedByUser.FirstName} {q.CreatedByUser.LastName}",
                CreatedAt = q.CreatedAt,

                Metadata = q.QuestionMetadata
                    .Select(qm => new MetadataDto
                    {
                        Id = qm.Metadata.Id,
                        Type = qm.Metadata.Type,
                        Value = qm.Metadata.Value
                    })
                    .ToList()

            }).ToList();

            // Save Search History
            await _searchHistoryService.SaveSearchHistoryAsync(
                request.UserId,
                request.Keyword ?? string.Empty,
                request.MetadataIds.Any()
                    ? string.Join(",", request.MetadataIds)
                    : "No Filters",
                "Database Search"
            );
            // Save Audit Log
await _auditLogService.SaveAuditLogAsync(
    request.UserId,
    "Search",
    "Question Search",
    "Question",
    null,
    $"User searched for '{request.Keyword ?? "All Questions"}'",
    null,
    "Information",
    "SearchService"
);

            return new SearchResultDto
{
    TotalRecords = totalRecords,
    PageNumber = request.PageNumber,
    PageSize = request.PageSize,
    Questions = result
};
        }
    }
}