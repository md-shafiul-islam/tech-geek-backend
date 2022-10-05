import { UpdateResult } from "typeorm";
import { Product } from "../model/Product";
import { Review } from "../model/Review";
declare class ReviewService {
    private reviewRepository;
    private initRepository;
    save(review: Partial<Review>): Promise<(Partial<Review> & Review) | null | undefined>;
    getById(id: number): Promise<Review | null | undefined>;
    getAll(): Promise<Review[] | null | undefined>;
    update(review: Partial<Review>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
    getAllReviewsByProduct(id: number): Promise<Review[] | null | undefined>;
    getAddReviewsByProduct(product: Product, content: string): Promise<Review | null | undefined>;
}
export declare const reviewService: ReviewService;
export {};
