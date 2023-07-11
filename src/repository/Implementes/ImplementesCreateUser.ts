import { MongoClient } from "../../database/MongoDB";
import { User } from "../../domain/entities/User";
import { ICreateUserRepository } from "../CreateUserRepository/CreateUser.repository";

export class ImplementesCreateUser implements ICreateUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userExist = await MongoClient.db
        .collection(process.env.COLLECTION_USER!)
        .findOne({ email: email });

      if (userExist) {
        const id = userExist.id;
        return {
          id: id,
          name: userExist.name,
          email: userExist.email,
          password: userExist.password,
        };
      }
      return null;
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }
  async save(data: User): Promise<void> {
    try {
      await MongoClient.db
        .collection(process.env.COLLECTION_USER!)
        .insertOne(data);
    } catch (error) {
      throw new Error("Unexpected error");
    }
  }
}
