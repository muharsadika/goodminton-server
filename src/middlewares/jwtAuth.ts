import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import Env from "../utils/variable/Env";


export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const Authorization = req.headers.authorization

    if (!Authorization || !Authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({
          code: 401,
          message: "UNAUTHORIZED"
        })
    }

    const token = Authorization.split(" ")[1]

    const auth = jwt.verify(token, Env.EXPRESS_JWT_SECRET_KEY)
    res.locals.auth = auth
    next()

  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({
        code: 401,
        message: "ACCESS DENIED"
      })
  }
}