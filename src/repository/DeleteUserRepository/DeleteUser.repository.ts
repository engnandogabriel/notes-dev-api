import { User } from "../../domain/entities/User";

export interface IDeleteUserRepository {
  findByEmail(email: string): Promise<User | null>;

  deleteAllNotes(author: string): Promise<void>;

  deleteByEmail(email: string): Promise<void>;
}
