import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";
export declare class ImageGallery {
    id: number;
    name: string;
    altTag: string;
    title: string;
    location: string;
    products: Product[];
    posts: Post[];
    news: News;
}
