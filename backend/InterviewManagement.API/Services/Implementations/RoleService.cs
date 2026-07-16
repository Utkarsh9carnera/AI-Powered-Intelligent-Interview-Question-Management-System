using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Role;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class RoleService : IRoleService
    {
        private readonly ApplicationDbContext _context;

        public RoleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<RoleResponseDto>> GetRolesAsync()
{
    return await _context.RoleTypes
        .OrderBy(r => r.RoleName)
        .Select(r => new RoleResponseDto
        {
            Id = r.RoleTypeId,
            RoleName = r.RoleName
        })
        .ToListAsync();
}
    }
}