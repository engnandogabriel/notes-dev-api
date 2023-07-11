import { MongoClient } from "../../database/MongoDB";
import { Notes } from "../../domain/entities/Notes";
import { User } from "../../domain/entities/User";
import { IDeleteNotesRepository } from "../DeleteNotesRepository/DeleteNotes.repository";

export class ImplementesDeleteNote implements IDeleteNotesRepository {
  async findAuthor(author: string): Promise<void | User> {
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

  async findNoteId(id: string): Promise<Notes | void> {
    try {
      const noteExist = await MongoClient.db
        .collection(process.env.COLLECTION_NOTES!)
        .findOne({ id: id });

      if (noteExist)
        return {
          author: noteExist.autho,
          body: noteExist.body,
          id: noteExist.id,
          title: noteExist.title,
        };
    } catch (error) {}
  }

  async delete(id: string): Promise<void> {
    try {
      await MongoClient.db
        .collection(process.env.COLLECTION_NOTES!)
        .deleteOne({ id: id });
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }
}
