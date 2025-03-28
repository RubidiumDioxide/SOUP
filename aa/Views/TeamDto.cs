using aa.Models;

namespace aa.Views
{
    public class TeamDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public string Role { get; set; } = null!;

        public TeamDto(Team t)
        {
            Id = t.Id;
            UserId = t.UserId; 
            ProjectId = t.ProjectId; 
            Role = t.Role; 
        }

        public TeamDto(int id, int userId, int projectId, string role)
        {
            Id = userId;
            UserId = userId; 
            ProjectId = projectId; 
            Role = role; 
        }

        public TeamDto() { }
    }
}
