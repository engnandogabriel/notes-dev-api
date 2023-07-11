import { Notes } from "../../domain/entities/Notes";
import { User } from "../../domain/entities/User";

export interface IGetNotesRepository {
  findByAuthor(author: string): Promise<User | void>;

  getNotes(author: string): Promise<Notes[] | void>;
}
