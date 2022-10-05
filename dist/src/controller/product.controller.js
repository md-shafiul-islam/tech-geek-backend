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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvcHJvZHVjdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLGlEQUFpRDtBQUNqRCw4Q0FBMkM7QUFHM0Msa0VBQTZEO0FBQzdELGdFQUE0RDtBQUM1RCw4REFBMEQ7QUFDMUQsOERBQTBEO0FBQzFELGdEQUFnRDtBQUNoRCw4RUFBc0Q7QUFFdEQsTUFBTSxpQkFBaUI7SUFDckIsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3RELElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGdDQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLElBQUksUUFBUSxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQ1AsSUFBQSxvQkFBVSxFQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUNuRSxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQzthQUNsRDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7SUFD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LElBQUk7WUFDRixNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUMxQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDN0MsTUFBTSxNQUFNLEdBQUcsTUFBTSw4QkFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRTlELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgaW5pdGlhbCB9IGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4uL21vZGVsL0NvbW1lbnRcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi9tb2RlbC9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IFJhdGluZyB9IGZyb20gXCIuLi9tb2RlbC9SYXRpbmdcIjtcclxuaW1wb3J0IHsgY29tbWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9jb21tZW50LnNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IHByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcHJvZHVjdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHJhdGluZ1NlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9yYXRpbmcuc2VydmljZVwiO1xyXG5pbXBvcnQgeyByZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcmV2aWV3LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgZXNHZXROdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuaW1wb3J0IHJlc3BGb3JtYXQgZnJvbSBcIi4uL3V0aWxzL3Jlc3BvbnNlL3Jlc3BGb3JtYXRcIjtcclxuXHJcbmNsYXNzIFByb2R1Y3RDb250cm9sbGVyIHtcclxuICBhc3luYyBnZXRQcm9kdWN0c1JhbmdlSXRlbXMocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGxCeVByaWNlUmFuZ2UocmVxLnF1ZXJ5KTtcclxuICAgICAgaWYgKHByb2R1Y3RzKSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQoXHJcbiAgICAgICAgICByZXNwRm9ybWF0KHByb2R1Y3RzLCBgJHtwcm9kdWN0cz8ubGVuZ3RofSBwcm9kdWN0KHMpIGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicHJvZHVjdCBnZXRBbGwgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0c1NpdGVNYXBJdGVtcyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkdldGluZyAgcHJvZHVjdHMgc2l0ZW1hcCAuLi4gXCIpO1xyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RTaXRlTWFwSXRlbXMocmVxLnF1ZXJ5KTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIE9wdGlvbnMgZm91bmRgLCB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0cywgYFNlYXJjaCBPcHRpb25zIG5vdCBmb3VuZGApKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTZWFyY2ggT3B0aW9ucyBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBPcHRpb25zIGZvdW5kIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFzeW5jIGdldFByb2R1Y3RzQnlTZWFyY2gocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZXRpbmcgU2VhcmNoIHByb2R1Y3RzIC4uLiBcIik7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdFNlYXJjaE9wdGlvbnMoKTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIE9wdGlvbnMgZm91bmRgLCB0cnVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0cywgYFNlYXJjaCBPcHRpb25zIG5vdCBmb3VuZGApKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTZWFyY2ggT3B0aW9ucyBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBPcHRpb25zIGZvdW5kIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0c0J5UXVlcnlTZWFyY2gocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZXRpbmcgU2VhcmNoIFF1ZXJ5IHByb2R1Y3RzIC4uLiBRdWVyeSwgXCIsIHJlcT8ucGFyYW1zPy5uYW1lKTtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0U2VhcmNoUXVlcnkoXHJcbiAgICAgICAgcmVxPy5wYXJhbXM/Lm5hbWVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYCR7cHJvZHVjdHM/Lmxlbmd0aH0gU2VhcmNoIFF1ZXJ5IGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdHMsIGBTZWFyY2ggUXVlcnkgbm90IGZvdW5kYCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlNlYXJjaCBRdWVyeSBmb3VuZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNlYXJjaCBRdWVyeSBmb3VuZCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlNb3N0VmlzaXRlZFByb2R1Y3RzKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBsaW1pdCA9IGVzR2V0TnVtYmVyKHJlcS5xdWVyeS5zaXplKTtcclxuICAgICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRNb3N0VmlzaXRlZFByb2R1Y3RzKGxpbWl0KTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdHMsIFwiVmlzaXRlZCBwcm9kdWN0J3Mgbm90IGZvdW5kXCIpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiVmlzaXRlZCBwcm9kdWN0cyBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlZpc2l0ZWQgcHJvZHVjdCdzIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0QnlQcmljZVJhbmdlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgY291bnQsIGNhdCwgc3RhcnQsIGVuZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBsZXQgbWluUHJpY2UgPSBlc0dldE51bWJlcihzdGFydCk7XHJcbiAgICAgIGxldCBtYXhQcmljZSA9IGVzR2V0TnVtYmVyKGVuZCk7XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RCeVByaWNlUmFuZ2UoXHJcbiAgICAgICAgY2F0LFxyXG4gICAgICAgIG1pblByaWNlLFxyXG4gICAgICAgIG1heFByaWNlXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAocHJvZHVjdHMpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChcclxuICAgICAgICAgIHJlc3BGb3JtYXQocHJvZHVjdHMsIGAke3Byb2R1Y3RzLmxlbmd0aH0gcHJvZHVjdCdzIGZvdW5kYCwgdHJ1ZSlcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJWaXNpdGVkIHByb2R1Y3QncyBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlZpc2l0ZWQgcHJvZHVjdHMgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJWaXNpdGVkIHByb2R1Y3QncyBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BEYXRhID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0QWxsKHJlcS5xdWVyeSk7XHJcbiAgICAgIGlmIChyZXNwRGF0YSkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgcmVzcEZvcm1hdChcclxuICAgICAgICAgICAgcmVzcERhdGEsXHJcbiAgICAgICAgICAgIGAke3Jlc3BEYXRhPy5wcm9kdWN0cz8ubGVuZ3RofSBwcm9kdWN0KHMpIGZvdW5kYCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5U2luZ2xlUGFnZURhdGEocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdFJlc3AgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGlhc05hbWUocmVxLnBhcmFtcz8ubmFtZSk7XHJcbiAgICAgIGlmIChwcm9kdWN0UmVzcCkge1xyXG4gICAgICAgIHByb2R1Y3RTZXJ2aWNlLnNhdmVWaXNpdENvdW50KHByb2R1Y3RSZXNwPy5pZCwgcHJvZHVjdFJlc3A/LmFsaWFzTmFtZSk7XHJcbiAgICAgICAgY29uc3QgcmVjb21tZW5kZWQgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRSZWNvbW1lbmRlZFByb2R1Y3RzKFxyXG4gICAgICAgICAgcHJvZHVjdFJlc3BcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IG5ld0Fycml2YWwgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXROZXdBcnJpdmFsUHJvZHVjdHMoXHJcbiAgICAgICAgICBwcm9kdWN0UmVzcD8uY2F0ZWdvcnk/LmtleVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgbW9zdFZpc2l0ZWQgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRNb3N0VmlzaXRlZFByb2R1Y3RzKDgpO1xyXG5cclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChcclxuICAgICAgICAgIHJlc3BGb3JtYXQoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBwcm9kdWN0OiBwcm9kdWN0UmVzcCxcclxuICAgICAgICAgICAgICByZWNvbW1lbmRlZCxcclxuICAgICAgICAgICAgICB2aXNpdGVkczogbW9zdFZpc2l0ZWQsXHJcbiAgICAgICAgICAgICAgbmV3QXJyaXZhbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYCBwcm9kdWN0IGZvdW5kYCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJHZXQgcHJvZHVjdCBCeSBBbGlhcyBOYW1lIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlBbGlhc05hbWUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdFJlc3AgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRBbGlhc05hbWUocmVxLnBhcmFtcz8ubmFtZSk7XHJcbiAgICAgIGlmIChwcm9kdWN0UmVzcCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdFJlc3AsIGAgcHJvZHVjdCBmb3VuZGAsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicHJvZHVjdCBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkdldCBwcm9kdWN0IEJ5IEFsaWFzIE5hbWUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocmVxPy5wYXJhbXM/LmlkKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHByb2R1Y3QsIFwicHJvZHVjdCBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwcm9kdWN0LCBcInByb2R1Y3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwcm9kdWN0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLnNhdmUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgcmVzcC5zdGF0dXMoMjAxKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocHJvZHVjdCwgXCJwcm9kdWN0IFNhdmUgT3IgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IEFkZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIiBwcm9kdWN0IEFkZCBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1cGRhdGUgPSBhd2FpdCBwcm9kdWN0U2VydmljZS51cGRhdGUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInByb2R1Y3QgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInByb2R1Y3QgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZGVsZXRlKGludElkKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGV0ZVJlc3ApIHtcclxuICAgICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChkZWxldGVSZXNwLCBcInByb2R1Y3QgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwcm9kdWN0IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInByb2R1Y3QgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdEFsbFJldmlldyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEJ5QWxseU5hbWUoaWQpO1xyXG4gICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgIGNvbnN0IHJldmlld3MgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEFsbFJldmlld3NCeVByb2R1Y3QocHJvZHVjdC5pZCk7XHJcblxyXG4gICAgICAgIHJlc3BcclxuICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgLnNlbmQocmVzcEZvcm1hdChyZXZpZXdzLCBcIlByb2R1Y3QgcmV2aWV3cyBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUHJvZHVjdCByZXZpZXdzIGVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3BcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCByZXZpZXdzIG5vdCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkUHJvZHVjdFJldmlldyhyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGNvbm5lY3QgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdEJ5QWxseU5hbWUoaWQpO1xyXG4gICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgIGNvbnN0IHJldmlld3MgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEFkZFJldmlld3NCeVByb2R1Y3QoXHJcbiAgICAgICAgICBwcm9kdWN0LFxyXG4gICAgICAgICAgY29ubmVjdFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCkuc2VuZChyZXNwRm9ybWF0KHJldmlld3MsIFwiQWRkIFByb2R1Y3QgcmV2aWV3XCIsIHRydWUpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IHJldmlld3MgZXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcFxyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJBZGQgUHJvZHVjdCByZXZpZXcgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0Q29tbWVudChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkLCBjaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGludENpZCA9IE51bWJlcihjaWQpO1xyXG4gICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgY29tbWVudFNlcnZpY2UuZ2V0QnlJZChpbnRDaWQpO1xyXG4gICAgICByZXNwXHJcbiAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgLnNlbmQocmVzcEZvcm1hdChjb21tZW50LCBcIlByb2R1Y3QgQ29tbWVudCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmVzcFxyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJQcm9kdWN0IENvbW1lbnQgbm90IGZvdW5kXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFzeW5jIGdldFByb2R1Y3RBbGxDb21tZW50KHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGludENpZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgY29tbWVudFNlcnZpY2UuZ2V0Q29tbWVudEJ5UHJvZHVjdEFzVHJlZShpbnRDaWQpO1xyXG4gICAgICByZXNwXHJcbiAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgLnNlbmQocmVzcEZvcm1hdChjb21tZW50cywgXCJQcm9kdWN0IENvbW1lbnRzIGZvdW5kXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJlc3BcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBDb21tZW50IG5vdCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkUHJvZHVjdENvbW1lbnQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBjb250ZW50LCBwYXJlbnQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RCeUFsbHlOYW1lKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICBjb25zdCBpbml0Q29tbWVudCA9IG5ldyBDb21tZW50KCk7XHJcbiAgICAgIGluaXRDb21tZW50LmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICBpZiAocHJvZHVjdCAhPSBudWxsICYmIHByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGluaXRDb21tZW50LnByb2R1Y3QgPSBwcm9kdWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyZW50ICE9PSBudWxsICYmIHBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaW5pdENvbW1lbnQucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgcHJvZHVjdFNlcnZpY2UuYWRkQ29tbWVudChpbml0Q29tbWVudCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMSkuc2VuZChyZXNwRm9ybWF0KGNvbW1lbnQsIFwiUHJvZHVjdCBDb21tZW50IGFkZCBcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IENvbW1lbnQgYWRkIGVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiQ29tbWVudCBBZGQgZmFpbGVkXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vUHJvZHVjdCBSYXRpbmdcclxuICBhc3luYyBhZGRQcm9kdWN0UmF0aW5nKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGlJZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlJZCk7XHJcbiAgICAgIHJlcS5ib2R5LnByb2R1Y3QgPSBwcm9kdWN0O1xyXG5cclxuICAgICAgY29uc3QgcmF0aW5nID0gYXdhaXQgcmF0aW5nU2VydmljZS5hZGRSYXRpbmdCeVByb2R1Y3QocmVxLmJvZHkpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDEpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyYXRpbmcsIFwiUHJvZHVjdCBSYXRpbmcgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJBZGQgUHJvZHVjdCBSYXRpbmcgUHJvZHVjdCBjb250cm9sbGVyIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQcm9kdWN0UmF0aW5nKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGlJZCA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5nZXRCeUlkKGlJZCk7XHJcbiAgICAgIGlmIChwcm9kdWN0ICE9PSBudWxsICYmIHByb2R1Y3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGF3YWl0IHJhdGluZ1NlcnZpY2UuZ2V0QnlQcm9kdWN0SWQocHJvZHVjdC5pZCk7XHJcblxyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nLCBcIlByb2R1Y3QgUmF0aW5nIGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBub3QgZm91bmRcIiwgZmFsc2UpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJBZGQgUHJvZHVjdCBSYXRpbmcgUHJvZHVjdCBjb250cm9sbGVyIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBSYXRpbmcgbm90IGZvdW5kXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZHVjdENvbnRyb2xsZXIgPSBuZXcgUHJvZHVjdENvbnRyb2xsZXIoKTtcclxuIl19