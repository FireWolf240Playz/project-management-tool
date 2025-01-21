export interface Task {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  assignees?: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
