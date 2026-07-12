using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.AuditLog;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class AuditLogService : IAuditLogService
    {
        private readonly ApplicationDbContext _context;

        public AuditLogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AuditLogResponseDto>> GetAuditLogsAsync()
        {
            var logs = await _context.AuditLogs
    .OrderByDescending(a => a.CreatedAt)
    .ToListAsync();

return logs.Select(log => new AuditLogResponseDto
{
    Id = log.Id,
    CorrelationId = log.CorrelationId,
    UserId = log.UserId,
    Action = log.Action,
    EventType = log.EventType,
    EntityName = log.EntityName,
    EntityId = log.EntityId,
    Description = log.Description,
    IPAddress = log.IPAddress,
    Severity = log.Severity,
    Source = log.Source,
    CreatedAt = log.CreatedAt
});
        }

        public async Task<AuditLogResponseDto?> GetAuditLogByIdAsync(Guid id)
        {
            var log = await _context.AuditLogs
    .FirstOrDefaultAsync(a => a.Id == id);

if (log == null)
{
    return null;
}

return new AuditLogResponseDto
{
    Id = log.Id,
    CorrelationId = log.CorrelationId,
    UserId = log.UserId,
    Action = log.Action,
    EventType = log.EventType,
    EntityName = log.EntityName,
    EntityId = log.EntityId,
    Description = log.Description,
    IPAddress = log.IPAddress,
    Severity = log.Severity,
    Source = log.Source,
    CreatedAt = log.CreatedAt
};
        }

        public async Task SaveAuditLogAsync(
            Guid? userId,
            string action,
            string eventType,
            string entityName,
            Guid? entityId,
            string description,
            string? ipAddress,
            string severity,
            string source)
        {
            var auditLog = new AuditLog
{
    Id = Guid.NewGuid(),
    CorrelationId = Guid.NewGuid(),
    UserId = userId,
    Action = action,
    EventType = eventType,
    EntityName = entityName,
    EntityId = entityId,
    Description = description,
    IPAddress = ipAddress,
    Severity = severity,
    Source = source,
    CreatedAt = DateTime.UtcNow
};

_context.AuditLogs.Add(auditLog);

await _context.SaveChangesAsync();
        }
    }
}