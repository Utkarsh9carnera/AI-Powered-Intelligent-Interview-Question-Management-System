using InterviewManagement.API.Common;
using InterviewManagement.API.DTOs.Role;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InterviewManagement.API.Controllers
{
    [ApiController]
    [Route("api/v1/roles")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<RoleResponseDto>>>> GetRoles()
        {
            var roles = await _roleService.GetRolesAsync();

            return Ok(new ApiResponse<List<RoleResponseDto>>
            {
                Success = true,
                Message = "Roles retrieved successfully.",
                Data = roles
            });
        }
    }
}