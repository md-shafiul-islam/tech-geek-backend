import { Request, Response } from "express";
declare class CategoryController {
    getAll(req: Request, resp: Response): Promise<void>;
    getCategoryTree(req: Request, resp: Response): Promise<void>;
    getById(req: Request, resp: Response): Promise<void>;
    add(req: Request, resp: Response): Promise<void>;
    update(req: Request, resp: Response): Promise<void>;
    delete(req: Request, resp: Response): Promise<void>;
}
export declare const categoryController: CategoryController;
export {};
