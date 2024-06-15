export interface ToDo {
  id?: number;
  title: string;
  description: string;
  priority: string;
  dueDate?: string;
  completed: boolean;
  userName: string | undefined;
}
