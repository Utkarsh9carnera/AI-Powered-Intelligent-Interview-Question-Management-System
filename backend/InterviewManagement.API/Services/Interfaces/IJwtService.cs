using InterviewManagement.API.Models;

namespace InterviewManagement.API.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}