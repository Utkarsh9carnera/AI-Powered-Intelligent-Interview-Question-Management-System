namespace InterviewManagement.API.DTOs.User
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public Guid RoleId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

        public DateTime? LastLogin { get; set; }
    }
}