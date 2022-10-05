import { apiWriteLog } from "../logger/writeLog";
import { brandService } from "./brand.service";
import { newsService } from "./news.service";
import { postService } from "./post.service";
import { productService } from "./product.service";

class SiteMapService {
  async getAllItemsCount() {
    try {
      const products = await productService.getCount();
      const brands = await brandService.getCount();
      const news = newsService.getCount();
      const blogs = postService.getCount();

      return { products, brands, news, blogs };
    } catch (error) {
      apiWriteLog.error("specificationType Save Failed ");
      return null;
    }
  }
}

export const siteMapService = new SiteMapService();
