namespace InterviewManagement.API.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime? LastLogin { get; set; }

        public Guid RoleId { get; set; }

        public RoleType ? RoleType  { get; set; }
        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}