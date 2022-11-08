import { Request, Response } from "express";
declare class ProductController {
    getProducstByFilter(req: Request, resp: Response): Promise<void>;
    getProductByAliasNames(req: Request, resp: Response): Promise<void>;
    getProductsRangeItems(req: Request, resp: Response): Promise<void>;
    getProductsSiteMapItems(req: Request, resp: Response): Promise<void>;
    getProductsBySearch(req: Request, resp: Response): Promise<void>;
    getProductsByQuerySearch(req: Request, resp: Response): Promise<void>;
    getByMostVisitedProducts(req: Request, resp: Response): Promise<void>;
    getProductByPriceRange(req: Request, resp: Response): Promise<void>;
    getAll(req: Request, resp: Response): Promise<void>;
    getBySinglePageData(req: Request, resp: Response): Promise<void>;
    getByAliasName(req: Request, resp: Response): Promise<void>;
    getById(req: Request, resp: Response): Promise<void>;
    add(req: Request, resp: Response): Promise<void>;
    update(req: Request, resp: Response): Promise<void>;
    delete(req: Request, resp: Response): Promise<void>;
    getProductAllReview(req: Request, resp: Response): Promise<void>;
    addProductReview(req: Request, resp: Response): Promise<void>;
    getProductComment(req: Request, resp: Response): Promise<void>;
    getProductAllComment(req: Request, resp: Response): Promise<void>;
    addProductComment(req: Request, resp: Response): Promise<void>;
    addProductRating(req: Request, resp: Response): Promise<void>;
    getProductRating(req: Request, resp: Response): Promise<void>;
}
export declare const productController: ProductController;
export {};
