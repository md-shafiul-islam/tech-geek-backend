import { Request, Response } from "express";
declare class SiteMapController {
    getAllItemsCount(req: Request, resp: Response): Promise<void>;
}
export declare const siteMapController: SiteMapController;
export {};
