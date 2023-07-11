import { User } from "../../domain/entities/User";

export interface ICreateUserRepository {
  findByEmail(email: string): Promise<User | null>;

  save(data: User): Promise<void>;
}
