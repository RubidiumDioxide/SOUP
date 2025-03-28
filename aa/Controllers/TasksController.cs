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
    public class TasksController : ControllerBase
    {
        private readonly SoupDbContext context;

        public TasksController(SoupDbContext _context)
        {
            context = _context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            return await context.Tasks
                .Select(t => new TaskDto(t))
                .ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return new TaskDto(task); 
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskDto taskdto)
        {
            if (id != taskdto.Id)
            {
                return BadRequest();
            }

            var task = await context.Tasks.FindAsync(id); 

            if (task == null)
            {
                return BadRequest();
            }

            task.ProjectId = taskdto.ProjectId; 
            task.AssigneeId = taskdto.AssigneeId; 
            task.Name = taskdto.Name; 
            task.Description = taskdto.Description; 
            task.IsComplete = taskdto.IsComplete;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TaskExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<IActionResult> PostTask(TaskDto taskdto)
        {
            var task = new aa.Models.Task
            {
                ProjectId = taskdto.ProjectId,
                AssigneeId = taskdto.AssigneeId,
                Name = taskdto.Name,
                Description = taskdto.Description,
                IsComplete = taskdto.IsComplete
            };

            context.Tasks.Add(task);

            await context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return context.Tasks.Any(e => e.Id == id);
        }
    }
}
