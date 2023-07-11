import { Notes } from "../../../domain/entities/Notes";
import { ICreateNotesRepository } from "../../../repository/CreateNotesRepository/CreateNotes.repository";
import { ICreateNotesDTO } from "./CreateNotesDTO";

export class CreateNotesUseCase {
  constructor(private createNotesRepository: ICreateNotesRepository) {}

  async execute(data: ICreateNotesDTO): Promise<void> {
    try {
      const userExist = await this.createNotesRepository.findAuthor(
        data.author
      );

      if (!userExist) throw new Error("Author do not exists in database");

      const note = new Notes(data);

      await this.createNotesRepository.save(note);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Note do not created");
    }
  }
}
