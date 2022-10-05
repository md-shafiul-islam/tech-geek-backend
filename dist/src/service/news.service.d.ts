import { UpdateResult } from "typeorm";
import { News } from "../model/News";
declare class NewsService {
    private newsRepository;
    private initRepository;
    getCount(): Promise<number | undefined>;
    save(news: Partial<News>): Promise<News | null>;
    getById(id: number): Promise<News | null | undefined>;
    getAll(): Promise<News[] | null | undefined>;
    update(news: Partial<News>): Promise<UpdateResult | null | undefined>;
    delete(id: number): Promise<import("typeorm").DeleteResult | null | undefined>;
}
export declare const newsService: NewsService;
export {};
