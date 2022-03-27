
import express from "express";
import { productController } from "../controller/product.controller";

const productRoute = express.Router();

productRoute.get("/", productController.getAll);

productRoute.get(`/:id`, productController.getById);

productRoute.post("/", productController.add);

productRoute.put("/", productController.update);

productRoute.delete(`/:id`, productController.delete);

export { productRoute };
