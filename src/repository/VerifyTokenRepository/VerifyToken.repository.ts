import { JwtPayload } from "jsonwebtoken";
import { User } from "../../domain/entities/User";

export interface IVerifyTokenRepository {
  verifyToken(token: string): Promise<JwtPayload | void>;

  verifyUser(email: string): Promise<User | void>;
}
