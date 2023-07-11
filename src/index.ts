import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/MongoDB";
import cors from "cors";
import bodyParser from "body-parser";

config();

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ola mundo");
});

//rota de usuários
import { routerUser } from "./routes/userNotes";
app.use("/user", routerUser);

//rota para login
import { routerLogin } from "./routes/loginUser";
app.use("/login", routerLogin);

//rota para notes
import { routerNotes } from "./routes/notesUser";
app.use("/notes", routerNotes);

app.listen(port, async () => {
  await MongoClient.connect();

  console.log("Service runnign in port " + port);
});
