using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Model;

namespace ToDoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext toDoDbContext;

        public ToDoController(ToDoDbContext toDoDbContext)
        {
            this.toDoDbContext = toDoDbContext;
        }

        /// <summary>
        /// Creates a new ToDo item.
        /// </summary>
        /// <param name="toDo">The ToDo object to be created.</param>
        /// <returns>The created ToDo object.</returns>
        [HttpPost]
        public async Task<ActionResult<List<ToDo>>> AddToDo(ToDo toDo)
        {
            if (toDo != null)
            {
                toDoDbContext.Items.Add(toDo);
                await toDoDbContext.SaveChangesAsync();
                return Ok(toDo);
            }

            return BadRequest("Object instance not set");
        }

        /// <summary>
        /// Retrieves all ToDo items.
        /// </summary>
        /// <returns>A list of all ToDo items.</returns>
        [HttpGet]
        public async Task<ActionResult<List<ToDo>>> GetToDos()
        {
            var todos = await toDoDbContext.Items.ToListAsync();
            return Ok(todos);
        }

        /// <summary>
        /// Retrieves ToDo items for a specific user.
        /// </summary>
        /// <param name="username">The username of the user whose ToDo items to retrieve.</param>
        /// <returns>A list of ToDo items for the specified user.</returns>
        [HttpGet("user")]
        public async Task<ActionResult<List<ToDo>>> GetToDosUser(string username)
        {
            var todos = await toDoDbContext.Items.Where(todo => todo.UserName == username).ToListAsync();
            return Ok(todos);
        }

        /// <summary>
        /// Retrieves a specific ToDo item by its ID.
        /// </summary>
        /// <param name="id">The ID of the ToDo item to retrieve.</param>
        /// <returns>The requested ToDo item if found, otherwise a 404 error.</returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToDo>> GetToDo(int id)
        {
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if (todo != null)
            {
                return Ok(todo);
            }

            return NotFound("Task does not exist");
        }

        /// <summary>
        /// Updates an existing ToDo item.
        /// </summary>
        /// <param name="updatedToDo">The updated ToDo object.</param>
        /// <returns>The updated ToDo object if found, otherwise a 400 error.</returns>
        [HttpPut]
        public async Task<ActionResult<ToDo>> UpdateToDo(ToDo updatedToDo)
        {
            if (updatedToDo != null)
            {
                var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == updatedToDo.ID);
                if (todo != null)
                {
                    todo.Title = updatedToDo.Title;
                    todo.Description = updatedToDo.Description;
                    todo.DueDate = updatedToDo.DueDate;
                    todo.Priority = updatedToDo.Priority;
                    await toDoDbContext.SaveChangesAsync();
                    return Ok(todo);
                }

                return NotFound("Task not found");
            }

            return BadRequest("Task not found");
        }

        /// <summary>
        /// Deletes a specific ToDo item by its ID.
        /// </summary>
        /// <param name="id">The ID of the ToDo item to delete.</param>
        /// <returns>The updated list of ToDo items if deletion is successful, otherwise a 404 error.</returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ToDo>> DeleteUser(int id)
        {
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if (todo != null)
            {
                toDoDbContext.Items.Remove(todo);
                await toDoDbContext.SaveChangesAsync();
                return Ok(await toDoDbContext.Items.ToListAsync());
            }

            return NotFound();
        }

        /// <summary>
        /// Toggles the completion status of a specific ToDo item by its ID.
        /// </summary>
        /// <param name="id">The ID of the ToDo item to update.</param>
        /// <returns>The updated ToDo item if found, otherwise a 404 error.</returns>
        [HttpPut("status/{id:int}")]
        public async Task<ActionResult<ToDo>> ChangeStatus(int id)
        {
            var todo = await toDoDbContext.Items.FirstOrDefaultAsync(e => e.ID == id);
            if (todo != null)
            {
                todo.Completed = !todo.Completed;
                await toDoDbContext.SaveChangesAsync();
                return Ok(todo);
            }
            return NotFound();
        }

        /// <summary>
        /// Retrieves the counts of completed and incomplete tasks, as well as the counts of low, medium, and high priority tasks for a specific user.
        /// </summary>
        /// <param name="username">The username of the user whose task counts to retrieve.</param>
        /// <returns>An array of integers representing the counts.</returns>
        [HttpGet("GetCounts/{username}")]
        public ActionResult<int[]> GetCounts(string username)
        {
            var userTodos = toDoDbContext.Items.Where(t => t.UserName == username).ToList();

            if (userTodos == null || userTodos.Count == 0)
            {
                return NotFound("No todos found for the specified user.");
            }

            int completedCount = userTodos.Count(t => t.Completed);
            int incompleteCount = userTodos.Count(t => !t.Completed);

            int lowPriorityCount = userTodos.Count(t => t.Priority.Equals("Low", StringComparison.OrdinalIgnoreCase));
            int mediumPriorityCount = userTodos.Count(t => t.Priority.Equals("Medium", StringComparison.OrdinalIgnoreCase));
            int highPriorityCount = userTodos.Count(t => t.Priority.Equals("High", StringComparison.OrdinalIgnoreCase));

            int[] counts = new int[] { completedCount, incompleteCount, lowPriorityCount, mediumPriorityCount, highPriorityCount };

            return Ok(counts);
        }
    }
}
