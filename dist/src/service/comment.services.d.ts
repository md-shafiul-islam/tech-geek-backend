import { Comment } from "../model/Comment";
declare class CommentService {
    private commentRepository;
    private commentRepositoryTree;
    initRepository(): void;
    getById(id: number): Promise<Comment | null>;
    save(comment: Comment): Promise<Comment | null>;
    getCommentByProductAsTree(id: number): Promise<Comment[] | null>;
}
export declare const commentService: CommentService;
export {};
