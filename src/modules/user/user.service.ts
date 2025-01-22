import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * Find a user by their ID.
   * @param id - The ID of the user
   * @returns The user document
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Create a new user.
   * @param userData - The data for the new user
   * @returns The created user document
   */
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  /**
   * Find a user by their email.
   * @param email - The email of the user
   * @returns The user document
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
