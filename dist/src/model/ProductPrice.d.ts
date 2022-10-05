import { Product } from "./Product";
export declare class ProductPrice {
    id: number;
    title: string;
    type: string;
    price: number;
    discountPrice: number;
    isDiscounted: boolean;
    product: Product;
}
