import { User } from "../../../domain/entities/User";
import { UserLogin } from "../../../domain/types/UserLogin";
import { ICreateUserRepository } from "../../../repository/CreateUserRepository/CreateUser.repository";
import { AuthenticateUser } from "../../Authenticate/AuthenticateUser/AuthenticateUser";
import { ICreateUSerDTO } from "./CreateUserDTO";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  constructor(
    private createUserRepository: ICreateUserRepository,
    private authenticateUser: AuthenticateUser
  ) {}

  async execute(data: ICreateUSerDTO): Promise<UserLogin | void> {
    try {
      const userExist = await this.createUserRepository.findByEmail(data.email);

      if (userExist) throw new Error("User already exists");

      const passCrypt = await hash(data.password, 12);

      const user = new User({
        name: data.name,
        email: data.email,
        password: passCrypt,
      });

      await this.createUserRepository.save(user);

      const userCreated = await this.createUserRepository.findByEmail(
        data.email
      );
      if (userCreated) {
        const tokenUser = await this.authenticateUser.auth(
          userCreated.name,
          userCreated.email,
          userCreated.id,
          data.password,
          userCreated.password //pass crypted)
        );
        return {
          name: userCreated.name,
          email: userCreated.email,
          id: userCreated.id,
          token: tokenUser!,
        };
      }
      // if (userCreated) return userCreated;
      throw new Error("User do not created");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
