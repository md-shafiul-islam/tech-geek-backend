import { UpdateResult } from "typeorm";
import { Post } from "../model/Post";
declare class PostService {
    private postRepository;
    private initRepository;
    getCount(): Promise<number | undefined>;
    save(post: Post): Promise<Post | null>;
    getById(id: number): Promise<Post | null | undefined>;
    getAll(): Promise<Post[] | null | undefined>;
    update(post: Partial<Post>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const postService: PostService;
export {};
