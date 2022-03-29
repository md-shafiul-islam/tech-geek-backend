import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { News } from "../model/News";
import { newsService } from "../service/news.service";
import respFormat from "../utils/response/respFormat";

class NewController {
  async getAll(req: Request, resp: Response) {

    
    const news = await newsService.getAll();
    if (news) {
      resp.status(200);
      resp.send(respFormat(news, "news found", true));
    } else {
      resp.status(202);
      resp.send(respFormat(news, "news not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);
    const news = await newsService.getById(id);

    if (news) {
      resp.status(200);
      resp.send(respFormat(news, "news Found", true));
    } else {
      resp.status(202);
      resp.send(respFormat(news, "news not Found by given id", true));
    }
  }

  async add(req: Request, resp: Response) {

    try {
      const nNews = await newsService.save(req.body);

      resp.status(201);
      resp.send(respFormat(nNews, "News Save Or Added", true));
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "News Added failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    
    const updateNews = await newsService.update(req.body);

    if (updateNews !== undefined && updateNews !== null) {
      resp.status(202);
      resp.send(respFormat(updateNews, "News updated", true));
    } else {
      resp.status(202);
      resp.send(respFormat(null, "News update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;
    const intId = parseInt(id);

    if (intId > 0) {
      const deleteResp = await newsService.delete(intId);

      if (deleteResp) {
        resp.status(202);
        resp.send(respFormat(deleteResp, "news deleted ", true));
      }
    }
    resp.status(202);
    resp.send(respFormat(null, "news delete failed", false));
  }
}

export const newsController = new NewController();
