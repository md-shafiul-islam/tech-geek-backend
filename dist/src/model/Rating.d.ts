import { Product } from "./Product";
import { RatingItem } from "./RatingItem";
import { User } from "./User";
export declare class Rating {
    id: number;
    publicId: string;
    author: User;
    product: Product;
    approveUser: User;
    tagLine: string;
    totalRating: number;
    rateMaxScore: number;
    rateMinScore: number;
    rateAvrScore: number;
    rateItemsCount: number;
    ratingItems: RatingItem[];
    avgRatProduct: Product;
}
