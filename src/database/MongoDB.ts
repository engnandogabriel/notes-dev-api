import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const userName = process.env.USER_DB;
    const passwordDB = process.env.PASSWORD_DB;
    const URL = process.env.ULR_MONGODB || "localhost:27017";

    const client = new Mongo(URL, {
      auth: {
        username: userName,
        password: passwordDB,
      },
    });

    const db = client.db("dev-notes");
    this.client = client;
    this.db = db;
  },
};
