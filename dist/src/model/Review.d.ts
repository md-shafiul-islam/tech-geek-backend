import { Product } from "./Product";
import { User } from "./User";
export declare class Review {
    id: number;
    author: User;
    product: Product;
    approveUser: User;
    content: string;
    createdDate: Date;
    updateDate: Date;
}
