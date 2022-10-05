import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";
export declare class MetaDeta {
    id: number;
    name: string;
    content: string;
    products: Product[];
    posts: Post[];
    news: News[];
}
