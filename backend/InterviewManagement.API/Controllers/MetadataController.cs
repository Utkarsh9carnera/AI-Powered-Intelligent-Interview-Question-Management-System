using InterviewManagement.API.Attributes;
using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Metadata;
using InterviewManagement.API.Enums;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/metadata")]
public class MetadataController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAuditLogService _auditLogService;

    public MetadataController(
        ApplicationDbContext context,
        IAuditLogService auditLogService)
    {
        _context = context;
        _auditLogService = auditLogService;
    }

    // GET: api/v1/metadata
    [PermissionAuthorize("Metadata", PermissionAction.View)]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<MetadataResponseDto>>>> GetAllMetadata()
    {
        var metadata = await _context.Metadata
            .Select(m => new MetadataResponseDto
            {
                Id = m.Id,
                Type = m.Type,
                Value = m.Value,
                Description = m.Description
            })
            .ToListAsync();

        return Ok(new ApiResponse<IEnumerable<MetadataResponseDto>>
        {
            Success = true,
            Message = "Metadata retrieved successfully.",
            Data = metadata
        });
    }

    // GET: api/v1/metadata/{id}
    [PermissionAuthorize("Metadata", PermissionAction.View)]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<MetadataResponseDto>>> GetMetadata(Guid id)
    {
        var metadata = await _context.Metadata
            .FirstOrDefaultAsync(m => m.Id == id);

        if (metadata == null)
            throw new KeyNotFoundException("Metadata not found.");

        return Ok(new ApiResponse<MetadataResponseDto>
        {
            Success = true,
            Message = "Metadata retrieved successfully.",
            Data = new MetadataResponseDto
            {
                Id = metadata.Id,
                Type = metadata.Type,
                Value = metadata.Value,
                Description = metadata.Description
            }
        });
    }

    // POST: api/v1/metadata
    [PermissionAuthorize("Metadata", PermissionAction.Create)]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<MetadataResponseDto>>> CreateMetadata(
        [FromBody] CreateMetadataDto dto)
    {
        var exists = await _context.Metadata.AnyAsync(m =>
            m.Type == dto.Type &&
            m.Value == dto.Value);

        if (exists)
            throw new InvalidOperationException("Metadata already exists.");

        var metadata = new Metadata
        {
            Type = dto.Type,
            Value = dto.Value,
            Description = dto.Description ?? string.Empty
        };

        _context.Metadata.Add(metadata);
        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            null,
            "Create Metadata",
            "Metadata",
            "Metadata",
            metadata.Id,
            $"Metadata '{metadata.Type} - {metadata.Value}' created.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Information",
            "MetadataController");

        return CreatedAtAction(
            nameof(GetMetadata),
            new { id = metadata.Id },
            new ApiResponse<MetadataResponseDto>
            {
                Success = true,
                Message = "Metadata created successfully.",
                Data = new MetadataResponseDto
                {
                    Id = metadata.Id,
                    Type = metadata.Type,
                    Value = metadata.Value,
                    Description = metadata.Description
                }
            });
    }

    // PUT: api/v1/metadata/{id}
    [PermissionAuthorize("Metadata", PermissionAction.Update)]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<MetadataResponseDto>>> UpdateMetadata(
        Guid id,
        [FromBody] UpdateMetadataDto dto)
    {
        var metadata = await _context.Metadata
            .FirstOrDefaultAsync(m => m.Id == id);

        if (metadata == null)
            throw new KeyNotFoundException("Metadata not found.");

        metadata.Type = dto.Type;
        metadata.Value = dto.Value;
        metadata.Description = dto.Description ?? string.Empty;

        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            null,
            "Update Metadata",
            "Metadata",
            "Metadata",
            metadata.Id,
            $"Metadata '{metadata.Type} - {metadata.Value}' updated.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Information",
            "MetadataController");

        return Ok(new ApiResponse<MetadataResponseDto>
        {
            Success = true,
            Message = "Metadata updated successfully.",
            Data = new MetadataResponseDto
            {
                Id = metadata.Id,
                Type = metadata.Type,
                Value = metadata.Value,
                Description = metadata.Description
            }
        });
    }

    // DELETE: api/v1/metadata/{id}
    [PermissionAuthorize("Metadata", PermissionAction.Delete)]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteMetadata(Guid id)
    {
        var metadata = await _context.Metadata
            .FirstOrDefaultAsync(m => m.Id == id);

        if (metadata == null)
            throw new KeyNotFoundException("Metadata not found.");

        _context.Metadata.Remove(metadata);
        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            null,
            "Delete Metadata",
            "Metadata",
            "Metadata",
            metadata.Id,
            $"Metadata '{metadata.Type} - {metadata.Value}' deleted.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Warning",
            "MetadataController");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Metadata deleted successfully."
        });
    }
}