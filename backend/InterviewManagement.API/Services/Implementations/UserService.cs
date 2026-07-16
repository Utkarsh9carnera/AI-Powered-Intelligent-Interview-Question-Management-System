using InterviewManagement.API.Common;
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

        public async Task<PagedResponse<UserResponseDto>> GetUsersAsync(UserQueryDto query)
        {
            var usersQuery = _context.Users
                .Include(u => u.RoleType)
                .AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                var search = query.Search.Trim().ToLower();

                usersQuery = usersQuery.Where(u =>
                    u.FirstName.ToLower().Contains(search) ||
                    u.LastName.ToLower().Contains(search) ||
                    u.Email.ToLower().Contains(search));
            }

            // Role Filter
            if (query.RoleId.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.RoleId == query.RoleId.Value);
            }

            // Status Filter
            if (query.IsActive.HasValue)
            {
                usersQuery = usersQuery.Where(u => u.IsActive == query.IsActive.Value);
            }

            // Sorting
            usersQuery = (query.SortBy.ToLower(), query.SortDirection.ToLower()) switch
            {
                ("firstname", "asc") => usersQuery.OrderBy(u => u.FirstName),
                ("firstname", "desc") => usersQuery.OrderByDescending(u => u.FirstName),

                ("lastname", "asc") => usersQuery.OrderBy(u => u.LastName),
                ("lastname", "desc") => usersQuery.OrderByDescending(u => u.LastName),

                ("email", "asc") => usersQuery.OrderBy(u => u.Email),
                ("email", "desc") => usersQuery.OrderByDescending(u => u.Email),

                ("createddate", "asc") => usersQuery.OrderBy(u => u.CreatedDate),
                ("createddate", "desc") => usersQuery.OrderByDescending(u => u.CreatedDate),

                _ => usersQuery.OrderByDescending(u => u.CreatedDate)
            };

            var totalCount = await usersQuery.CountAsync();

            var users = await usersQuery
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize)
                .Select(user => new UserResponseDto
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
                })
                .ToListAsync();

            return new PagedResponse<UserResponseDto>
            {
                Items = users,
                Page = query.Page,
                PageSize = query.PageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize)
            };
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users
                .Include(u => u.RoleType)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return null;

            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsActive = user.IsActive,
                RoleId = user.RoleId,
                RoleName = user.RoleType?.RoleName ?? string.Empty,
                CreatedDate = user.CreatedDate,
                LastLogin = user.LastLogin
            };
        }

        public async Task<UserResponseDto> CreateUserAsync(CreateUserDto dto)
        {
            // Validate email domain
            if (!dto.Email.EndsWith("@getcarnera.com", StringComparison.OrdinalIgnoreCase))
                throw new UnauthorizedAccessException("Only @getcarnera.com email addresses are allowed.");

            // Check duplicate email
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (existingUser != null)
                throw new InvalidOperationException("Email already exists.");

            // Validate role
            var role = await _context.RoleTypes
                .FirstOrDefaultAsync(r => r.RoleTypeId == dto.RoleId);

            if (role == null)
                throw new KeyNotFoundException("Role not found.");

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
                return null;

            // Validate email domain
            if (!dto.Email.EndsWith("@getcarnera.com", StringComparison.OrdinalIgnoreCase))
                throw new UnauthorizedAccessException("Only @getcarnera.com email addresses are allowed.");

            // Check duplicate email
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Id != id);

            if (existingUser != null)
                throw new InvalidOperationException("Email already exists.");

            // Validate role
            var role = await _context.RoleTypes
                .FirstOrDefaultAsync(r => r.RoleTypeId == dto.RoleId);

            if (role == null)
                throw new KeyNotFoundException("Role not found.");

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
                return false;

            user.IsActive = false;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}