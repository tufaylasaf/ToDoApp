using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Model;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext toDoDbContext;

        public ToDoController(ToDoDbContext toDoDbContext)
        {
            this.toDoDbContext = toDoDbContext;
        }

        //Create
        [HttpPost]
        public async Task<ActionResult<List<ToDo>>> AddToDo(ToDo toDo)
        {
            if (toDo != null)
            {
                toDoDbContext.Items.Add(toDo);
                await toDoDbContext.SaveChangesAsync();
                return Ok(await toDoDbContext.Items.ToListAsync());
            }

            return BadRequest("Object Instance not set");
        }
    }
}
