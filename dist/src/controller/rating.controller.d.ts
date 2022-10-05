import { Request, Response } from "express";
declare class RatingController {
    getAll(req: Request, resp: Response): Promise<void>;
    getById(req: Request, resp: Response): Promise<void>;
    add(req: Request, resp: Response): Promise<void>;
    update(req: Request, resp: Response): Promise<void>;
    delete(req: Request, resp: Response): Promise<void>;
    deleteRatingKey(req: Request, resp: Response): Promise<void>;
    updateRatingKey(req: Request, resp: Response): Promise<void>;
    addRatingKey(req: Request, resp: Response): Promise<void>;
    getAllRatingKey(req: Request, resp: Response): Promise<void>;
    getRatingKey(req: Request, resp: Response): Promise<void>;
}
export declare const ratingController: RatingController;
export {};
