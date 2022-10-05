import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";
export declare class Category {
    id: number;
    name: string;
    description: string;
    key: string;
    actionUrl: string;
    children: Category[];
    parent: Category;
    products: Product[];
    posts: Post[];
    news: News[];
}
