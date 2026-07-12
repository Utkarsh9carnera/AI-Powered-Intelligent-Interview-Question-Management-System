using System.ComponentModel.DataAnnotations.Schema;

namespace InterviewManagement.API.Models
{
    public class Question
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Answer { get; set; } = string.Empty;

        public Guid CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public User CreatedByUser { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsDeleted { get; set; } = false;

        public ICollection<QuestionMetadata> QuestionMetadata { get; set; } = new List<QuestionMetadata>();
    }
}