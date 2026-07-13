using InterviewManagement.API.Attributes;
using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.User;
using InterviewManagement.API.Enums;
using InterviewManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/v1/users
    [PermissionAuthorize("User", PermissionAction.View)]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<UserResponseDto>>>> GetAllUsers()
    {
        var users = await _context.Users
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                IsActive = u.IsActive,
                RoleId = u.RoleId,
                CreatedDate = u.CreatedDate,
                LastLogin = u.LastLogin
            })
            .ToListAsync();

        return Ok(new ApiResponse<IEnumerable<UserResponseDto>>
        {
            Success = true,
            Message = "Users retrieved successfully.",
            Data = users
        });
    }

    // GET: api/v1/users/{id}
    [PermissionAuthorize("User", PermissionAction.View)]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserResponseDto>>> GetUser(Guid id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
            throw new KeyNotFoundException("User not found.");

        return Ok(new ApiResponse<UserResponseDto>
        {
            Success = true,
            Message = "User retrieved successfully.",
            Data = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsActive = user.IsActive,
                RoleId = user.RoleId,
                CreatedDate = user.CreatedDate,
                LastLogin = user.LastLogin
            }
        });
    }

    // POST: api/v1/users
    [PermissionAuthorize("User", PermissionAction.Create)]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<UserResponseDto>>> CreateUser([FromBody] CreateUserDto dto)
    {
        // Validate email domain
        if (!dto.Email.EndsWith("@getcarnera.com", StringComparison.OrdinalIgnoreCase))
            throw new UnauthorizedAccessException("Only @getcarnera.com email addresses are allowed.");

        // Check duplicate email
        var emailExists = await _context.Users
            .AnyAsync(u => u.Email == dto.Email);

        if (emailExists)
            throw new InvalidOperationException("Email already exists.");

        // Validate role
        var roleExists = await _context.RoleTypes
            .AnyAsync(r => r.RoleTypeId == dto.RoleId);

        if (!roleExists)
            throw new KeyNotFoundException("Role not found.");

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            RoleId = dto.RoleId,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetUser),
            new { id = user.Id },
            new ApiResponse<UserResponseDto>
            {
                Success = true,
                Message = "User created successfully.",
                Data = new UserResponseDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    RoleId = user.RoleId,
                    IsActive = user.IsActive,
                    CreatedDate = user.CreatedDate,
                    LastLogin = user.LastLogin
                }
            });
    }

    // PUT: api/v1/users/{id}
    [PermissionAuthorize("User", PermissionAction.Update)]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserResponseDto>>> UpdateUser(
        Guid id,
        [FromBody] UpdateUserDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
            throw new KeyNotFoundException("User not found.");

        // Validate email domain
        if (!dto.Email.EndsWith("@getcarnera.com", StringComparison.OrdinalIgnoreCase))
            throw new UnauthorizedAccessException("Only @getcarnera.com email addresses are allowed.");

        // Check duplicate email
        var emailExists = await _context.Users
            .AnyAsync(u => u.Email == dto.Email && u.Id != id);

        if (emailExists)
            throw new InvalidOperationException("Email already exists.");

        // Validate role
        var roleExists = await _context.RoleTypes
            .AnyAsync(r => r.RoleTypeId == dto.RoleId);

        if (!roleExists)
            throw new KeyNotFoundException("Role not found.");

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Email = dto.Email;
        user.RoleId = dto.RoleId;
        user.IsActive = dto.IsActive;

        await _context.SaveChangesAsync();

        return Ok(new ApiResponse<UserResponseDto>
        {
            Success = true,
            Message = "User updated successfully.",
            Data = new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                RoleId = user.RoleId,
                IsActive = user.IsActive,
                CreatedDate = user.CreatedDate,
                LastLogin = user.LastLogin
            }
        });
    }

    // DELETE: api/v1/users/{id}
    [PermissionAuthorize("User", PermissionAction.Delete)]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteUser(Guid id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
            throw new KeyNotFoundException("User not found.");

        // Soft delete (Deactivate user)
        user.IsActive = false;

        await _context.SaveChangesAsync();

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "User deactivated successfully."
        });
    }
}