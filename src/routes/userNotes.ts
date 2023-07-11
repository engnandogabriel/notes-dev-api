import { Router, Request, Response } from "express";

import { DeleteUserController } from "../Controller/DeleteUserController/DeleteUser.controller";
import { DeleteUserUseCase } from "../services/useCase/DeleteUser/DeleteUser.usecase";
import { ImplementesDeleteUser } from "../repository/Implementes/ImplementesDeleteUser";
import { Authenticate } from "../services/middleware/authenticate";

export const routerUser = Router();

routerUser.delete(
  "/",
  new Authenticate().check,
  async (req: Request, res: Response) => {
    const implementesDeleteUser = new ImplementesDeleteUser();
    const deleteUserUseCase = new DeleteUserUseCase(implementesDeleteUser);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    await deleteUserController.handle(req, res);
  }
);
