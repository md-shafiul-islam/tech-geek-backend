import { News } from "./News";
import { Product } from "./Product";
export declare class Brand {
    id: number;
    publicId: string;
    name: string;
    description: string;
    tagLine: string;
    logoUrl: string;
    website: string;
    products: Product[];
    news: News[];
}
