import { News } from "./News";
import { Post } from "./Post";
import { Product } from "./Product";
import { User } from "./User";
export declare class Comment {
    id: number;
    content: string;
    author: User;
    approveUser: User;
    product: Product;
    news: News;
    post: Post;
    children: Comment[];
    parent: Comment;
    createDate: Date;
    updateDate: Date;
}
