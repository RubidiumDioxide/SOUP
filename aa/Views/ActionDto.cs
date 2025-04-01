using aa.Models; 

namespace aa.Views
{
    public class ActionDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int ActorId { get; set; }
        public int TaskId { get; set; }
        public string Description { get; set; } = null!;
        public DateTime Date { get; set; }

        public ActionDto(aa.Models.Action a)
        {
            Id = a.Id;
            ProjectId = a.ProjectId;
            ActorId = a.ActorId;
            TaskId = a.TaskId;
            Description = a.Description;
            Date = a.Date;
        }

        public ActionDto(int id, int projectId, int actorId, int taskId, string description, DateTime date)
        {
            Id = id;
            ProjectId = projectId;
            ActorId = actorId;
            TaskId = taskId;
            Description = description;
            Date = date;
        }

        public ActionDto() { }
    }
}
