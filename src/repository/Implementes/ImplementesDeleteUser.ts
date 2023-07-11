import { MongoClient } from "../../database/MongoDB";
import { User } from "../../domain/entities/User";
import { IDeleteUserRepository } from "../DeleteUserRepository/DeleteUser.repository";

export class ImplementesDeleteUser implements IDeleteUserRepository {
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

  async deleteAllNotes(author: string): Promise<void> {
    try {
      await MongoClient.db
        .collection(process.env.COLLECTION_NOTES!)
        .deleteMany({ author: author });
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }

  async deleteByEmail(email: string): Promise<void> {
    try {
      await MongoClient.db.collection("users-note").deleteOne({ email: email });
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }
}
