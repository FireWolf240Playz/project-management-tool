import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  /**
   * Get all boards.
   * @returns An array of boards
   */
  async getAllBoards(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  /**
   * Create a new board.
   * @param boardData - Data for the new board
   * @returns The newly created board
   */
  async createBoard(boardData: Partial<Board>): Promise<Board> {
    const newBoard = new this.boardModel(boardData);
    return newBoard.save();
  }
}
