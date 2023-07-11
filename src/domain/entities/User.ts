import { uuid } from "uuidv4";

export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(user: Omit<User, "id">, id?: string) {
    if (!user.name) throw new Error("Name is missing");
    this.name = user.name;

    if (!user.email) throw new Error("Email is missing");
    this.email = user.email;

    if (!user.password) throw new Error("Password is missing");
    this.password = user.password;

    this.id = id || uuid();
  }
}
