import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './interfaces';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: Omit<Board, 'id'>): Board {
    return this.boardService.createBoard(createBoardDto);
  }
}
