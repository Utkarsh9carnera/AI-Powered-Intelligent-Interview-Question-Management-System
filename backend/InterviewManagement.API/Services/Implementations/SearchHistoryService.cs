using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.SearchHistory;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class SearchHistoryService : ISearchHistoryService
    {
        private readonly ApplicationDbContext _context;

        public SearchHistoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SearchHistoryResponseDto>> GetUserSearchHistoryAsync(Guid userId)
        {
            var history = await _context.SearchHistories
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.SearchedAt)
                .ToListAsync();

            return history.Select(item => new SearchHistoryResponseDto
            {
                Id = item.Id,
                UserId = item.UserId,
                Query = item.Query,
                AppliedFilters = item.AppliedFilters,
                AIResponse = item.AIResponse,
                SearchedAt = item.SearchedAt
            });
        }

        public async Task<SearchHistoryResponseDto?> GetSearchHistoryByIdAsync(Guid id)
        {
            var history = await _context.SearchHistories
                .FirstOrDefaultAsync(s => s.Id == id);

            if (history == null)
            {
                return null;
            }

            return new SearchHistoryResponseDto
            {
                Id = history.Id,
                UserId = history.UserId,
                Query = history.Query,
                AppliedFilters = history.AppliedFilters,
                AIResponse = history.AIResponse,
                SearchedAt = history.SearchedAt
            };
        }

        public async Task SaveSearchHistoryAsync(
            Guid userId,
            string query,
            string appliedFilters,
            string aiResponse)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

           var existingHistory = await _context.SearchHistories
    .FirstOrDefaultAsync(h =>
        h.UserId == userId &&
        h.Query.ToLower() == query.Trim().ToLower());

if (existingHistory != null)
{
    existingHistory.SearchedAt = DateTime.UtcNow;
    existingHistory.AppliedFilters = appliedFilters;
    existingHistory.AIResponse = aiResponse;
}
else
{
    var history = new SearchHistory
    {
        Id = Guid.NewGuid(),
        UserId = userId,
        Query = query.Trim(),
        AppliedFilters = appliedFilters,
        AIResponse = aiResponse,
        SearchedAt = DateTime.UtcNow
    };

    _context.SearchHistories.Add(history);
}

await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteSearchHistoryAsync(Guid id)
        {
            var history = await _context.SearchHistories
                .FirstOrDefaultAsync(s => s.Id == id);

            if (history == null)
            {
                return false;
            }

            _context.SearchHistories.Remove(history);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ClearSearchHistoryAsync(Guid userId)
        {
            var histories = await _context.SearchHistories
                .Where(s => s.UserId == userId)
                .ToListAsync();

            if (!histories.Any())
            {
                return false;
            }

            _context.SearchHistories.RemoveRange(histories);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}