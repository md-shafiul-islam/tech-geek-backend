import express from "express";
import { userController } from "../controller/user.controller";

const userRoute = express.Router();

userRoute.get("/", userController.getUsers);

userRoute.get(`/:id`, userController.getUserById);

userRoute.post("/", userController.addUser);

userRoute.put("/", userController.updateUser);

userRoute.delete(`/:id`, userController.deleteUser);

export { userRoute };
