import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema'; // Use the Mongoose schema type

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Post()
  async createBoard(@Body() createBoardDto: Omit<Board, 'id'>): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }
}
