import { MongoClient } from "../../database/MongoDB";
import { Notes } from "../../domain/entities/Notes";
import { User } from "../../domain/entities/User";
import { ICreateNotesRepository } from "../CreateNotesRepository/CreateNotes.repository";

export class ImplementereateNotes implements ICreateNotesRepository {
  async findAuthor(id: string): Promise<User | void> {
    try {
      const userExist = await MongoClient.db
        .collection(process.env.COLLECTION_USER!)
        .findOne({ id: id });
      if (userExist) {
        const id = userExist.id;
        return {
          id: id,
          name: userExist.name,
          email: userExist.email,
          password: userExist.password,
        };
      }
    } catch (error) {
      throw new Error("Unexpected Error.");
    }
  }
  async save(data: Notes): Promise<Notes | void> {
    try {
      await MongoClient.db
        .collection(process.env.COLLECTION_NOTES!)
        .insertOne(data);
    } catch (error) {
      throw new Error("Note do not created");
    }
  }
}
