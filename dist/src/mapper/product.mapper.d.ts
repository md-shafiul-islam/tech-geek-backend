import { Product } from "../model/Product";
import { ProductPrice } from "../model/ProductPrice";
declare class ProductMapper {
    mapProductByJSON(productJson: any): Promise<Product | null>;
    mapProductPrices(productJson: any): ProductPrice[];
    private mapSpecification;
}
export declare const productMapper: ProductMapper;
export {};
