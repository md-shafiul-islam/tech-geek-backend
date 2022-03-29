import express from "express";
import { userController } from "../controller/user.controller";

const userRoute = express.Router();

userRoute.get("/", userController.getAll);

userRoute.get(`/:id`, userController.getById);

userRoute.post("/", userController.add);

userRoute.put("/", userController.update);

userRoute.delete(`/:id`, userController.delete);

export { userRoute };
