using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aa.Models;
using aa.Views;
using Microsoft.VisualStudio.Web.CodeGeneration;
using System.Linq.Expressions;


namespace aa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly SoupDbContext context;
        //private readonly IUserService userService; 

        public ProjectsController(SoupDbContext _context)
        {
            context = _context;
            //userService = _userService; 
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            return await context.Projects.Select(p => new ProjectDto(p)).ToListAsync();
        }

        // GET: api/Projects/ForDisplay
        [HttpGet("ForDisplay")]
        public async Task<ActionResult<IEnumerable<ProjectForDisplayDto>>> GetProjectsForDisplay()
        {
            return await context.Projects.Join(context.Users,
                p => p.Creator,
                u => u.Id,
                (p, u) => new ProjectForDisplayDto(p, u.Name)
                ).ToListAsync();
        }

        // GET: api/Projects/Creators/5
        [HttpGet("Creators/{userId}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetCreatorsProjects(int userId)
        {
            return await context.Projects
                .Where(p => p.Creator == userId)
                .Select(p => new ProjectDto(p))
                .ToListAsync();
        }

        // GET: api/Projects/ForDisplay/Creators/5
        [HttpGet("ForDisplay/Creators/{userId}")]
        public async Task<ActionResult<IEnumerable<ProjectForDisplayDto>>> GetProjectsForDisplayCreators(int userId)
        {
            return await context.Projects
                .Where(p => p.Creator == userId).Join(context.Users,
                    p => p.Creator,
                    u => u.Id,
                    (p, u) => new ProjectForDisplayDto(p, u.Name)
                ).ToListAsync();
        }

        // GET: api/Projects/Search/ForDisplay
        [HttpPost("Search/ForDisplay")]
        public async Task<ActionResult<IEnumerable<ProjectForDisplayDto>>> GetProjectsSearchForDisplay(ProjectForDisplayDto searchdto)
        {
            return await (from project in context.Projects
                          join user in context.Users on project.Creator equals user.Id
                          where project.Name.ToUpper().Contains(searchdto.Name.ToUpper()) 
                                && project.Description.ToUpper().Contains(searchdto.Description.ToUpper()) 
                                && user.Name.ToUpper().Contains(searchdto.CreatorName.ToUpper())
                          select new ProjectForDisplayDto(project, user.Name))
                           .ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            var project = await context.Projects.FindAsync(id);

            if (project == null)
                return NotFound();

            return new ProjectDto(project);
        }

        // GET: api/Projects/ForDisplay/5
        [HttpGet("ForDisplay/{id}")]
        public async Task<ActionResult<ProjectForDisplayDto>> GetProjectForDisplay(int id)
        {
            var project = await context.Projects.FindAsync(id);

            if (project == null)
                return NotFound();

            var creator = await context.Users.FindAsync(project.Creator);
            
            if (creator == null)
                return NotFound();
            
            return new ProjectForDisplayDto(project, creator.Name);
        }

        // PUT 
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> PutProject(int id, ProjectDto projectdto)
        {
            if (id != projectdto.Id)
            {
                return BadRequest();
            }

            var project = await context.Projects.FindAsync(id);
            if(project == null)
            {
                return NotFound(); 
            }

            project.Name = projectdto.Name; 
            project.Description = projectdto.Description; 

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ProjectExists(id))
            {
                return NotFound();
            }

            return new ProjectDto(project);
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectDto projectdto)
        {
            var project = new Project
            {
                Name = projectdto.Name,
                Description = projectdto.Description,
                Creator = projectdto.Creator, 
                Repository = projectdto.Repository 
            };

            context.Projects.Add(project);

            await context.SaveChangesAsync();

            project = context.Projects.FirstOrDefault(p => p.Name == projectdto.Name); 

            var team = new Team
            {
                UserId = project.Creator, //implies creatorid, ofc. i'm a dummy and messed up the dtos 
                ProjectId = project.Id,
                Role = "Руководитель проекта",
                Level = 0,
            };

            context.Teams.Add(team); 

            await context.SaveChangesAsync();
            
            return NoContent();
        } 


        private bool ProjectExists(int id)
        {
            return context.Projects.Any(e => e.Id == id);
        }
    }
}
