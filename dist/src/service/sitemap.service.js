"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteMapService = void 0;
const writeLog_1 = require("../logger/writeLog");
const brand_service_1 = require("./brand.service");
const news_service_1 = require("./news.service");
const post_service_1 = require("./post.service");
const product_service_1 = require("./product.service");
class SiteMapService {
    async getAllItemsCount() {
        try {
            const products = await product_service_1.productService.getCount();
            const brands = await brand_service_1.brandService.getCount();
            const news = news_service_1.newsService.getCount();
            const blogs = post_service_1.postService.getCount();
            return { products, brands, news, blogs };
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specificationType Save Failed ");
            return null;
        }
    }
}
exports.siteMapService = new SiteMapService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2Uvc2l0ZW1hcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQUFpRDtBQUNqRCxtREFBK0M7QUFDL0MsaURBQTZDO0FBQzdDLGlEQUE2QztBQUM3Qyx1REFBbUQ7QUFFbkQsTUFBTSxjQUFjO0lBQ2xCLEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqRCxNQUFNLE1BQU0sR0FBRyxNQUFNLDRCQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0MsTUFBTSxJQUFJLEdBQUcsMEJBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxNQUFNLEtBQUssR0FBRywwQkFBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXJDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUMxQztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBicmFuZFNlcnZpY2UgfSBmcm9tIFwiLi9icmFuZC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IG5ld3NTZXJ2aWNlIH0gZnJvbSBcIi4vbmV3cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4vcG9zdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4vcHJvZHVjdC5zZXJ2aWNlXCI7XHJcblxyXG5jbGFzcyBTaXRlTWFwU2VydmljZSB7XHJcbiAgYXN5bmMgZ2V0QWxsSXRlbXNDb3VudCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0Q291bnQoKTtcclxuICAgICAgY29uc3QgYnJhbmRzID0gYXdhaXQgYnJhbmRTZXJ2aWNlLmdldENvdW50KCk7XHJcbiAgICAgIGNvbnN0IG5ld3MgPSBuZXdzU2VydmljZS5nZXRDb3VudCgpO1xyXG4gICAgICBjb25zdCBibG9ncyA9IHBvc3RTZXJ2aWNlLmdldENvdW50KCk7XHJcblxyXG4gICAgICByZXR1cm4geyBwcm9kdWN0cywgYnJhbmRzLCBuZXdzLCBibG9ncyB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjaWZpY2F0aW9uVHlwZSBTYXZlIEZhaWxlZCBcIik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNpdGVNYXBTZXJ2aWNlID0gbmV3IFNpdGVNYXBTZXJ2aWNlKCk7XHJcbiJdfQ==