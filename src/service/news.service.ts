import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { News } from "../model/news";
import { esIsEmpty } from "../utils/esHelper";

class NewsService {
  private newsRepository: Repository<News> | null = null;

  private initRepository(): void {
    if (this.newsRepository === null) {
      this.newsRepository = AppDataSource.getRepository(News);
    }
  }

  async save(news: Partial<News>) {
    this.initRepository();
    if (news) {
      try {
        const resp = await this.newsRepository?.save(news);

        return resp;
      } catch (error) {
        apiWriteLog.error("news Save Failed ");
      }
    }
    return null;
  }

  async getById(id: number): Promise<News | null | undefined> {
    this.initRepository();
    try {
      const news = await this.newsRepository?.findOne({ where: { id: id } });
      return news;
    } catch (err) {
      apiWriteLog.error("Error getNewsByID ", err);
      return null;
    }
  }

  async getAll(): Promise<News[] | null | undefined> {
    this.initRepository();
    try {
      const news = await this.newsRepository?.find();
      return news;
    } catch (err) {
      apiWriteLog.error(`Error All news `, err);
      return null;
    }
  }

  async update(news: Partial<News>):Promise<UpdateResult | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(news)) {
      try {
        const updatenews = await this.newsRepository?.update(
          { id: news.id },
          news
        );

        return updatenews;
      } catch (error) {
        apiWriteLog.error(`Update news Error, `, error);
        return null;
      }
    }

    return null;
  }
  async delete(id: number) {
    this.initRepository();
    try {
      const newss = await this.newsRepository?.delete({ id: id });
      return newss;
    } catch (err) {
      apiWriteLog.error("Error All news ", err);
      return null;
    }
  }
}

export const newsService = new NewsService();
