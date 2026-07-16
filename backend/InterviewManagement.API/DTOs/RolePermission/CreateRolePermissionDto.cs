using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.RolePermission
{
    public class CreateRolePermissionDto
    {
        [Required]
        public Guid RoleId { get; set; }

        [Required]
        [StringLength(100)]
        public string Permission { get; set; } = string.Empty;

        public bool CanView { get; set; }

        public bool CanCreate { get; set; }

        public bool CanUpdate { get; set; }

        public bool CanDelete { get; set; }
    }
}