import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../services/useCase/DeleteUser/DeleteUser.usecase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;
      await this.deleteUserUseCase.execute({ email: email });

      return response.status(200).json("User deleted successifully");
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
