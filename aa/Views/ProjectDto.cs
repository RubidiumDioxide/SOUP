using aa.Models;

namespace aa.Views
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {  get; set; } 
        public int Creator {  get; set; } 

        public ProjectDto(Project p)
        {
            Id = p.Id; 
            Name = p.Name;
            Description = p.Description; 
            Creator = p.Creator; 
        }

        public ProjectDto(int id, string name, string description, int creator)
        {
            Id = id;
            Name = name;
            Description = description; 
            Creator = creator; 
        }

        public ProjectDto() { }
    }  
}
