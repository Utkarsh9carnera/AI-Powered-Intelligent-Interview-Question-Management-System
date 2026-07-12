using InterviewManagement.API.Data;
using InterviewManagement.API.DTOs.User;
using InterviewManagement.API.Models;
using InterviewManagement.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.RoleType)
                .ToListAsync();

            return users.Select(user => new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsActive = user.IsActive,
                RoleId = user.RoleId,
                RoleName = user.RoleType != null ? user.RoleType.RoleName : string.Empty,
                CreatedDate = user.CreatedDate,
                LastLogin = user.LastLogin
            });
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.RoleType)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return null;
            }

            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsActive = user.IsActive,
                RoleId = user.RoleId,
                RoleName = user.RoleType != null ? user.RoleType.RoleName : string.Empty,
                CreatedDate = user.CreatedDate,
                LastLogin = user.LastLogin
            };
        }

        public async Task<UserResponseDto> CreateUserAsync(CreateUserDto dto)
{
    // Check if email already exists
    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (existingUser != null)
    {
        throw new Exception("A user with this email already exists.");
    }

    // Check if role exists
    var role = await _context.RoleTypes
        .FirstOrDefaultAsync(r => r.RoleTypeId == dto.RoleId);

    if (role == null)
    {
        throw new Exception("Invalid role selected.");
    }

    // Create new user
    var user = new User
    {
        Id = Guid.NewGuid(),
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email,
        RoleId = dto.RoleId,
        IsActive = true,
        CreatedDate = DateTime.UtcNow
    };

    _context.Users.Add(user);

    await _context.SaveChangesAsync();

    return new UserResponseDto
    {
        Id = user.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        IsActive = user.IsActive,
        RoleId = user.RoleId,
        RoleName = role.RoleName,
        CreatedDate = user.CreatedDate,
        LastLogin = user.LastLogin
    };
}

        public async Task<UserResponseDto?> UpdateUserAsync(Guid id, UpdateUserDto dto)
{
    var user = await _context.Users
        .Include(u => u.RoleType)
        .FirstOrDefaultAsync(u => u.Id == id);

    if (user == null)
    {
        return null;
    }

    // Check if another user already has this email
    var existingUser = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Id != id);

    if (existingUser != null)
    {
        throw new Exception("A user with this email already exists.");
    }

    // Check if role exists
    var role = await _context.RoleTypes
        .FirstOrDefaultAsync(r => r.RoleTypeId == dto.RoleId);

    if (role == null)
    {
        throw new Exception("Invalid role selected.");
    }

    // Update user
    user.FirstName = dto.FirstName;
    user.LastName = dto.LastName;
    user.Email = dto.Email;
    user.RoleId = dto.RoleId;
    user.IsActive = dto.IsActive;

    await _context.SaveChangesAsync();

    return new UserResponseDto
    {
        Id = user.Id,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
        IsActive = user.IsActive,
        RoleId = user.RoleId,
        RoleName = role.RoleName,
        CreatedDate = user.CreatedDate,
        LastLogin = user.LastLogin
    };
}

        public async Task<bool> DeleteUserAsync(Guid id)
{
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Id == id);

    if (user == null)
    {
        return false;
    }

    user.IsActive = false;

    await _context.SaveChangesAsync();

    return true;
}
    }
}