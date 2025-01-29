import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { Column } from './schemas/column.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get(':boardId')
  async getColumns(@Param('boardId') boardId: string): Promise<Column[]> {
    return this.columnService.getColumnsByBoard(boardId);
  }

  @Post()
  async createColumn(@Body() columnData: Partial<Column>): Promise<Column> {
    return this.columnService.createColumn(columnData);
  }

  @Patch(':id')
  async updateColumn(
    @Param('id') columnId: string,
    @Body() updatedData: Partial<Column>,
  ): Promise<Column | null> {
    return this.columnService.updateColumn(columnId, updatedData);
  }

  @Delete(':id')
  async deleteColumn(@Param('id') columnId: string): Promise<boolean> {
    return this.columnService.deleteColumn(columnId);
  }
}
