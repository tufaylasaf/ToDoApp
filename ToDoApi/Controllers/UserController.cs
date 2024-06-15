using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Model;

namespace ToDoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ToDoDbContext toDoDbContext;

        public UserController(ToDoDbContext toDoDbContext)
        {
            this.toDoDbContext = toDoDbContext;
        }

        //Create
        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            if (user == null)
            {
                return BadRequest("User object is null");
            }

            var existingUserByUsername = await toDoDbContext.Users
                .FirstOrDefaultAsync(u => u.UserName == user.UserName);

            if (existingUserByUsername != null)
            {
                return BadRequest("Username already exists");
            }

            var existingUserByEmail = await toDoDbContext.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUserByEmail != null)
            {
                return BadRequest("Email already exists");
            }

            toDoDbContext.Users.Add(user);
            await toDoDbContext.SaveChangesAsync();

            return Ok(user);
        }
   
 
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await toDoDbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await toDoDbContext.Users
                                          .FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var _user = await toDoDbContext.Users
                .FirstOrDefaultAsync(u => u.UserName == user.UserName);

            if (_user == null)
            {
                return NotFound("User not found");
            }

            if (_user.Password != user.Password)
            {
                return BadRequest("Incorrect password");
            }

            return Ok(_user);
        }
    }

}