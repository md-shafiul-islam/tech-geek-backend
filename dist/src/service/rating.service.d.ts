import { UpdateResult } from "typeorm";
import { Rating } from "../model/Rating";
declare class RatingService {
    private ratingRepository;
    private ratingItemRepository;
    private initRepository;
    save(rating: Partial<Rating>): Promise<(Partial<Rating> & Rating) | null | undefined>;
    getById(id: number): Promise<Rating | null | undefined>;
    getAll(): Promise<Rating[] | null | undefined>;
    update(rating: Partial<Rating>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
    addRatingByProduct(rating: Rating): Promise<Rating | null>;
    getByProductId(id: number): Promise<Rating | null | undefined>;
}
export declare const ratingService: RatingService;
export {};
