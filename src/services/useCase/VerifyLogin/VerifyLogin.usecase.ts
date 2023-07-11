import { IVerifyTokenRepository } from "../../../repository/VerifyTokenRepository/VerifyToken.repository";

type assginUser = {
  name: string;
  email: string;
  password: string;
  id: string;
};

export class VereifyLoginUseCase {
  constructor(private verifyUserToken: IVerifyTokenRepository) {}

  async execute(token: string): Promise<assginUser | void> {
    try {
      const userAuth = await this.verifyUserToken.verifyToken(token);
      if (userAuth) {
        const userExist = await this.verifyUserToken.verifyUser(userAuth.email);
        if (userExist)
          return {
            name: userExist.name,
            email: userExist.email,
            id: userExist.id,
            password: userExist.password,
          };
      }
      throw new Error("User is not authenticate");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected Error");
    }
  }
}
