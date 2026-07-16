using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.User;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IUserService
    {
        // User Listing (Search, Filter, Pagination, Sorting)
        Task<PagedResponse<UserResponseDto>> GetUsersAsync(UserQueryDto query);

        // Get User By Id
        Task<UserResponseDto?> GetUserByIdAsync(Guid id);

        // Create User
        Task<UserResponseDto> CreateUserAsync(CreateUserDto dto);

        // Update User
        Task<UserResponseDto?> UpdateUserAsync(Guid id, UpdateUserDto dto);

        // Soft Delete User
        Task<bool> DeleteUserAsync(Guid id);
    }
}