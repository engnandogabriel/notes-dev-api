import { MongoClient } from "../../database/MongoDB";
import { User } from "../../domain/entities/User";
import {
  IPatchNotesRepository,
  notesProps,
} from "../PatchNotesRepository/PatchNotes.repository";

export class ImplImplementesPatchNote implements IPatchNotesRepository {
  async findByAuthor(author: string): Promise<User | void> {
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
      throw new Error("Unexpected Error.");
    }
  }
  async patchNote(id: string, note: notesProps): Promise<void> {
    try {
      const noteExist = await MongoClient.db
        .collection<Omit<notesProps, "_id">>(process.env.COLLECTION_NOTES!)
        .findOne({ id: id });

      if (noteExist) {
        await MongoClient.db
          .collection(process.env.COLLECTION_NOTES!)
          .updateOne(
            { id: id },
            {
              $set: {
                ...note,
              },
            }
          );
      } else throw new Error("Note not atualized");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
