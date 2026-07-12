using InterviewManagement.API.DTOs.User;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();

        Task<UserResponseDto?> GetUserByIdAsync(Guid id);

        Task<UserResponseDto> CreateUserAsync(CreateUserDto dto);

        Task<UserResponseDto?> UpdateUserAsync(Guid id, UpdateUserDto dto);

        Task<bool> DeleteUserAsync(Guid id);
    }
}