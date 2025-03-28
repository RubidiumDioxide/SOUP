using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aa.Models;
using aa.Views; 


namespace aa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        private readonly SoupDbContext context;

        public ActionsController(SoupDbContext _context)
        {
            context = _context;
        }

        // GET: api/Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionDto>>> GetActions()
        {
            return await context.Actions
                .Select(a => new ActionDto(a))
                .ToListAsync();
        }

        // GET: api/Actions/ByProject/5
        [HttpGet("ByProject/{projectId}")]
        public async Task<ActionResult<IEnumerable<ActionDto>>> GetActionsByProject(int projectId)
        {
            return await context.Actions
                .Where(a => a.ProjectId == projectId)
                .Select(a => new ActionDto(a))
                .ToListAsync();
        }

        // GET: api/Actions/ByActor/5
        [HttpGet("ByActor/{actorId}")]
        public async Task<ActionResult<IEnumerable<ActionDto>>> GetActionsByAction(int actorId)
        {
            return await context.Actions
                .Where(a => a.ActorId == actorId)
                .Select(a => new ActionDto(a))
                .ToListAsync();
        }


        // GET: api/Actions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActionDto>> GetAction(int id)
        {
            var action = await context.Actions.FindAsync(id);

            if (action == null)
            {
                return NotFound();
            }

            return new ActionDto(action);
        }

        // PUT: api/Actions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAction(int id, ActionDto actiondto)
        {
            if (id != actiondto.Id)
            {
                return BadRequest();
            }

            var action = await context.Actions.FindAsync(id);

            if (action == null)
            {
                return BadRequest();
            }

            action.ProjectId = actiondto.ProjectId; 
            action.ActorId = actiondto.ActorId; 
            action.TaskId = actiondto.TaskId; 
            action.Description = actiondto.Description; 
            action.Date = actiondto.Date;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ActionExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Actions
        [HttpPost]
        public async Task<IActionResult> PostAction(ActionDto actiondto)
        {
            var action = new aa.Models.Action{ 
              ProjectId = actiondto.ProjectId, 
              ActorId = actiondto.ActorId, 
              TaskId = actiondto.TaskId, 
              Description = actiondto.Description, 
              Date = DateTime.Now 
            };

            context.Actions.Add(action); 

            await context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Actions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAction(int id)
        {
            var action = await context.Actions.FindAsync(id);
            
            if (action == null)
            {
                return NotFound();
            }

            context.Actions.Remove(action);
            await context.SaveChangesAsync();

            return Ok(); 
        }

        private bool ActionExists(int id)
        {
            return context.Actions.Any(e => e.Id == id);
        }
    }
}
