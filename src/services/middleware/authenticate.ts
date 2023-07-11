import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export class Authenticate {
  check(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access Refused! Your token is null or invalid!" });
      }
      const secret = process.env.SECRET!;
      verify(token!, secret);
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Access Denied! You do not have acecess to this page",
      });
    }
  }
}
