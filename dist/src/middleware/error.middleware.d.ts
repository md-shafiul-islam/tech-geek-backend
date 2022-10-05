import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/HttpException";
declare const errorMiddleware: (error: HttpException, req: Request, resp: Response, next: NextFunction) => void;
export default errorMiddleware;
