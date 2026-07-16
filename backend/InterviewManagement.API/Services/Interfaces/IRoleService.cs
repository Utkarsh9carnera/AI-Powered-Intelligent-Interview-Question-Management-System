using InterviewManagement.API.DTOs.Role;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IRoleService
    {
        Task<List<RoleResponseDto>> GetRolesAsync();
    }
}