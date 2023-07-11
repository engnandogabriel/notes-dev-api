import { Router, Request, Response } from "express";
import { LoginUserController } from "../Controller/LoginUserController/LoginUser.controller";
import { LoginUserUseCase } from "../services/useCase/Login/LoginUser.usecase";
import { AuthenticateUser } from "../services/Authenticate/AuthenticateUser/AuthenticateUser";
import { ImplementesUserLogin } from "../repository/Implementes/ImplementesLoginUser";
import { VerifyUserLoginController } from "../Controller/VerifyUserLoginController/VerifyUserLogin.controller";
import { VereifyLoginUseCase } from "../services/useCase/VerifyLogin/VerifyLogin.usecase";
import { ImplementesCreateUser } from "../repository/Implementes/ImplementesCreateUser";
import { CreateUserUseCase } from "../services/useCase/CreateUser/cretateUser.usecase";
import { CreateUserController } from "../Controller/CreateUserController/CreateUser.controller";
import { ImplementesVerifyToken } from "../repository/Implementes/ImplementesVerifyToken";
export const routerLogin = Router();

//login user
routerLogin.post("/", async (req: Request, res: Response) => {
  const implementesUserLogin = new ImplementesUserLogin();
  const authenticateUser = new AuthenticateUser();
  const loginUserUseCase = new LoginUserUseCase(
    implementesUserLogin,
    authenticateUser
  );
  const loginUserController = new LoginUserController(loginUserUseCase);
  await loginUserController.handle(req, res);
});

routerLogin.post("/create-user", async (req, res) => {
  const implementesCreateUser = new ImplementesCreateUser();
  const authenticateUser = new AuthenticateUser();
  const createUserUseCase = new CreateUserUseCase(
    implementesCreateUser,
    authenticateUser
  );
  const createUserRepository = new CreateUserController(createUserUseCase);
  await createUserRepository.handle(req, res);
});

routerLogin.post("/verify", async (req: Request, res: Response) => {
  const implementesVerifyToken = new ImplementesVerifyToken();
  const vereifyLoginUseCase = new VereifyLoginUseCase(implementesVerifyToken);
  const verifyUserLoginController = new VerifyUserLoginController(
    vereifyLoginUseCase
  );
  await verifyUserLoginController.handle(req, res);
});
