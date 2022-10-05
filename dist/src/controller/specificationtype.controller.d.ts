import { Request, Response } from "express";
declare class SpecificationTypeController {
    getAll(req: Request, resp: Response): Promise<void>;
    getById(req: Request, resp: Response): Promise<void>;
    add(req: Request, resp: Response): Promise<void>;
    update(req: Request, resp: Response): Promise<void>;
    delete(req: Request, resp: Response): Promise<void>;
}
export declare const specificationTypeController: SpecificationTypeController;
export {};
