namespace InterviewManagement.API.DTOs.RolePermission
{
    public class RolePermissionResponseDto
    {
        public Guid RolePermissionId { get; set; }

        public Guid RoleId { get; set; }

        public string Permission { get; set; } = string.Empty;

        public bool CanView { get; set; }

        public bool CanCreate { get; set; }

        public bool CanUpdate { get; set; }

        public bool CanDelete { get; set; }
    }
}