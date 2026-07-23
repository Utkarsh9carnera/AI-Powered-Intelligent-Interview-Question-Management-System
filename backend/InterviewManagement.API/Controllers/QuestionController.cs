using InterviewManagement.API.Attributes;
using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Question;
using InterviewManagement.API.Enums;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/questions")]
public class QuestionController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAuditLogService _auditLogService;

    public QuestionController(
        ApplicationDbContext context,
        IAuditLogService auditLogService)
    {
        _context = context;
        _auditLogService = auditLogService;
    }

    // POST: api/v1/questions
    [PermissionAuthorize("Question", PermissionAction.Create)]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<QuestionResponseDto>>> CreateQuestion(
        [FromBody] CreateQuestionDto dto)
    {
        var userExists = await _context.Users
            .AnyAsync(u => u.Id == dto.CreatedBy);

        if (!userExists)
            throw new KeyNotFoundException("User not found.");

        var question = new Question
        {
            Title = dto.Title,
            Description = dto.Description,
            Answer = dto.Answer,
            CreatedBy = dto.CreatedBy
        };

        _context.Questions.Add(question);

        await _context.SaveChangesAsync();

        foreach (var metadataId in dto.MetadataIds)
        {
            var metadataExists = await _context.Metadata
                .AnyAsync(m => m.Id == metadataId);

            if (!metadataExists)
                continue;

            _context.QuestionMetadata.Add(
                new QuestionMetadata
                {
                    QuestionId = question.Id,
                    MetadataId = metadataId
                });
        }

        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            question.CreatedBy,
            "Create Question",
            "Question",
            "Question",
            question.Id,
            $"Question '{question.Title}' created.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Information",
            "QuestionController");

        var response = await _context.Questions
            .Include(q => q.CreatedByUser)
            .Include(q => q.QuestionMetadata)
                .ThenInclude(qm => qm.Metadata)
            .Where(q => q.Id == question.Id)
            .Select(q => new QuestionResponseDto
            {
                Id = q.Id,
                Title = q.Title,
                Description = q.Description,
                Answer = q.Answer,
                IsActive = !q.IsDeleted,

                Topic = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Topic")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",

                Difficulty = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Difficulty")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",
Organization = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Organization")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",

Manager = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Manager")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",
                CreatedBy = q.CreatedBy,

                CreatedByName =
                    q.CreatedByUser.FirstName + " " +
                    q.CreatedByUser.LastName,

                CreatedAt = q.CreatedAt,
                UpdatedAt = q.UpdatedAt
            })
            .FirstAsync();

        return CreatedAtAction(
            nameof(GetQuestion),
            new { id = question.Id },
            new ApiResponse<QuestionResponseDto>
            {
                Success = true,
                Message = "Question created successfully.",
                Data = response
            });
    }

    // GET: api/v1/questions
    [PermissionAuthorize("Question", PermissionAction.View)]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<QuestionResponseDto>>>> GetAllQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.CreatedByUser)
            .Include(q => q.QuestionMetadata)
                .ThenInclude(qm => qm.Metadata)
            .Where(q => !q.IsDeleted)
            .Select(q => new QuestionResponseDto
            {
                Id = q.Id,

                Title = q.Title,

                Description = q.Description,

                Answer = q.Answer,

                IsActive = !q.IsDeleted,

                Topic = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Topic")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",

                Difficulty = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Difficulty")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",
Organization = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Organization")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",

Manager = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Manager")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",
                CreatedBy = q.CreatedBy,

                CreatedByName =
                    q.CreatedByUser.FirstName + " " +
                    q.CreatedByUser.LastName,

                CreatedAt = q.CreatedAt,

                UpdatedAt = q.UpdatedAt
            })
            .ToListAsync();

        return Ok(new ApiResponse<IEnumerable<QuestionResponseDto>>
        {
            Success = true,
            Message = "Questions retrieved successfully.",
            Data = questions
        });
    }
        // GET: api/v1/questions/{id}
    [PermissionAuthorize("Question", PermissionAction.View)]
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<QuestionResponseDto>>> GetQuestion(Guid id)
    {
        var question = await _context.Questions
            .Include(q => q.CreatedByUser)
            .Include(q => q.QuestionMetadata)
                .ThenInclude(qm => qm.Metadata)
            .Where(q => q.Id == id && !q.IsDeleted)
            .Select(q => new QuestionResponseDto
            {
                Id = q.Id,

                Title = q.Title,

                Description = q.Description,

                Answer = q.Answer,

                IsActive = !q.IsDeleted,

                Topic = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Topic")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",

                Difficulty = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Difficulty")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",
Organization = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Organization")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",

Manager = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Manager")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",
                CreatedBy = q.CreatedBy,

                CreatedByName =
                    q.CreatedByUser.FirstName + " " +
                    q.CreatedByUser.LastName,

                CreatedAt = q.CreatedAt,

                UpdatedAt = q.UpdatedAt
            })
            .FirstOrDefaultAsync();

        if (question == null)
            throw new KeyNotFoundException("Question not found.");

        return Ok(new ApiResponse<QuestionResponseDto>
        {
            Success = true,
            Message = "Question retrieved successfully.",
            Data = question
        });
    }

    // PUT: api/v1/questions/{id}
    [PermissionAuthorize("Question", PermissionAction.Update)]
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<QuestionResponseDto>>> UpdateQuestion(
        Guid id,
        [FromBody] UpdateQuestionDto dto)
    {
        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);

        if (question == null)
            throw new KeyNotFoundException("Question not found.");

        question.Title = dto.Title;
        question.Description = dto.Description;
        question.Answer = dto.Answer;
        question.UpdatedAt = DateTime.UtcNow;

        var existingMappings = await _context.QuestionMetadata
            .Where(qm => qm.QuestionId == id)
            .ToListAsync();

        _context.QuestionMetadata.RemoveRange(existingMappings);

        foreach (var metadataId in dto.MetadataIds)
        {
            var metadataExists = await _context.Metadata
                .AnyAsync(m => m.Id == metadataId);

            if (!metadataExists)
                continue;

            _context.QuestionMetadata.Add(
                new QuestionMetadata
                {
                    QuestionId = id,
                    MetadataId = metadataId
                });
        }

        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            question.CreatedBy,
            "Update Question",
            "Question",
            "Question",
            question.Id,
            $"Question '{question.Title}' updated.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Information",
            "QuestionController");

        var response = await _context.Questions
            .Include(q => q.CreatedByUser)
            .Include(q => q.QuestionMetadata)
                .ThenInclude(qm => qm.Metadata)
            .Where(q => q.Id == id)
            .Select(q => new QuestionResponseDto
            {
                Id = q.Id,

                Title = q.Title,

                Description = q.Description,

                Answer = q.Answer,

                IsActive = !q.IsDeleted,

                Topic = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Topic")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",

                Difficulty = q.QuestionMetadata
                    .Where(qm => qm.Metadata.Type == "Difficulty")
                    .Select(qm => qm.Metadata.Value)
                    .FirstOrDefault() ?? "-",
Organization = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Organization")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",

Manager = q.QuestionMetadata
    .Where(qm => qm.Metadata.Type == "Manager")
    .Select(qm => qm.Metadata.Value)
    .FirstOrDefault() ?? "-",
                CreatedBy = q.CreatedBy,

                CreatedByName =
                    q.CreatedByUser.FirstName + " " +
                    q.CreatedByUser.LastName,

                CreatedAt = q.CreatedAt,

                UpdatedAt = q.UpdatedAt
            })
            .FirstAsync();

        return Ok(new ApiResponse<QuestionResponseDto>
        {
            Success = true,
            Message = "Question updated successfully.",
            Data = response
        });
    }
