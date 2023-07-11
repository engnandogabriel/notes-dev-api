import { MongoClient } from "../../database/MongoDB";
import { Notes } from "../../domain/entities/Notes";
import { User } from "../../domain/entities/User";
import { IGetNotesRepository } from "../GetNotesRepository/GetNotes.repository";

export class ImplementsGetNotes implements IGetNotesRepository {
  async findByAuthor(author: string): Promise<void | User> {
    try {
      const userExist = await MongoClient.db
        .collection(process.env.COLLECTION_USER!)
        .findOne({ id: author });

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
      throw new Error("Unexpected Error");
    }
  }
  async getNotes(author: string): Promise<Notes[] | void> {
    try {
      const notesUser = await MongoClient.db
        .collection<Omit<Notes, "_id">>(process.env.COLLECTION_NOTES!)
        .find({ author: author })
        .toArray();
      const notes = notesUser.map((note) => {
        const { _id, ...rest } = note;
        return { ...rest };
      });
      return notes;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
