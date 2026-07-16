using InterviewManagement.API.Attributes;
using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.User;
using InterviewManagement.API.Enums;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    // GET: api/v1/users
    [PermissionAuthorize("User", PermissionAction.View)]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResponse<UserResponseDto>>>> GetAllUsers(
        [FromQuery] UserQueryDto query)
    {
        var users = await _userService.GetUsersAsync(query);

        return Ok(new ApiResponse<PagedResponse<UserResponseDto>>
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
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
            throw new KeyNotFoundException("User not found.");

        return Ok(new ApiResponse<UserResponseDto>
        {
            Success = true,
            Message = "User retrieved successfully.",
            Data = user
        });
    }

    // POST: api/v1/users
    [PermissionAuthorize("User", PermissionAction.Create)]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<UserResponseDto>>> CreateUser(
        [FromBody] CreateUserDto dto)
    {
        var createdUser = await _userService.CreateUserAsync(dto);

        return CreatedAtAction(
            nameof(GetUser),
            new { id = createdUser.Id },
            new ApiResponse<UserResponseDto>
            {
                Success = true,
                Message = "User created successfully.",
                Data = createdUser
            });
    }

    // PUT: api/v1/users/{id}
    [PermissionAuthorize("User", PermissionAction.Update)]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ApiResponse<UserResponseDto>>> UpdateUser(
        Guid id,
        [FromBody] UpdateUserDto dto)
    {
        var updatedUser = await _userService.UpdateUserAsync(id, dto);

        if (updatedUser == null)
            throw new KeyNotFoundException("User not found.");

        return Ok(new ApiResponse<UserResponseDto>
        {
            Success = true,
            Message = "User updated successfully.",
            Data = updatedUser
        });
    }

    // DELETE: api/v1/users/{id}
    [PermissionAuthorize("User", PermissionAction.Delete)]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<ApiResponse<object>>> DeleteUser(Guid id)
    {
        var deleted = await _userService.DeleteUserAsync(id);

        if (!deleted)
            throw new KeyNotFoundException("User not found.");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "User deactivated successfully."
        });
    }
}