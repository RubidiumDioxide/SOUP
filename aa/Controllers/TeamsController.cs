using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aa.Models;
using aa.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace aa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly SoupDbContext context;

        public TeamsController(SoupDbContext _context)
        {
            context = _context;
        }

        // GET: api/Teams/ForDisplay
        [HttpGet("ForDisplay")]
        public async Task<ActionResult<IEnumerable<TeamForDisplayDto>>> GetTeams()
        {
            return await context.Teams.Join(context.Users,
                t => t.UserId,
                u => u.Id,
                (t, u) => new { t.Id, t.UserId, u.Name, t.ProjectId, t.Role }
                )
                .Join(context.Projects,
                temp => temp.ProjectId,
                p => p.Id,
                (temp, p) => new TeamForDisplayDto(temp.Id, temp.UserId, temp.Name, temp.ProjectId, p.Name, temp.Role))
                .ToListAsync();
        }

        // GET: api/Teams/ForDisplay/Project/5
        [HttpGet("ForDisplay/Project/{projectId}")]
        public async Task<ActionResult<IEnumerable<TeamForDisplayDto>>> GetTeamsProjects(int projectId)
        {
            return await context.Teams
                .Where(t => t.ProjectId == projectId)
                .Join(context.Users,
                t => t.UserId,
                u => u.Id,
                (t, u) => new { t.Id, t.UserId, u.Name, t.ProjectId, t.Role }
                )
                .Join(context.Projects,
                temp => temp.ProjectId,
                p => p.Id,
                (temp, p) => new TeamForDisplayDto(temp.Id, temp.UserId, temp.Name, temp.ProjectId, p.Name, temp.Role))
                .ToListAsync();
        }

        // GET: api/Teams/ForDisplay/5
        [HttpGet("ForDisplay/{id}")]
        public async Task<ActionResult<TeamForDisplayDto>> GetTeam(int id)
        {
            var team = await context.Teams.FindAsync(id);

            if(team == null)
            {
                return NotFound(); 
            }

            var project = await context.Projects.FindAsync(team.ProjectId);
            var user = await context.Users.FindAsync(team.UserId);

            if (project == null || user == null)
            {
                return NotFound();
            }

            return new TeamForDisplayDto(team, user.Name, project.Name);
        }

        // PUT: api/Teams/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, TeamDto teamdto)
        {
            if (id != teamdto.Id)
            {
                return BadRequest();
            }

            var team = await context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound(); 
            }

            var project = await context.Projects.FindAsync(team.ProjectId);
            var user = await context.Users.FindAsync(team.UserId);

            if (project == null || user == null)
            {
                return NotFound();
            }

            team.Role = teamdto.Role;  //in case of chenging role specifically; if there's any need to change all, rewrite method 

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (! TeamExists(id))
            {
              return NotFound();
            }

            return NoContent(); 
        }

        // POST: api/Teams
        [HttpPost]
        public async Task<IActionResult> CreateTeam(TeamForDisplayDto teamdto)
        {
            var team = new Team
            {
                UserId = teamdto.UserId,
                ProjectId = teamdto.ProjectId,
                Role = teamdto.Role
            }; 

            context.Teams.Add(team);

            await context.SaveChangesAsync();

            return NoContent(); 
        }

        // POST: api/Teams/PostByName
        [HttpPost("PostByName")]
        public async Task<IActionResult> CreateTeamByName(TeamForDisplayDto teamdto)
        {
            var user = context.Users.FirstOrDefault(u => u.Name == teamdto.UserName);

            if (user == null)
            {
                return NotFound(); 
            }

            teamdto.UserId = user.Id; 
            
            var team = new Team
            {
                UserId = teamdto.UserId,
                ProjectId = teamdto.ProjectId,
                Role = teamdto.Role
            };

            context.Teams.Add(team);

            await context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await context.Teams.FindAsync(id);
            
            if (team == null)
            {
                return NotFound();
            }

            context.Teams.Remove(team);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamExists(int id)
        {
            return context.Teams.Any(t => t.Id == id);
        }
    }
}
