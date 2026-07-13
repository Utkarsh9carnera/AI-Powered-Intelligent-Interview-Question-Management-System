using InterviewManagement.API.Enums;
using Microsoft.AspNetCore.Authorization;

namespace InterviewManagement.API.Attributes
{
    public class PermissionAuthorizeAttribute : AuthorizeAttribute
    {
        public PermissionAuthorizeAttribute(string permission, PermissionAction action)
        {
            Policy = $"{permission}:{action}";
        }
    }
}