import { JwtPayload, verify } from "jsonwebtoken";
import { User } from "../../domain/entities/User";
import { IVerifyTokenRepository } from "../VerifyTokenRepository/VerifyToken.repository";
import { MongoClient } from "../../database/MongoDB";

export class ImplementesVerifyToken implements IVerifyTokenRepository {
  async verifyToken(token: string): Promise<void | JwtPayload> {
    try {
      return verify(token, process.env.SECRET!, (err, decoded) => {
        if (err) throw new Error("Token Invalid");
        return decoded;
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unespected error");
    }
  }
  async verifyUser(email: string): Promise<void | User> {
    try {
      const userExist = await MongoClient.db
        .collection("users-note")
        .findOne({ email: email });

      if (userExist) {
        const id = userExist.id;
        return {
          id: id,
          name: userExist.name,
          email: userExist.email,
          password: userExist.password,
        };
      }
    } catch (error) {
      throw new Error("Unexpected Error");
    }
  }
}
