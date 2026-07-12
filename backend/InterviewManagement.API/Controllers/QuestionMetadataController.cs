using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.QuestionMetadata;
using InterviewManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/questionmetadata")]
public class QuestionMetadataController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public QuestionMetadataController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/v1/questionmetadata
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<QuestionMetadataResponseDto>>>> GetAll()
    {
        var mappings = await _context.QuestionMetadata
            .Include(qm => qm.Question)
            .Include(qm => qm.Metadata)
            .Select(qm => new QuestionMetadataResponseDto
            {
                Id = qm.Id,
                QuestionId = qm.QuestionId,
                MetadataId = qm.MetadataId,
                QuestionTitle = qm.Question.Title,
                MetadataType = qm.Metadata.Type,
                MetadataValue = qm.Metadata.Value
            })
            .ToListAsync();

        return Ok(new ApiResponse<IEnumerable<QuestionMetadataResponseDto>>
        {
            Success = true,
            Message = "Question metadata retrieved successfully.",
            Data = mappings
        });
    }

    // GET: api/v1/questionmetadata/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<QuestionMetadataResponseDto>>> GetById(Guid id)
    {
        var mapping = await _context.QuestionMetadata
            .Include(qm => qm.Question)
            .Include(qm => qm.Metadata)
            .FirstOrDefaultAsync(qm => qm.Id == id);

        if (mapping == null)
            throw new KeyNotFoundException("Question metadata not found.");

        return Ok(new ApiResponse<QuestionMetadataResponseDto>
        {
            Success = true,
            Message = "Question metadata retrieved successfully.",
            Data = new QuestionMetadataResponseDto
            {
                Id = mapping.Id,
                QuestionId = mapping.QuestionId,
                MetadataId = mapping.MetadataId,
                QuestionTitle = mapping.Question.Title,
                MetadataType = mapping.Metadata.Type,
                MetadataValue = mapping.Metadata.Value
            }
        });
    }

    // POST: api/v1/questionmetadata
    [HttpPost]
    public async Task<ActionResult<ApiResponse<QuestionMetadataResponseDto>>> Create(
        [FromBody] CreateQuestionMetadataDto dto)
    {
        var questionExists = await _context.Questions
            .AnyAsync(q => q.Id == dto.QuestionId);

        if (!questionExists)
            throw new KeyNotFoundException("Question not found.");

        var metadataExists = await _context.Metadata
            .AnyAsync(m => m.Id == dto.MetadataId);

        if (!metadataExists)
            throw new KeyNotFoundException("Metadata not found.");

        var exists = await _context.QuestionMetadata.AnyAsync(qm =>
            qm.QuestionId == dto.QuestionId &&
            qm.MetadataId == dto.MetadataId);

        if (exists)
            throw new InvalidOperationException("This metadata is already linked to the question.");

        var mapping = new QuestionMetadata
        {
            QuestionId = dto.QuestionId,
            MetadataId = dto.MetadataId
        };

        _context.QuestionMetadata.Add(mapping);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById),
            new { id = mapping.Id },
            new ApiResponse<QuestionMetadataResponseDto>
            {
                Success = true,
                Message = "Question metadata created successfully.",
                Data = new QuestionMetadataResponseDto
                {
                    Id = mapping.Id,
                    QuestionId = mapping.QuestionId,
                    MetadataId = mapping.MetadataId
                }
            });
    }

    // PUT: api/v1/questionmetadata/{id}
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<QuestionMetadataResponseDto>>> Update(
        Guid id,
        [FromBody] UpdateQuestionMetadataDto dto)
    {
        var mapping = await _context.QuestionMetadata
            .FirstOrDefaultAsync(qm => qm.Id == id);

        if (mapping == null)
            throw new KeyNotFoundException("Question metadata not found.");

        mapping.QuestionId = dto.QuestionId;
        mapping.MetadataId = dto.MetadataId;

        await _context.SaveChangesAsync();

        return Ok(new ApiResponse<QuestionMetadataResponseDto>
        {
            Success = true,
            Message = "Question metadata updated successfully.",
            Data = new QuestionMetadataResponseDto
            {
                Id = mapping.Id,
                QuestionId = mapping.QuestionId,
                MetadataId = mapping.MetadataId
            }
        });
    }

    // DELETE: api/v1/questionmetadata/{id}
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(Guid id)
    {
        var mapping = await _context.QuestionMetadata
            .FirstOrDefaultAsync(qm => qm.Id == id);

        if (mapping == null)
            throw new KeyNotFoundException("Question metadata not found.");

        _context.QuestionMetadata.Remove(mapping);

        await _context.SaveChangesAsync();

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Question metadata deleted successfully."
        });
    }
}