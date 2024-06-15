﻿using Microsoft.EntityFrameworkCore;
using ToDoApi.Model;

namespace ToDoApi.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options):base(options) { }

        public DbSet<ToDo> Items { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
