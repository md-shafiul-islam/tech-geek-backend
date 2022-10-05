import express from "express";
import { siteMapController } from "../controller/sitemap.controller";

const siteMapRoute = express.Router();

siteMapRoute.get("/", siteMapController.getAllItemsCount);

export { siteMapRoute };
