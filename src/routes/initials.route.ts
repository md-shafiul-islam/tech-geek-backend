import express from "express";
import { initialController } from "../controller/initial.controller";

const initialsRoute = express.Router();

initialsRoute.get("/file-converters", initialController.convertFile);
initialsRoute.post("/products", initialController.saveAllProduct);

export { initialsRoute };
