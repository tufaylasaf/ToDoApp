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
                return Ok(toDo);
            }

            return BadRequest("Object Instance not set");
        }

        //Get All ToDos
        [HttpGet]
        public async Task<ActionResult<List<ToDo>>> GetToDos(){
            var todos = await toDoDbContext.Items.ToListAsync();
            return Ok(todos);
        }

        //Get Specific Item
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToDo>> GetToDo(int id){
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if(todo != null){
                return Ok(todo);
            }

            return NotFound("Task does not exist");
        }

        //Update ToDo
        [HttpPut]
        public async Task<ActionResult<ToDo>> UpdateToDo(ToDo updatedToDo){
            if(updatedToDo != null){
                var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == updatedToDo.ID);
                todo!.Title = updatedToDo.Title;
                todo.Description = updatedToDo.Description;
                todo.DueDate = updatedToDo.DueDate;
                todo.Priority = updatedToDo.Priority;
                await toDoDbContext.SaveChangesAsync();
                return Ok(todo);
            }

            return BadRequest("Task not found");
        }

        //Delete
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ToDo>> DeleteUser(int id){
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if(todo != null){
                toDoDbContext.Items.Remove(todo);
                await toDoDbContext.SaveChangesAsync();
                return Ok(await toDoDbContext.Items.ToListAsync());
            }

            return NotFound();
        }

        //Mark Todo as completed
        [HttpPut("status/{id:int}")]
        public async Task<ActionResult<ToDo>> changeStatus(int id){
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if(todo != null){
                todo.Completed = !todo.Completed;
                await toDoDbContext.SaveChangesAsync();
                return Ok(todo);
            }
            return NotFound();
        }
    }
}
