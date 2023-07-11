import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthenticateUser {
  async auth(
    name: string,
    email: string,
    id: string,
    password: string,
    passDataBase: string
  ): Promise<string | null> {
    try {
      const isValid = await compare(password, passDataBase);
      if (isValid) {
        const token = sign(
          {
            name,
            email,
            id,
            passDataBase,
          },
          process.env.SECRET!,
          { expiresIn: "3d" }
        );
        return token;
      } else throw new Error("Email or password is incorrect");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unespected error");
    }
  }
}
