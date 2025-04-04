using aa.Models;

namespace aa.Views
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {  get; set; } 
        public int Creator {  get; set; }
        public int? Repository { get; set; }

        public ProjectDto(Project p)
        {
            Id = p.Id; 
            Name = p.Name;
            Description = p.Description; 
            Creator = p.Creator; 
            Repository = p.Repository;
        }

        public ProjectDto(int id, string name, string description, int creator, int repository)
        {
            Id = id;
            Name = name;
            Description = description; 
            Creator = creator; 
            Repository = repository; 
        }

        public ProjectDto() { }
    }  
}
