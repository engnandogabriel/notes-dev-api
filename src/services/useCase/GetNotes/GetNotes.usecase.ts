import { Notes } from "../../../domain/entities/Notes";
import { IGetNotesRepository } from "../../../repository/GetNotesRepository/GetNotes.repository";

export class GetNotesUseCase {
  constructor(private getNotesRepository: IGetNotesRepository) {}

  async execute(author: string): Promise<Notes[] | void> {
    try {
      const authorExist = await this.getNotesRepository.findByAuthor(author);

      if (!authorExist) {
        throw new Error("Author do not exists");
      }
      return await this.getNotesRepository.getNotes(author);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
