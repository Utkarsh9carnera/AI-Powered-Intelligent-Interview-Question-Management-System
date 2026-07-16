using InterviewManagement.API.Common;
using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.RolePermission;
using InterviewManagement.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Controllers;

[ApiController]
[Route("api/v1/rolepermissions")]
public class RolePermissionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RolePermissionController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/v1/rolepermissions
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<RolePermissionResponseDto>>>> GetAllRolePermissions()
    {
        var permissions = await _context.RolePermissions
            .Select(r => new RolePermissionResponseDto
            {
                RolePermissionId = r.RolePermissionId,
                RoleId = r.RoleTypeId,
                Permission = r.Permission,
                CanView = r.CanView,
                CanCreate = r.CanCreate,
                CanUpdate = r.CanUpdate,
                CanDelete = r.CanDelete
            })
            .ToListAsync();

        return Ok(new ApiResponse<IEnumerable<RolePermissionResponseDto>>
        {
            Success = true,
            Message = "Role permissions retrieved successfully.",
            Data = permissions
        });
    }

    // GET: api/v1/rolepermissions/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApiResponse<RolePermissionResponseDto>>> GetRolePermission(Guid id)
    {
        var permission = await _context.RolePermissions
            .FirstOrDefaultAsync(r => r.RolePermissionId == id);

        if (permission == null)
            throw new KeyNotFoundException("Role permission not found.");

        return Ok(new ApiResponse<RolePermissionResponseDto>
        {
            Success = true,
            Message = "Role permission retrieved successfully.",
            Data = new RolePermissionResponseDto
            {
                RolePermissionId = permission.RolePermissionId,
                RoleId = permission.RoleTypeId,
                Permission = permission.Permission,
                CanView = permission.CanView,
                CanCreate = permission.CanCreate,
                CanUpdate = permission.CanUpdate,
                CanDelete = permission.CanDelete
            }
        });
    }

    // POST: api/v1/rolepermissions
    [HttpPost]
    public async Task<ActionResult<ApiResponse<RolePermissionResponseDto>>> CreateRolePermission(
        [FromBody] CreateRolePermissionDto dto)
    {
        var roleExists = await _context.RoleTypes
            .AnyAsync(r => r.RoleTypeId == dto.RoleId);

        if (!roleExists)
            throw new KeyNotFoundException("Role not found.");

        var exists = await _context.RolePermissions.AnyAsync(r =>
            r.RoleTypeId == dto.RoleId &&
            r.Permission == dto.Permission);

        if (exists)
            throw new InvalidOperationException("Permission already exists for this role.");

        var permission = new RolePermission
        {
            RoleTypeId = dto.RoleId,
            Permission = dto.Permission,
            CanView = dto.CanView,
            CanCreate = dto.CanCreate,
            CanUpdate = dto.CanUpdate,
            CanDelete = dto.CanDelete
        };

        _context.RolePermissions.Add(permission);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRolePermission),
            new { id = permission.RolePermissionId },
            new ApiResponse<RolePermissionResponseDto>
            {
                Success = true,
                Message = "Role permission created successfully.",
                Data = new RolePermissionResponseDto
                {
                    RolePermissionId = permission.RolePermissionId,
                    RoleId = permission.RoleTypeId,
                    Permission = permission.Permission,
                    CanView = permission.CanView,
                    CanCreate = permission.CanCreate,
                    CanUpdate = permission.CanUpdate,
                    CanDelete = permission.CanDelete
                }
            });
    }
}