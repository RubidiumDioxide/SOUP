using aa.Models;

namespace aa.Views
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {  get; set; } 
        public int Creator {  get; set; }
        public bool IsComplete { get; set; }
        public DateTime DateBegan { get; set; }
        public DateTime? DateFinished { get; set; }
        public DateTime? DateDeadline { get; set; }
        public bool IsPrivate { get; set; }

        public ProjectDto(Project p)
        {
            Id = p.Id; 
            Name = p.Name;
            Description = p.Description; 
            Creator = p.Creator; 
            IsComplete = p.IsComplete; 
            DateBegan = p.DateBegan; 
            DateFinished = p.DateFinished; 
            DateDeadline = p.DateDeadline;  
            IsPrivate = p.IsPrivate; 
        }

        public ProjectDto(int id, string name, string description, int creator, bool isComplete, DateTime dateBegan, DateTime dateFinished, DateTime dateDeadline, bool isPrivate)
        {
            Id = id;
            Name = name;
            Description = description; 
            Creator = creator; 
            IsComplete = isComplete; 
            DateBegan = dateBegan; 
            DateFinished = dateFinished;
            DateDeadline = dateDeadline; 
            IsPrivate = isPrivate; 
        }

        public ProjectDto() { }
    }  
}
