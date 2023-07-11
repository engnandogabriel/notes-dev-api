import { Notes } from "../../domain/entities/Notes";
import { User } from "../../domain/entities/User";

export interface ICreateNotesRepository {
  findAuthor(id: string): Promise<User | void>;

  save(data: Notes): Promise<Notes | void>;
}
