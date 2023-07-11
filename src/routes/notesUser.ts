import { Request, Response, Router } from "express";
import { CreateNoteController } from "../Controller/CreateNoteController/CreateNote.controller";
import { CreateNotesUseCase } from "../services/useCase/CreateNotes/CreateNotes.usecase";
import { ImplementereateNotes } from "../repository/Implementes/ImplementsCereateNotes";
import { GetNotesController } from "../Controller/GetNotesController/GetNotes.controller";
import { GetNotesUseCase } from "../services/useCase/GetNotes/GetNotes.usecase";
import { ImplementsGetNotes } from "../repository/Implementes/ImplementsGetNotes";
import { PatchNotesController } from "../Controller/PatchNotesController/PatchNotes.controller";
import { PatchNotesUseCase } from "../services/useCase/PatchNotes/PatchNotes.usecase";
import { ImplImplementesPatchNote } from "../repository/Implementes/ImplementesPatchNote";
import { DeleteNotesController } from "../Controller/DeleteNoteController/DeleteNote.controller";
import { DeleteNotesUseCase } from "../services/useCase/DeleteNotes/DeleteNotes.usecase";
import { ImplementesDeleteNote } from "../repository/Implementes/ImplementesDeleteNote";
import { Authenticate } from "../services/middleware/authenticate";

export const routerNotes = Router();

routerNotes.post(
  "/create-notes",
  new Authenticate().check,
  async (req: Request, res: Response) => {
    const implementereateNotes = new ImplementereateNotes();
    const createNotesUseCase = new CreateNotesUseCase(implementereateNotes);
    const createNoteController = new CreateNoteController(createNotesUseCase);
    await createNoteController.handle(req, res);
  }
);

routerNotes.get(
  "/get-notes/:author",
  new Authenticate().check,
  async (req: Request, res: Response) => {
    const implementsGetNotes = new ImplementsGetNotes();
    const getNotesUseCase = new GetNotesUseCase(implementsGetNotes);
    const getNotesController = new GetNotesController(getNotesUseCase);
    await getNotesController.handle(req, res);
  }
);

routerNotes.patch(
  "/edit-note/:author",
  new Authenticate().check,
  async (req: Request, res: Response) => {
    const implImplementesPatchNote = new ImplImplementesPatchNote();
    const patchNotesUseCase = new PatchNotesUseCase(implImplementesPatchNote);
    const patchNotesController = new PatchNotesController(patchNotesUseCase);
    await patchNotesController.handle(req, res);
  }
);

routerNotes.delete(
  "/delete-note/:author",
  new Authenticate().check,
  async (req, res) => {
    const implementesDeleteNote = new ImplementesDeleteNote();
    const deleteNotesUseCase = new DeleteNotesUseCase(implementesDeleteNote);
    const deleteNotesController = new DeleteNotesController(deleteNotesUseCase);
    await deleteNotesController.handle(req, res);
  }
);
