namespace ToDoApi.Model
{
    public class ToDo
    {
        public int ID { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Low";

        public string DueDate { get; set; } = "2024-06-09";

        public bool Completed { get; set; }
    }
}
