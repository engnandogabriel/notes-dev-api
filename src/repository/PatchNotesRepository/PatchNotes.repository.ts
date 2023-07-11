import { User } from "../../domain/entities/User";
import { PatchNotesDTO } from "../../services/useCase/PatchNotes/PatchNotesDTO";

export type notesProps = {
  title?: string;
  body?: string;
  atualized_at: Date;
};

export interface IPatchNotesRepository {
  findByAuthor(author: string): Promise<User | void>;

  patchNote(id: string, note: notesProps): Promise<void>;
}
