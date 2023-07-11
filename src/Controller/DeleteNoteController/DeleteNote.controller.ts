import { Request, Response } from "express";
import { DeleteNotesUseCase } from "../../services/useCase/DeleteNotes/DeleteNotes.usecase";

export class DeleteNotesController {
  constructor(private deleteNotesUseCase: DeleteNotesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const author = request.params.author;
      const id = request.body.id;
      await this.deleteNotesUseCase.execute({ author, id });
      return response
        .status(200)
        .json({ message: "Note Deleted successifully" });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Unexpected error" });
    }
  }
}
