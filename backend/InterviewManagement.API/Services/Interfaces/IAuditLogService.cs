using InterviewManagement.API.DTOs.AuditLog;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IAuditLogService
    {
        Task<IEnumerable<AuditLogResponseDto>> GetAuditLogsAsync();

        Task<AuditLogResponseDto?> GetAuditLogByIdAsync(Guid id);

        Task SaveAuditLogAsync(
            Guid? userId,
            string action,
            string eventType,
            string entityName,
            Guid? entityId,
            string description,
            string? ipAddress,
            string severity,
            string source);
    }
}