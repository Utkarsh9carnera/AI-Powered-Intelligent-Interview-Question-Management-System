namespace InterviewManagement.API.Models
{
    public class RolePermission
    {
        public Guid RolePermissionId { get; set; }

        public Guid RoleTypeId { get; set; }

        public string Permission { get; set; } = string.Empty;

        public bool CanView { get; set; }

        public bool CanCreate { get; set; }

        public bool CanUpdate { get; set; }

        public bool CanDelete { get; set; }

        public RoleType RoleType { get; set; } = null!;
    }
}