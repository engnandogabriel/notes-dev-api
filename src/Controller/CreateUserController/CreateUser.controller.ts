import { Request, Response } from "express";
import { CreateUserUseCase } from "../../services/useCase/CreateUser/cretateUser.usecase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
      return response
        .status(201)
        .json({ message: "User created successfully", user: user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: "Unexpected error" });
    }
  }
}
