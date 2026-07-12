using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.Auth
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}