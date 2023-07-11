import { Request, Response } from "express";
import { CreateNotesUseCase } from "../../services/useCase/CreateNotes/CreateNotes.usecase";

export class CreateNoteController {
  constructor(private createNotesUseCase: CreateNotesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { title, body, author } = request.body;
      await this.createNotesUseCase.execute({
        title,
        body,
        author,
      });
      return response
        .status(201)
        .json({ message: "Note created successifully" });
    } catch (error) {
      if (error instanceof Error)
        return response.status(500).json({ message: error.message });

      return response.status(500).json({ message: "Unexpected Error" });
    }
  }
}
