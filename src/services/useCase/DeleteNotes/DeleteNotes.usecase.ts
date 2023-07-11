import { IDeleteNotesRepository } from "../../../repository/DeleteNotesRepository/DeleteNotes.repository";
import { IDeleteNotesDTO } from "./DeleteNotesDTO";

export class DeleteNotesUseCase {
  constructor(private deleteNotesRepository: IDeleteNotesRepository) {}

  async execute(data: IDeleteNotesDTO): Promise<void> {
    try {
      const authorExist = await this.deleteNotesRepository.findAuthor(
        data.author
      );
      if (!authorExist) throw new Error("Author do not exists");

      const noteExiste = await this.deleteNotesRepository.findNoteId(data.id);
      if (!noteExiste) throw new Error("Note do not existe");
      await this.deleteNotesRepository.delete(data.id);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
