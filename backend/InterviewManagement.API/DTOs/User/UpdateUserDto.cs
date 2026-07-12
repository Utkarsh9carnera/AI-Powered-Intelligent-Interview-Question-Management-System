using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.User
{
    public class UpdateUserDto
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public Guid RoleId { get; set; }

        public bool IsActive { get; set; }
    }
}