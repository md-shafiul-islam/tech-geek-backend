import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Post } from "../model/Post";
import { esIsEmpty } from "../utils/esHelper";

class PostService {
  private postRepository: Repository<Post> | null = null;

  private initRepository(): void {
    if (this.postRepository === null) {
      this.postRepository = AppDataSource.getRepository(Post);
    }
  }

  async save(post: Partial<Post>) {
    this.initRepository();
    if (post) {
      try {
        const resp = await this.postRepository?.save(post);

        return resp;
      } catch (error) {
        apiWriteLog.error("post Save Failed ");
      }
    }
    return null;
  }

  async getById(id: number): Promise<Post | null | undefined> {
    this.initRepository();
    try {
      const post = await this.postRepository?.findOne({ where: { id: id } });
      return post;
    } catch (err) {
      apiWriteLog.error("Error getpostByID ", err);
      return null;
    }
  }

  async getAll(): Promise<Post[] | null | undefined> {
    this.initRepository();
    try {
      const post = await this.postRepository?.find();
      return post;
    } catch (err) {
      apiWriteLog.error(`Error All post `, err);
      return null;
    }
  }

  async update(post: Partial<Post>):Promise<UpdateResult | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(post)) {
      try {
        const updatepost = await this.postRepository?.update(
          { id: post.id },
          post
        );

        return updatepost;
      } catch (error) {
        apiWriteLog.error(`Update post Error, `, error);
        return null;
      }
    }

    return null;
  }
  async delete(id: number) {
    this.initRepository();
    try {
      const posts = await this.postRepository?.delete({ id: id });
      return posts;
    } catch (err) {
      apiWriteLog.error("Error All post ", err);
      return null;
    }
  }
}

export const postService = new PostService();
