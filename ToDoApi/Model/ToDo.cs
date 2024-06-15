namespace ToDoApi.Model
{
    public class ToDo
    {
        public int ID { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Priority { get; set; } = "Low";

        public string DueDate { get; set; } = "";

        public bool Completed { get; set; }

        public string UserName{ get; set; } = "";
    }
}
