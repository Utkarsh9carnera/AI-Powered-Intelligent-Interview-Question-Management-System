using InterviewManagement.API.DTOs.Auth;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto> GoogleLoginAsync(GoogleLoginRequestDto request);
    }
}