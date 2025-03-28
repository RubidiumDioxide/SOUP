using aa.Models;

namespace aa.Views
{
    public class TeamForDisplayDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Role { get; set; } = null!;

        public TeamForDisplayDto(Team t, string userName, string projectName)
        {
            Id = t.Id;
            UserId = t.UserId; 
            UserName = userName; 
            ProjectId = t.ProjectId; 
            ProjectName = projectName; 
            Role = t.Role; 
        }

        public TeamForDisplayDto(int id, int userId,  string userName, int projectId, string projectName, string role)
        {
            Id = id;
            UserId = userId; 
            UserName = userName;
            ProjectId = projectId; 
            ProjectName = projectName;
            Role = role; 
        }

        public TeamForDisplayDto() { }
    }
}
