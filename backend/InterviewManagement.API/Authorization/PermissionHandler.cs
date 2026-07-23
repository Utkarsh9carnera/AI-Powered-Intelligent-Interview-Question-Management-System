using InterviewManagement.API.Data;
using InterviewManagement.API.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InterviewManagement.API.Authorization
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly ApplicationDbContext _context;

        public PermissionHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            PermissionRequirement requirement)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return;

            var userId = Guid.Parse(userIdClaim.Value);

            var user = await _context.Users
                .Include(u => u.RoleType)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return;

            var rolePermission = await _context.RolePermissions
    .FirstOrDefaultAsync(r =>
        r.RoleId == user.RoleId &&
        r.Permission == requirement.Permission);

            if (rolePermission == null)
                return;

            bool hasPermission = requirement.Action switch
            {
                PermissionAction.View => rolePermission.CanView,
                PermissionAction.Create => rolePermission.CanCreate,
                PermissionAction.Update => rolePermission.CanUpdate,
                PermissionAction.Delete => rolePermission.CanDelete,
                _ => false
            };

            if (hasPermission)
            {
                context.Succeed(requirement);
            }
        }
    }
}