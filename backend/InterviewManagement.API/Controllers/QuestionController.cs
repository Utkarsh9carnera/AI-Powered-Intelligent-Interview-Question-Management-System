using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Question;
using InterviewManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/questions")]
public class QuestionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public QuestionController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
public async Task<ActionResult<ApiResponse<Question>>> CreateQuestion([FromBody] CreateQuestionDto dto)    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == dto.CreatedBy);

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

    [HttpGet("{id:guid}")]
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

    [HttpPut("{id:guid}")]
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

        return Ok(new ApiResponse<Question>
        {
            Success = true,
            Message = "Question updated successfully.",
            Data = question
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteQuestion(Guid id)
    {
        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == id && !q.IsDeleted);

        if (question == null)
            throw new KeyNotFoundException("Question not found.");

        question.IsDeleted = true;
        question.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Question deleted successfully."
        });
    }
}