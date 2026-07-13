using System;
using System.Collections.Generic;

namespace InterviewManagement.API.Models
{
    public class RoleType
    {
        public Guid RoleTypeId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();

        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}