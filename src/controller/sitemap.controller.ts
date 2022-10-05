import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { siteMapService } from "../service/sitemap.service";
import respFormat from "../utils/response/respFormat";

class SiteMapController {
  async getAllItemsCount(req: Request, resp: Response) {
    try {
      const siteMapResp = await siteMapService.getAllItemsCount();

      if (siteMapResp) {
        resp.status(200);
        resp.send(respFormat(siteMapResp, "Site Map Items Found", true));
      } else {
        resp.status(200);
        resp.send(respFormat(siteMapResp, "Site Map Items Not Found", true));
      }
    } catch (error) {
      apiWriteLog.error("Site Map Items Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Site Map Items failed", false));
    }
  }
}

export const siteMapController = new SiteMapController();