// GET: api/v1/questions/related/{id}
// GET: api/v1/questions/related/{id}
// GET: api/v1/questions/related/{id}
[HttpGet("related/{id:guid}")]
public async Task<ActionResult<ApiResponse<IEnumerable<QuestionResponseDto>>>> GetRelatedQuestions(Guid id)
{
    var current = await _context.Questions
        .Include(q => q.QuestionMetadata)
        .FirstOrDefaultAsync(q => q.Id == id);

    if (current == null)
    {
        return NotFound();
    }

    var metadataIds = current.QuestionMetadata
        .Select(qm => qm.MetadataId)
        .ToList();

    var related = await _context.Questions
        .Include(q => q.CreatedByUser)
        .Include(q => q.QuestionMetadata)
            .ThenInclude(qm => qm.Metadata)
        .Where(q =>
            q.Id != id &&
            !q.IsDeleted &&
            q.QuestionMetadata.Any(qm => metadataIds.Contains(qm.MetadataId)))
        .Take(5)
        .ToListAsync();

    var result = related.Select(q => new QuestionResponseDto
    {
        Id = q.Id,
        Title = q.Title,
        Description = q.Description,
        Answer = q.Answer,

        Topic = q.QuestionMetadata
            .FirstOrDefault(m => m.Metadata.Type == "Topic")
            ?.Metadata.Value ?? "",

        Difficulty = q.QuestionMetadata
    .FirstOrDefault(m => m.Metadata.Type == "Difficulty")
    ?.Metadata.Value ?? "",

Organization = q.QuestionMetadata
    .FirstOrDefault(m => m.Metadata.Type == "Organization")
    ?.Metadata.Value ?? "",

Manager = q.QuestionMetadata
    .FirstOrDefault(m => m.Metadata.Type == "Manager")
    ?.Metadata.Value ?? "",

        CreatedBy = q.CreatedBy,
        CreatedByName = $"{q.CreatedByUser.FirstName} {q.CreatedByUser.LastName}",
        CreatedAt = q.CreatedAt,
        UpdatedAt = q.UpdatedAt
    }).ToList();

    return Ok(new ApiResponse<IEnumerable<QuestionResponseDto>>
    {
        Success = true,
        Message = "Related questions retrieved successfully.",
        Data = result
    });
}
    // DELETE: api/v1/questions/{id}
    [PermissionAuthorize("Question", PermissionAction.Delete)]
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteQuestion(Guid id)
    {
        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);

        if (question == null)
            throw new KeyNotFoundException("Question not found.");

        question.IsDeleted = true;
        question.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        await _auditLogService.SaveAuditLogAsync(
            question.CreatedBy,
            "Delete Question",
            "Question",
            "Question",
            question.Id,
            $"Question '{question.Title}' deleted.",
            HttpContext.Connection.RemoteIpAddress?.ToString(),
            "Warning",
            "QuestionController");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Question deleted successfully."
        });
    }
}