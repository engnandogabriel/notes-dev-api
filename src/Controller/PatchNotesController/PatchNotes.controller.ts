import { Request, Response } from "express";
import { PatchNotesUseCase } from "../../services/useCase/PatchNotes/PatchNotes.usecase";

export class PatchNotesController {
  constructor(private patchNotesUseCase: PatchNotesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const author = request.params.author;
      const { id, title, body } = request.body;

      await this.patchNotesUseCase.execute({
        id,
        title,
        body,
        author,
      });
      return response
        .status(201)
        .json({ message: "Note atualized successifully" });
    } catch (error) {
      if (error instanceof Error)
        return response.status(500).json({ message: error.message });

      return response.status(500).json({ message: "Unexpected Error" });
    }
  }
}
