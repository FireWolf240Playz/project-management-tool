import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Column extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Board' })
  boardId: Types.ObjectId;

  @Prop({ required: true })
  orderIndex: number;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
