import { Product } from "./Product";
import { SpecKey } from "./SpecKey";
export declare class Specification {
    id: number;
    key: SpecKey;
    value: string;
    description: string;
    product: Product;
    isFeature: boolean;
}
