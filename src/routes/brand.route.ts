import express from "express";
import { brandController } from "../controller/brand.controller";

const brandRoute = express.Router();

brandRoute.get("/", brandController.getAll);
brandRoute.get("/products/", brandController.getAllProductsByBrand);
brandRoute.get("/name/:name", brandController.getByBrandName);

brandRoute.get(`/:id`, brandController.getById);

brandRoute.post("/", brandController.add);

brandRoute.put("/", brandController.update);

brandRoute.delete(`/`, brandController.delete);

export { brandRoute };
