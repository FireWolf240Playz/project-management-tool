import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}
  /**
   * Get all comments.
   * @returns An array of boards
   */
  async getAllComments(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }
  /**
   * Get all comments for task.
   * @param taskId - id of the task
   * @returns An array of comments
   */
  async getCommentsForTask(taskId: string): Promise<Comment[]> {
    return this.commentModel.find({ taskId }).exec();
  }

  /**
   * Create a new board.
   * @param commentData - Data for the new comment
   * @returns The newly created comment
   */

  async createComment(commentData: Partial<Comment>): Promise<Comment> {
    const newComment = new this.commentModel(commentData);
    return newComment.save();
  }

  /**
   * Create a new board.
   * @param commentId - find the comment
   * @param updatedData - update the data
   * @returns The newly created comment
   */
  async updateComment(
    commentId: string,
    updatedData: Partial<Comment>,
  ): Promise<Comment | null> {
    return this.commentModel
      .findByIdAndUpdate(commentId, updatedData, { new: true })
      .exec();
  }
  /*
   * Create a new board.
   * @param commentId - find the comment
   * @returns The new number of the comments
   */
  async deleteComment(commentId: string): Promise<boolean> {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    return result.deletedCount > 0;
  }
}
