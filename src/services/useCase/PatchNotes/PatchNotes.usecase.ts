import { IPatchNotesRepository } from "../../../repository/PatchNotesRepository/PatchNotes.repository";
import { PatchNotesDTO } from "./PatchNotesDTO";

export class PatchNotesUseCase {
  constructor(private patchNotesRepository: IPatchNotesRepository) {}

  async execute(data: PatchNotesDTO): Promise<void> {
    try {
      const authorExist = await this.patchNotesRepository.findByAuthor(
        data.author
      );
      if (!authorExist) throw new Error("Author do not exist");

      await this.patchNotesRepository.patchNote(data.id, {
        title: data.title,
        body: data.body,
        atualized_at: new Date(),
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
