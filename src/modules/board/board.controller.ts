import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Use the Mongoose schema type

@UseGuards(JwtAuthGuard)
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
