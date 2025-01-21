import { Injectable } from '@nestjs/common';
import { Board } from './interfaces';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(boardData: Omit<Board, 'id'>): Board {
    const newBoard: Board = { id: Date.now(), ...boardData };
    this.boards.push(newBoard);
    return newBoard;
  }
}
