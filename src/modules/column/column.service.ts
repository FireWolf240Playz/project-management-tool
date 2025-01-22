import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './schemas/column.schema';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
  ) {}

  /**
   * Get all columns for a specific board.
   * @param boardId - ID of the board
   * @returns A list of columns
   */
  async getColumnsByBoard(boardId: string): Promise<Column[]> {
    return this.columnModel.find({ boardId }).sort({ orderIndex: 1 }).exec();
  }

  /**
   * Create a new column.
   * @param columnData - Data for the new column
   * @returns The created column
   */
  async createColumn(columnData: Partial<Column>): Promise<Column> {
    const newColumn = new this.columnModel(columnData);
    return newColumn.save();
  }

  /**
   * Update a column.
   * @param columnId - ID of the column to update
   * @param updatedData - Data to update
   * @returns The updated column or null if not found
   */
  async updateColumn(
    columnId: string,
    updatedData: Partial<Column>,
  ): Promise<Column | null> {
    return this.columnModel
      .findByIdAndUpdate(columnId, updatedData, { new: true })
      .exec();
  }

  /**
   * Delete a column by ID.
   * @param columnId - ID of the column to delete
   * @returns `true` if the column was deleted, `false` if not found
   */
  async deleteColumn(columnId: string): Promise<boolean> {
    const result = await this.columnModel.deleteOne({ _id: columnId }).exec();
    return result.deletedCount > 0;
  }
}
