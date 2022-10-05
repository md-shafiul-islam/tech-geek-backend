declare class SiteMapService {
    getAllItemsCount(): Promise<{
        products: number | undefined;
        brands: number | undefined;
        news: Promise<number | undefined>;
        blogs: Promise<number | undefined>;
    } | null>;
}
export declare const siteMapService: SiteMapService;
export {};
