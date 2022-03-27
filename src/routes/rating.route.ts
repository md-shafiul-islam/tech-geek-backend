import express from "express";
import { ratingController } from "../controller/rating.controller";

const ratingRoute = express.Router();

ratingRoute.get("/", ratingController.getAll);

ratingRoute.get(`/:id`, ratingController.getById);

ratingRoute.post("/", ratingController.add);

ratingRoute.put("/", ratingController.update);

ratingRoute.delete(`/:id`, ratingController.delete);

export { ratingRoute };
