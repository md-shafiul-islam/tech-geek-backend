"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const writeLog_1 = require("../logger/writeLog");
const Comment_1 = require("../model/Comment");
const comment_services_1 = require("../service/comment.services");
const product_service_1 = require("../service/product.service");
const rating_service_1 = require("../service/rating.service");
const review_service_1 = require("../service/review.service");
const esHelper_1 = require("../utils/esHelper");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class ProductController {
    async getProducstByFilter(req, resp) {
        try {
            const products = await product_service_1.productService.getAllProducstByFilter(req.body);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} product(s) found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "Get product By Filter not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getProductByAliasNames(req, resp) {
        try {
            const products = await product_service_1.productService.getAllByAliasNames(req.body);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} product(s) found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getProductsRangeItems(req, resp) {
        try {
            const products = await product_service_1.productService.getAllByPriceRange(req.query);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} product(s) found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getProductsSiteMapItems(req, resp) {
        try {
            console.log("Geting  products sitemap ... ");
            const products = await product_service_1.productService.getProductSiteMapItems(req.query);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} Search Options found`, true));
            }
            else {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `Search Options not found`));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Search Options found Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Search Options found not found"));
        }
    }
    async getProductsBySearch(req, resp) {
        try {
            console.log("Geting Search products ... ");
            const products = await product_service_1.productService.getProductSearchOptions();
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} Search Options found`, true));
            }
            else {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `Search Options not found`));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Search Options found Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Search Options found not found"));
        }
    }
    async getProductsByQuerySearch(req, resp) {
        try {
            console.log("Geting Search Query products ... Query, ", req?.params?.name);
            const products = await product_service_1.productService.getProductSearchQuery(req?.params?.name);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products?.length} Search Query found`, true));
            }
            else {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `Search Query not found`));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Search Query found Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Search Query found not found"));
        }
    }
    async getByMostVisitedProducts(req, resp) {
        try {
            let limit = (0, esHelper_1.esGetNumber)(req.query.size);
            const products = await product_service_1.productService.getMostVisitedProducts(limit);
            resp.status(200);
            resp.send((0, respFormat_1.default)(products, "Visited product's not found"));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Visited products Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Visited product's not found"));
        }
    }
    async getProductByPriceRange(req, resp) {
        try {
            const { count, cat, start, end } = req.query;
            let minPrice = (0, esHelper_1.esGetNumber)(start);
            let maxPrice = (0, esHelper_1.esGetNumber)(end);
            const products = await product_service_1.productService.getProductByPriceRange(cat, minPrice, maxPrice);
            if (products) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(products, `${products.length} product's found`, true));
            }
            else {
                resp.status(200);
                resp.send((0, respFormat_1.default)(null, "Visited product's not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Visited products Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Visited product's not found"));
        }
    }
    async getAll(req, resp) {
        try {
            const respData = await product_service_1.productService.getAll(req.query);
            if (respData) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(respData, `${respData?.products?.length} product(s) found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getBySinglePageData(req, resp) {
        try {
            const productResp = await product_service_1.productService.getAliasName(req.params?.name);
            if (productResp) {
                product_service_1.productService.saveVisitCount(productResp?.id, productResp?.aliasName);
                const recommended = await product_service_1.productService.getRecommendedProducts(productResp);
                const newArrival = await product_service_1.productService.getNewArrivalProducts(productResp?.category?.key);
                const mostVisited = await product_service_1.productService.getMostVisitedProducts(8);
                resp.status(200);
                resp.send((0, respFormat_1.default)({
                    product: productResp,
                    recommended,
                    visiteds: mostVisited,
                    newArrival,
                }, ` product found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Get product By Alias Name Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getByAliasName(req, resp) {
        try {
            const productResp = await product_service_1.productService.getAliasName(req.params?.name);
            if (productResp) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(productResp, ` product found`, true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Get product By Alias Name Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const product = await product_service_1.productService.getById(id);
            if (product) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(product, "product found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(product, "product not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product not found"));
        }
    }
    async add(req, resp) {
        try {
            const product = await product_service_1.productService.save(req.body);
            resp.status(201);
            resp.send((0, respFormat_1.default)(product, "product Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " product Add failed", false));
        }
    }
    async update(req, resp) {
        try {
            const update = await product_service_1.productService.update(req.body);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "product updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "product update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await product_service_1.productService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "product deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("product Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "product delete failed", false));
        }
    }
    async getProductAllReview(req, resp) {
        try {
            const { id } = req.params;
            const product = await product_service_1.productService.getProductByAllyName(id);
            if (product) {
                const reviews = await review_service_1.reviewService.getAllReviewsByProduct(product.id);
                resp
                    .status(200)
                    .send((0, respFormat_1.default)(reviews, "Product reviews found", true));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product reviews error ", error);
            resp
                .status(200)
                .send((0, respFormat_1.default)(null, "Product reviews not found", false));
        }
    }
    async addProductReview(req, resp) {
        try {
            const { connect } = req.body;
            const { id } = req.params;
            const product = await product_service_1.productService.getProductByAllyName(id);
            if (product) {
                const reviews = await review_service_1.reviewService.getAddReviewsByProduct(product, connect);
                resp.status(200).send((0, respFormat_1.default)(reviews, "Add Product review", true));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product reviews error ", error);
            resp
                .status(200)
                .send((0, respFormat_1.default)(null, "Add Product review failed", false));
        }
    }
    async getProductComment(req, resp) {
        try {
            const { id, cid } = req.params;
            const intCid = Number(cid);
            const comment = await comment_services_1.commentService.getById(intCid);
            resp
                .status(200)
                .send((0, respFormat_1.default)(comment, "Product Comment found", false));
        }
        catch (error) {
            resp
                .status(200)
                .send((0, respFormat_1.default)(null, "Product Comment not found", false));
        }
    }
    async getProductAllComment(req, resp) {
        try {
            const { id } = req.params;
            const intCid = Number(id);
            const comments = await comment_services_1.commentService.getCommentByProductAsTree(intCid);
            resp
                .status(200)
                .send((0, respFormat_1.default)(comments, "Product Comments found", true));
        }
        catch (error) {
            resp
                .status(200)
                .send((0, respFormat_1.default)(null, "Product Comment not found", false));
        }
    }
    async addProductComment(req, resp) {
        try {
            const { content, parent } = req.body;
            const product = await product_service_1.productService.getProductByAllyName(req.params.id);
            const initComment = new Comment_1.Comment();
            initComment.content = content;
            if (product != null && product !== undefined) {
                initComment.product = product;
            }
            if (parent !== null && parent !== undefined) {
                initComment.parent = parent;
            }
            const comment = await product_service_1.productService.addComment(initComment);
            resp.status(201).send((0, respFormat_1.default)(comment, "Product Comment add ", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product Comment add error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "Comment Add failed"));
        }
    }
    //Product Rating
    async addProductRating(req, resp) {
        try {
            const { id } = req.params;
            const iId = Number(id);
            const product = await product_service_1.productService.getById(iId);
            req.body.product = product;
            const rating = await rating_service_1.ratingService.addRatingByProduct(req.body);
            resp.status(201);
            resp.send((0, respFormat_1.default)(rating, "Product Rating Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Add Product Rating Product controller Error ", error);
        }
    }
    async getProductRating(req, resp) {
        try {
            const { id } = req.params;
            const iId = Number(id);
            const product = await product_service_1.productService.getById(iId);
            if (product !== null && product !== undefined) {
                const rating = await rating_service_1.ratingService.getByProductId(product.id);
                resp.status(202);
                resp.send((0, respFormat_1.default)(rating, "Product Rating found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "Product not found", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Add Product Rating Product controller Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "Product Rating not found", false));
        }
    }
}
exports.productController = new ProductController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvcHJvZHVjdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLGlEQUFpRDtBQUNqRCw4Q0FBMkM7QUFHM0Msa0VBQTZEO0FBQzdELGdFQUE0RDtBQUM1RCw4REFBMEQ7QUFDMUQsOERBQTBEO0FBQzFELGdEQUFnRDtBQUNoRCw4RUFBc0Q7QUFFdEQsTUFBTSxpQkFBaUI7SUFDckIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3BELElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGdDQUFjLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZFLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQ1AsSUFBQSxvQkFBVSxFQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUNuRSxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLGlDQUFpQyxDQUFDLENBQUMsQ0FBQzthQUNoRTtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7SUFD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LEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IGluaXRpYWwgfSBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YWJhc2UvQXBwRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuLi9tb2RlbC9Db21tZW50XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWwvUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi4vbW9kZWwvUmF0aW5nXCI7XHJcbmltcG9ydCB7IGNvbW1lbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvY29tbWVudC5zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBwcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlL3Byb2R1Y3Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyByYXRpbmdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcmF0aW5nLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgcmV2aWV3U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlL3Jldmlldy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGVzR2V0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XHJcbiAgYXN5bmMgZ2V0UHJvZHVjc3RCeUZpbHRlcihyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldEFsbFByb2R1Y3N0QnlGaWx0ZXIocmVxLmJvZHkpO1xyXG4gICAgICBpZiAocHJvZHVjdHMpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChcclxuICAgICAgICAgIHJlc3BGb3JtYXQocHJvZHVjdHMsIGAke3Byb2R1Y3RzPy5sZW5ndGh9IHByb2R1Y3QocykgZm91bmRgLCB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIkdldCBwcm9kdWN0IEJ5IEZpbHRlciBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInByb2R1Y3QgZ2V0QWxsIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdEJ5QWxpYXNOYW1lcyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldEFsbEJ5QWxpYXNOYW1lcyhyZXEuYm9keSk7XHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gcHJvZHVjdChzKSBmb3VuZGAsIHRydWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInByb2R1Y3QgZ2V0QWxsIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuICBhc3luYyBnZXRQcm9kdWN0c1JhbmdlSXRlbXMocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGxCeVByaWNlUmFuZ2UocmVxLnF1ZXJ5KTtcclxuICAgICAgaWYgKHByb2R1Y3RzKSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQoXHJcbiAgICAgICAgICByZXNwRm9ybWF0KHByb2R1Y3RzLCBgJHtwcm9kdWN0cz8ubGVuZ3RofSBwcm9kdWN0KHMpIGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicHJvZHVjdCBnZXRBbGwgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0c1NpdGVNYXBJdGVtcyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdldGluZyAgcHJvZHVjdHMgc2l0ZW1hcCAuLi4gXCIpO1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RTaXRlTWFwSXRlbXMocmVxLnF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIE9wdGlvbnMgZm91bmRgLCB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0cywgYFNlYXJjaCBPcHRpb25zIG5vdCBmb3VuZGApKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTZWFyY2ggT3B0aW9ucyBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBPcHRpb25zIGZvdW5kIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFzeW5jIGdldFByb2R1Y3RzQnlTZWFyY2gocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZXRpbmcgU2VhcmNoIHByb2R1Y3RzIC4uLiBcIik7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdFNlYXJjaE9wdGlvbnMoKTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIE9wdGlvbnMgZm91bmRgLCB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0cywgYFNlYXJjaCBPcHRpb25zIG5vdCBmb3VuZGApKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTZWFyY2ggT3B0aW9ucyBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBPcHRpb25zIGZvdW5kIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0c0J5UXVlcnlTZWFyY2gocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgXCJHZXRpbmcgU2VhcmNoIFF1ZXJ5IHByb2R1Y3RzIC4uLiBRdWVyeSwgXCIsXHJcbiAgICAgICAgcmVxPy5wYXJhbXM/Lm5hbWVcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0U2VhcmNoUXVlcnkoXHJcbiAgICAgICAgcmVxPy5wYXJhbXM/Lm5hbWVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIFF1ZXJ5IGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdHMsIGBTZWFyY2ggUXVlcnkgbm90IGZvdW5kYCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlNlYXJjaCBRdWVyeSBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBRdWVyeSBmb3VuZCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlNb3N0VmlzaXRlZFByb2R1Y3RzKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBsaW1pdCA9IGVzR2V0TnVtYmVyKHJlcS5xdWVyeS5zaXplKTtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRNb3N0VmlzaXRlZFByb2R1Y3RzKGxpbWl0KTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdHMsIFwiVmlzaXRlZCBwcm9kdWN0J3Mgbm90IGZvdW5kXCIpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiVmlzaXRlZCBwcm9kdWN0cyBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlZpc2l0ZWQgcHJvZHVjdCdzIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0QnlQcmljZVJhbmdlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgY291bnQsIGNhdCwgc3RhcnQsIGVuZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBsZXQgbWluUHJpY2UgPSBlc0dldE51bWJlcihzdGFydCk7XHJcbiAgICAgIGxldCBtYXhQcmljZSA9IGVzR2V0TnVtYmVyKGVuZCk7XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RCeVByaWNlUmFuZ2UoXHJcbiAgICAgICAgY2F0LFxyXG4gICAgICAgIG1pblByaWNlLFxyXG4gICAgICAgIG1heFByaWNlXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAocHJvZHVjdHMpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChcclxuICAgICAgICAgIHJlc3BGb3JtYXQocHJvZHVjdHMsIGAke3Byb2R1Y3RzLmxlbmd0aH0gcHJvZHVjdCdzIGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJWaXNpdGVkIHByb2R1Y3QncyBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlZpc2l0ZWQgcHJvZHVjdHMgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJWaXNpdGVkIHByb2R1Y3QncyBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BEYXRhID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0QWxsKHJlcS5xdWVyeSk7XHJcbiAgICAgIGlmIChyZXNwRGF0YSkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChcclxuICAgICAgICAgICAgcmVzcERhdGEsXHJcbiAgICAgICAgICAgIGAke3Jlc3BEYXRhPy5wcm9kdWN0cz8ubGVuZ3RofSBwcm9kdWN0KHMpIGZvdW5kYCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5U2luZ2xlUGFnZURhdGEocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdFJlc3AgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGlhc05hbWUocmVxLnBhcmFtcz8ubmFtZSk7XHJcbiAgICAgIGlmIChwcm9kdWN0UmVzcCkge1xyXG4gICAgICAgIHByb2R1Y3RTZXJ2aWNlLnNhdmVWaXNpdENvdW50KHByb2R1Y3RSZXNwPy5pZCwgcHJvZHVjdFJlc3A/LmFsaWFzTmFtZSk7XHJcbiAgICAgICAgY29uc3QgcmVjb21tZW5kZWQgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRSZWNvbW1lbmRlZFByb2R1Y3RzKFxyXG4gICAgICAgICAgcHJvZHVjdFJlc3BcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IG5ld0Fycml2YWwgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXROZXdBcnJpdmFsUHJvZHVjdHMoXHJcbiAgICAgICAgICBwcm9kdWN0UmVzcD8uY2F0ZWdvcnk/LmtleVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgbW9zdFZpc2l0ZWQgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRNb3N0VmlzaXRlZFByb2R1Y3RzKDgpO1xyXG5cclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChcclxuICAgICAgICAgIHJlc3BGb3JtYXQoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBwcm9kdWN0OiBwcm9kdWN0UmVzcCxcclxuICAgICAgICAgICAgICByZWNvbW1lbmRlZCxcclxuICAgICAgICAgICAgICB2aXNpdGVkczogbW9zdFZpc2l0ZWQsXHJcbiAgICAgICAgICAgICAgbmV3QXJyaXZhbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYCBwcm9kdWN0IGZvdW5kYCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJHZXQgcHJvZHVjdCBCeSBBbGlhcyBOYW1lIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlBbGlhc05hbWUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdFJlc3AgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGlhc05hbWUocmVxLnBhcmFtcz8ubmFtZSk7XHJcbiAgICAgIGlmIChwcm9kdWN0UmVzcCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdFJlc3AsIGAgcHJvZHVjdCBmb3VuZGAsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkdldCBwcm9kdWN0IEJ5IEFsaWFzIE5hbWUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocmVxPy5wYXJhbXM/LmlkKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHByb2R1Y3QsIFwicHJvZHVjdCBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0LCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLnNhdmUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgcmVzcC5zdGF0dXMoMjAxKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdCwgXCJwcm9kdWN0IFNhdmUgT3IgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IEFkZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIiBwcm9kdWN0IEFkZCBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1cGRhdGUgPSBhd2FpdCBwcm9kdWN0U2VydmljZS51cGRhdGUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInByb2R1Y3QgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInByb2R1Y3QgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZGVsZXRlKGludElkKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGV0ZVJlc3ApIHtcclxuICAgICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChkZWxldGVSZXNwLCBcInByb2R1Y3QgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdEFsbFJldmlldyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEJ5QWxseU5hbWUoaWQpO1xyXG4gICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgIGNvbnN0IHJldmlld3MgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEFsbFJldmlld3NCeVByb2R1Y3QocHJvZHVjdC5pZCk7XHJcblxyXG4gICAgICAgIHJlc3BcclxuICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgLnNlbmQocmVzcEZvcm1hdChyZXZpZXdzLCBcIlByb2R1Y3QgcmV2aWV3cyBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUHJvZHVjdCByZXZpZXdzIGVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3BcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCByZXZpZXdzIG5vdCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkUHJvZHVjdFJldmlldyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGNvbm5lY3QgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEJ5QWxseU5hbWUoaWQpO1xyXG4gICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgIGNvbnN0IHJldmlld3MgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEFkZFJldmlld3NCeVByb2R1Y3QoXHJcbiAgICAgICAgICBwcm9kdWN0LFxyXG4gICAgICAgICAgY29ubmVjdFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCkuc2VuZChyZXNwRm9ybWF0KHJldmlld3MsIFwiQWRkIFByb2R1Y3QgcmV2aWV3XCIsIHRydWUpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IHJldmlld3MgZXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcFxyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJBZGQgUHJvZHVjdCByZXZpZXcgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0Q29tbWVudChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkLCBjaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGludENpZCA9IE51bWJlcihjaWQpO1xyXG4gICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgY29tbWVudFNlcnZpY2UuZ2V0QnlJZChpbnRDaWQpO1xyXG4gICAgICByZXNwXHJcbiAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgLnNlbmQocmVzcEZvcm1hdChjb21tZW50LCBcIlByb2R1Y3QgQ29tbWVudCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmVzcFxyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJQcm9kdWN0IENvbW1lbnQgbm90IGZvdW5kXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFzeW5jIGdldFByb2R1Y3RBbGxDb21tZW50KHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGludENpZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgY29tbWVudFNlcnZpY2UuZ2V0Q29tbWVudEJ5UHJvZHVjdEFzVHJlZShpbnRDaWQpO1xyXG4gICAgICByZXNwXHJcbiAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgLnNlbmQocmVzcEZvcm1hdChjb21tZW50cywgXCJQcm9kdWN0IENvbW1lbnRzIGZvdW5kXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJlc3BcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBDb21tZW50IG5vdCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkUHJvZHVjdENvbW1lbnQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBjb250ZW50LCBwYXJlbnQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RCeUFsbHlOYW1lKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICBjb25zdCBpbml0Q29tbWVudCA9IG5ldyBDb21tZW50KCk7XHJcbiAgICAgIGluaXRDb21tZW50LmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICBpZiAocHJvZHVjdCAhPSBudWxsICYmIHByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGluaXRDb21tZW50LnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyZW50ICE9PSBudWxsICYmIHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaW5pdENvbW1lbnQucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuYWRkQ29tbWVudChpbml0Q29tbWVudCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMSkuc2VuZChyZXNwRm9ybWF0KGNvbW1lbnQsIFwiUHJvZHVjdCBDb21tZW50IGFkZCBcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IENvbW1lbnQgYWRkIGVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiQ29tbWVudCBBZGQgZmFpbGVkXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vUHJvZHVjdCBSYXRpbmdcclxuICBhc3luYyBhZGRQcm9kdWN0UmF0aW5nKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGlJZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlJZCk7XHJcbiAgICAgIHJlcS5ib2R5LnByb2R1Y3QgPSBwcm9kdWN0O1xyXG5cclxuICAgICAgY29uc3QgcmF0aW5nID0gYXdhaXQgcmF0aW5nU2VydmljZS5hZGRSYXRpbmdCeVByb2R1Y3QocmVxLmJvZHkpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDEpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyYXRpbmcsIFwiUHJvZHVjdCBSYXRpbmcgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJBZGQgUHJvZHVjdCBSYXRpbmcgUHJvZHVjdCBjb250cm9sbGVyIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0UmF0aW5nKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGlJZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlJZCk7XHJcbiAgICAgIGlmIChwcm9kdWN0ICE9PSBudWxsICYmIHByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGF3YWl0IHJhdGluZ1NlcnZpY2UuZ2V0QnlQcm9kdWN0SWQocHJvZHVjdC5pZCk7XHJcblxyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nLCBcIlByb2R1Y3QgUmF0aW5nIGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBub3QgZm91bmRcIiwgZmFsc2UpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJBZGQgUHJvZHVjdCBSYXRpbmcgUHJvZHVjdCBjb250cm9sbGVyIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBSYXRpbmcgbm90IGZvdW5kXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZHVjdENvbnRyb2xsZXIgPSBuZXcgUHJvZHVjdENvbnRyb2xsZXIoKTtcclxuIl19