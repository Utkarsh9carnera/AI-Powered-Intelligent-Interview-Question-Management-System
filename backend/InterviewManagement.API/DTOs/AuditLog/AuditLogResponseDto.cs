namespace InterviewManagement.API.DTOs.AuditLog
{
    public class AuditLogResponseDto
    {
        public Guid Id { get; set; }

        public Guid CorrelationId { get; set; }

        public Guid? UserId { get; set; }

        public string Action { get; set; } = string.Empty;

        public string EventType { get; set; } = string.Empty;

        public string EntityName { get; set; } = string.Empty;

        public Guid? EntityId { get; set; }

        public string Description { get; set; } = string.Empty;

        public string? IPAddress { get; set; }

        public string Severity { get; set; } = string.Empty;

        public string Source { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}