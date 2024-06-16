using Microsoft.AspNetCore.Http;
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

        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">The user object containing user details.</param>
        /// <returns>The created user object.</returns>
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

        /// <summary>
        /// Retrieves all users.
        /// </summary>
        /// <returns>A list of all users.</returns>
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await toDoDbContext.Users.ToListAsync();
            return Ok(users);
        }

        /// <summary>
        /// Retrieves a user by username.
        /// </summary>
        /// <param name="username">The username of the user to retrieve.</param>
        /// <returns>The user object if found, otherwise a 404 error.</returns>
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

        /// <summary>
        /// Authenticates a user.
        /// </summary>
        /// <param name="user">The user object containing the username and password.</param>
        /// <returns>The authenticated user object if login is successful, otherwise an error message.</returns>
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
