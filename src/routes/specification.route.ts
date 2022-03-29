import express from "express";
import { specificationController } from "../controller/specification.controller";

const specificationRoute = express.Router();

specificationRoute.get("/", specificationController.getAll);

specificationRoute.get(`/:id`, specificationController.getById);

specificationRoute.post("/", specificationController.add);

specificationRoute.put("/", specificationController.update);

specificationRoute.delete(`/:id`, specificationController.delete);

export { specificationRoute };
