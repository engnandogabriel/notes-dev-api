import { User } from "../../domain/entities/User";
import { Notes } from "../../domain/entities/Notes";

export interface IDeleteNotesRepository {
  findAuthor(author: string): Promise<User | void>;

  findNoteId(id: string): Promise<Notes | void>;

  delete(id: string): Promise<void>;
}
