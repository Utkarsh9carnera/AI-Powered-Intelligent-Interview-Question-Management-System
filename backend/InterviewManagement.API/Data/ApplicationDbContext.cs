using InterviewManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InterviewManagement.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RoleType> RoleTypes { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Metadata> Metadata { get; set; }
        public DbSet<SearchHistory> SearchHistories { get; set; }
        public DbSet<QuestionMetadata> QuestionMetadata { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RoleType>()
                .HasKey(r => r.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasKey(r => r.RolePermissionId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.RoleType)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasOne(r => r.RoleType)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(r => r.RoleId);
        }
    }
}