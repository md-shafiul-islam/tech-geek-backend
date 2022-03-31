
import express from "express";
import { productController } from "../controller/product.controller";

const productRoute = express.Router();

productRoute.get("/", productController.getAll);

productRoute.get(`/:id`, productController.getById);

productRoute.post(`/:id/comments`, productController.addProductComment);
productRoute.get(`/:id/comments`, productController.getProductAllComment);
productRoute.get(`/:id/comments/:cid`, productController.getProductComment);

productRoute.post(`/:id/reviews`, productController.addProductReview);
productRoute.get(`/:id/reviews`, productController.getProductAllReview);


productRoute.post("/", productController.add);

productRoute.put("/", productController.update);

productRoute.delete(`/:id`, productController.delete);

export { productRoute };
