using aa.Models;

namespace aa.Views
{
    public class ProjectForDisplayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {  get; set; } 
        public int CreatorId {  get; set; }
        public string CreatorName { get; set; }

        public ProjectForDisplayDto(Project p, string _creatorName)
        {
            Id = p.Id; 
            Name = p.Name;
            Description = p.Description; 
            CreatorId = p.Creator;
            CreatorName = _creatorName;
        }

        public ProjectForDisplayDto(int _id, string _name, string _description, int _creator, string _creatorName)
        {
            Id = _id;
            Name = _name;
            Description = _description; 
            CreatorId = _creator; 
            CreatorName= _creatorName;
        }

        public ProjectForDisplayDto() { }
    }  
}
