import { Request, Response } from "express";
import { GetNotesUseCase } from "../../services/useCase/GetNotes/GetNotes.usecase";

export class GetNotesController {
  constructor(private getNotesUseCase: GetNotesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { author } = request.params;
      const notesAuthor = await this.getNotesUseCase.execute(author);
      return response.status(200).json({ notes: notesAuthor });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ message: error.message });

      return response.status(500).json({ message: "Unexpected Error" });
    }
  }
}
