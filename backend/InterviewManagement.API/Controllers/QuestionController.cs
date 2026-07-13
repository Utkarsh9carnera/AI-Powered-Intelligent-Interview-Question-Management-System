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
    public async Task<ActionResult<ApiResponse<Question>>> CreateQuestion(
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

        return CreatedAtAction(
            nameof(GetQuestion),
            new { id = question.Id },
            new ApiResponse<Question>
            {
                Success = true,
                Message = "Question created successfully.",
                Data = question
            });
    }

    // GET: api/v1/questions
    [PermissionAuthorize("Question", PermissionAction.View)]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<QuestionResponseDto>>>> GetAllQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.CreatedByUser)
            .Where(q => !q.IsDeleted)
            .Select(q => new QuestionResponseDto
            {
                Id = q.Id,
                Title = q.Title,
                Description = q.Description,
                Answer = q.Answer,
                CreatedBy = q.CreatedBy,
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
    public async Task<ActionResult<ApiResponse<Question>>> GetQuestion(Guid id)
    {
        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);

        if (question == null)
            throw new KeyNotFoundException("Question not found.");

        return Ok(new ApiResponse<Question>
        {
            Success = true,
            Message = "Question retrieved successfully.",
            Data = question
        });
    }

    // PUT: api/v1/questions/{id}
    [PermissionAuthorize("Question", PermissionAction.Update)]
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<Question>>> UpdateQuestion(
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

        return Ok(new ApiResponse<Question>
        {
            Success = true,
            Message = "Question updated successfully.",
            Data = question
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