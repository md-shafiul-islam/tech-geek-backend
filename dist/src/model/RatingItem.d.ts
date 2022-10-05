import { RateKey } from "./RateKey";
import { Rating } from "./Rating";
export declare class RatingItem {
    id: number;
    rateKey: RateKey;
    rating: Rating;
    maxValue: number;
    minValue: number;
    inValue: number;
    description: string;
}
