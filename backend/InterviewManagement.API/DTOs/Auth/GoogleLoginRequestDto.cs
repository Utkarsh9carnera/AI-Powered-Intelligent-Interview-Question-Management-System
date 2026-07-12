using System.ComponentModel.DataAnnotations;

namespace InterviewManagement.API.DTOs.Auth
{
    public class GoogleLoginRequestDto
    {
        [Required]
        public string IdToken { get; set; } = string.Empty;
    }
}