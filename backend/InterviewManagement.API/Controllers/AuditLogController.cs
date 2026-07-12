using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.AuditLog;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InterviewManagement.API.Controllers
{
    [ApiController]
    [Route("api/v1/audit-logs")]
    public class AuditLogController : ControllerBase
    {
        private readonly IAuditLogService _auditLogService;

        public AuditLogController(IAuditLogService auditLogService)
        {
            _auditLogService = auditLogService;
        }

        // GET: api/v1/audit-logs
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<AuditLogResponseDto>>>> GetAuditLogs()
        {
            var logs = await _auditLogService.GetAuditLogsAsync();

            return Ok(new ApiResponse<IEnumerable<AuditLogResponseDto>>
            {
                Success = true,
                Message = "Audit logs retrieved successfully.",
                Data = logs
            });
        }

        // GET: api/v1/audit-logs/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ApiResponse<AuditLogResponseDto>>> GetAuditLog(Guid id)
        {
            var log = await _auditLogService.GetAuditLogByIdAsync(id);

            if (log == null)
                throw new KeyNotFoundException("Audit log not found.");

            return Ok(new ApiResponse<AuditLogResponseDto>
            {
                Success = true,
                Message = "Audit log retrieved successfully.",
                Data = log
            });
        }
    }
}