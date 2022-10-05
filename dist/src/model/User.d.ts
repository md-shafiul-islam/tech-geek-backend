import { Comment } from "./Comment";
import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";
export declare class User {
    id: number;
    publicId: string;
    firstName: string;
    lastName: string;
    products: Product[];
    posts: Post[];
    news: News[];
    comments: Comment[];
    approveComments: Comment[];
    isActive: boolean;
}
