import { uuid } from "uuidv4";
import { User } from "./User";

export class Notes {
  public id: string;
  public title: string;
  public body: string;
  public author: string;
  public created_at?: Date;
  public atualized_at?: Date;

  constructor(user: Omit<Notes, "id">, id?: string) {
    this.title = user.title;
    this.body = user.body;
    this.author = user.author;
    this.created_at = new Date();
    this.atualized_at = new Date();
    this.id = id || uuid();
  }
}
