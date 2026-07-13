using InterviewManagement.API.Enums;
using Microsoft.AspNetCore.Authorization;

namespace InterviewManagement.API.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public string Permission { get; }

        public PermissionAction Action { get; }

        public PermissionRequirement(string permission, PermissionAction action)
        {
            Permission = permission;
            Action = action;
        }
    }
}