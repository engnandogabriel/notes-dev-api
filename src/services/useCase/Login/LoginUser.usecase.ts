import { ILoginUserRepository } from "../../../repository/LoginUserRepository/LoginUserRepository";
import { AuthenticateUser } from "../../Authenticate/AuthenticateUser/AuthenticateUser";
import { ILoginUserDTO } from "./LoginUserDTO";
import { UserLogin } from "../../../domain/types/UserLogin";

export class LoginUserUseCase {
  private loginUserRepository: ILoginUserRepository;
  private authenticate: AuthenticateUser;
  constructor(
    loginUserRepository: ILoginUserRepository,
    authenticate: AuthenticateUser
  ) {
    this.loginUserRepository = loginUserRepository;
    this.authenticate = authenticate;
  }

  async execute(data: ILoginUserDTO): Promise<UserLogin | null> {
    try {
      const userExits = await this.loginUserRepository.findByEmail(data.email);
      if (!userExits) throw new Error("Email or password is invalid");

      const token = await this.authenticate.auth(
        userExits.name,
        userExits.email,
        userExits.id,
        data.password,
        userExits.password //pass crypted
      );
      if (token) {
        return {
          name: userExits.name,
          email: userExits.email,
          id: userExits.id,
          token,
        };
      }
      return null;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
