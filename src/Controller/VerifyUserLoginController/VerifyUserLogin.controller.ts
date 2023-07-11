import { Request, Response } from "express";
import { VereifyLoginUseCase } from "../../services/useCase/VerifyLogin/VerifyLogin.usecase";

export class VerifyUserLoginController {
  constructor(private vereifyLoginUseCase: VereifyLoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.body;
      const userAuth = await this.vereifyLoginUseCase.execute(token);
      return response
        .status(200)
        .json({ message: "User Authenticated", user: userAuth });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ message: error.message });
      return response.status(500).json("Unexpected error");
    }
  }
}
