namespace InterviewManagement.API.DTOs.User
{
    public class UserQueryDto
    {
        public Guid? RoleId { get; set; }

        public string? Search { get; set; }

        public bool? IsActive { get; set; }

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string SortBy { get; set; } = "CreatedDate";

        public string SortDirection { get; set; } = "desc";
    }
}