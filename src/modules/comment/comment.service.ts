import { Injectable } from '@nestjs/common';
import { Comment } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentService {
  private comments: Comment[] = [];

  getAllComments() {
    return this.comments;
  }

  /**
   * Get all comments for a specific task.
   * @param taskId - ID of the task
   * @returns An array of comments associated with the task
   */
  getCommentsForTask(taskId: string): Comment[] {
    return this.comments.filter((comment) => comment.taskId === taskId);
  }

  /**
   * Create a new comment.
   * @param commentData - Data for the new comment (excluding id and createdAt)
   * @returns The newly created comment
   */
  createComment(commentData: Omit<Comment, 'id' | 'createdAt'>): Comment {
    const newComment: Comment = {
      id: uuidv4(),
      createdAt: new Date(),
      ...commentData,
    };
    this.comments.push(newComment);
    return newComment;
  }

  /**
   * Update an existing comment.
   * @param commentId - ID of the comment to update
   * @param updatedData - Partial data to update in the comment
   * @returns The updated comment, or null if not found
   */
  updateComment(
    commentId: string,
    updatedData: Partial<Omit<Comment, 'id' | 'taskId' | 'createdAt'>>,
  ): Comment | null {
    const commentIndex = this.comments.findIndex(
      (comment) => comment.id === commentId,
    );
    if (commentIndex === -1) {
      return null;
    }
    const updatedComment = {
      ...this.comments[commentIndex],
      ...updatedData,
      updatedAt: new Date(),
    };
    this.comments[commentIndex] = updatedComment;
    return updatedComment;
  }

  /**
   * Delete a comment by ID.
   * @param commentId - ID of the comment to delete
   * @returns `true` if the comment was deleted, `false` if not found
   */
  deleteComment(commentId: string): boolean {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
    return this.comments.length < initialLength;
  }
}
