
import express from "express";
import { productController } from "../controller/product.controller";

const productRoute = express.Router();

productRoute.get("/", productController.getAll);

productRoute.get(`/:id`, productController.getById);
productRoute.get(`/als/p/:name`, productController.getByAliasName);
productRoute.get(`/als/sp/:name`, productController.getBySinglePageData);
productRoute.get(`/vs/p/`, productController.getByMostVisitedProducts);

productRoute.get(`/query/price-range`, productController.getProductByPriceRange);



productRoute.post(`/:id/comments`, productController.addProductComment);
productRoute.get(`/:id/comments`, productController.getProductAllComment);
productRoute.get(`/:id/comments/:cid`, productController.getProductComment);

productRoute.post(`/:id/reviews`, productController.addProductReview);
productRoute.get(`/:id/reviews`, productController.getProductAllReview);

productRoute.get(`/:id/rating`, productController.getProductRating);
productRoute.post(`/:id/rating`, productController.addProductRating);


productRoute.post("/", productController.add);

productRoute.put("/", productController.update);

productRoute.delete(`/:id`, productController.delete);

export { productRoute };
