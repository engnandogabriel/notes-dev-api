import { Request, Response } from "express";
import { LoginUserUseCase } from "../../services/useCase/Login/LoginUser.usecase";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const token = await this.loginUserUseCase.execute({
        email: email,
        password: password,
      });
      return response.status(200).json(token);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json(error.message);
      return response.status(400).json("Unexpected error");
    }
  }
}
