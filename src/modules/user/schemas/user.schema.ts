import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Guest = 'Guest',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({
    required: true,
    type: [String],
    enum: UserRole,
    default: [UserRole.User],
  })
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
