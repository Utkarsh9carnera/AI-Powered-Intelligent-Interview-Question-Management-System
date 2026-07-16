using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.Auth;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;
private readonly IGoogleAuthService _googleAuthService;

        public AuthService(
    ApplicationDbContext context,
    IJwtService jwtService,
    IGoogleAuthService googleAuthService)
{
    _context = context;
    _jwtService = jwtService;
    _googleAuthService = googleAuthService;
}

        public async Task<LoginResponseDto> GoogleLoginAsync(GoogleLoginRequestDto request)
{
    var googleUser = await _googleAuthService
        .VerifyGoogleTokenAsync(request.IdToken);

    var user = await _context.Users
        .Include(u => u.RoleType)
        .FirstOrDefaultAsync(u => u.Email == googleUser.Email);

    if (user == null)
    {
        throw new Exception("User is not authorized.");
    }

    if (!user.IsActive)
    {
        throw new Exception("User is inactive.");
    }

    user.LastLogin = DateTime.UtcNow;

    await _context.SaveChangesAsync();
Console.WriteLine("==================================");
Console.WriteLine($"Email      : {user.Email}");
Console.WriteLine($"RoleId     : {user.RoleId}");
Console.WriteLine($"RoleType   : {(user.RoleType == null ? "NULL" : user.RoleType.RoleName)}");
Console.WriteLine("==================================");
    var token = _jwtService.GenerateToken(user);

    return new LoginResponseDto
{
    Token = token,
    ExpiresAt = DateTime.UtcNow.AddMinutes(120),
    UserId = user.Id,
    FullName = $"{user.FirstName} {user.LastName}",
    Email = user.Email,
    Role = user.RoleType?.RoleName ?? string.Empty,
    ProfilePicture = googleUser.Picture
};
}
    }
}