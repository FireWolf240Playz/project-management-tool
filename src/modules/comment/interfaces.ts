export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
}
