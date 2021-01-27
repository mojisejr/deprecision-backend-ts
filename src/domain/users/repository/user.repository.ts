import { injectable } from "inversify";
import { Repository } from "./../../../core/interfaces/base.repository";
import { IUser } from "./../model/user.interface";
import { userModel } from "../model/user.model";
import { UserDTO } from "../dto/user.dto";
import { MongooseAPIFeature } from "./../../../utils/mongoose.api.feature";

@injectable()
export class UserRepository implements Repository<IUser, UserDTO> {
  async create(dto: UserDTO): Promise<IUser> {
    return await userModel.create(dto);
  }

  async save(user: IUser): Promise<void> {
    await user.save({ validateBeforeSave: false });
  }

  async getById(id: string): Promise<IUser> {
    return await userModel.findById(id);
  }

  async getAll(queryString?: string): Promise<IUser[]> {
    const users = new MongooseAPIFeature(userModel, queryString).filter();
    return await users.query;
  }
  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    return await userModel.findByIdAndUpdate(id, user);
  }
  async delete(id: string): Promise<void> {
    throw new Error("no implementation");
  }
}
