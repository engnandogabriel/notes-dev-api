import { MongoClient } from "../../database/MongoDB";
import { User } from "../../domain/entities/User";
import { ILoginUserRepository } from "../LoginUserRepository/LoginUserRepository";

export class ImplementesUserLogin implements ILoginUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userExist = await MongoClient.db
        .collection(process.env.COLLECTION_USER!)
        .findOne({ email: email });

      if (userExist) {
        const rest = userExist;
        const id = rest.id;
        return {
          id: id,
          name: rest.name,
          email: rest.email,
          password: rest.password,
        };
      }
      return null;
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }
}
