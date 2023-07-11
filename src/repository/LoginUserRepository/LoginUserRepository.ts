import { User } from "../../domain/entities/User";

export interface ILoginUserRepository {
  findByEmail(email: string): Promise<User | null>;
}
