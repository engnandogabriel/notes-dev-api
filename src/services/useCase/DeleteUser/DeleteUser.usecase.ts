import { IDeleteUserRepository } from "../../../repository/DeleteUserRepository/DeleteUser.repository";
import { IDeleteUserDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase {
  constructor(private deleteUserRepository: IDeleteUserRepository) {}

  async execute(data: IDeleteUserDTO): Promise<void> {
    try {
      const userExist = await this.deleteUserRepository.findByEmail(data.email);
      if (!userExist) throw new Error("User do not exists");

      await this.deleteUserRepository.deleteAllNotes(userExist.id);
      await this.deleteUserRepository.deleteByEmail(data.email);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
