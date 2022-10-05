import { Request, Response } from "express";
declare class InitialController {
    convertFile(req: Request, resp: Response): Promise<void>;
    saveAllProduct(req: Request, resp: Response): Promise<void>;
}
export declare const initialController: InitialController;
export {};
