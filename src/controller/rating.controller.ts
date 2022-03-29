import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { ratingService } from "../service/rating.service";
import respFormat from "../utils/response/respFormat";

class RatingController {
  async getAll(req: Request, resp: Response) {
    try {
      const rating = await ratingService.getAll();
      if (rating) {
        resp.status(200);
        resp.send(respFormat(rating, "rating found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(rating, "rating not found"));
      }
    } catch (error) {
      apiWriteLog.error("rating getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "rating not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);

    try {
      const rating = await ratingService.getById(id);
      if (rating) {
        resp.status(200);
        resp.send(respFormat(rating, "rating found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(rating, "rating not found"));
      }
    } catch (error) {
      apiWriteLog.error("rating getById Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "rating not found"));
    }
  }

  async add(req: Request, resp: Response) {

    try {
      const rating = await ratingService.save(req.body);

      resp.status(201);
      resp.send(respFormat(rating, " Save Or Added", true));
    } catch (error) {
      apiWriteLog.error("rating Add Error ", error);
      resp.status(202);
      resp.send(respFormat(null, " rating Add failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    try {

      const update = await ratingService.update(req.body);

      if (update !== undefined && update !== null) {
        resp.status(202);
        resp.send(respFormat(update, "rating updated", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "rating update failed", false));
      }
    } catch (error) {
      apiWriteLog.error("rating Update Error, ", error);
      resp.status(202);
      resp.send(respFormat(null, "rating update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    try {
      const intId = parseInt(id);
      if (intId > 0) {
        const deleteResp = await ratingService.delete(intId);

        if (deleteResp) {
          resp.status(202);
          resp.send(respFormat(deleteResp, "rating deleted ", true));
        }
      }
    } catch (error) {
      apiWriteLog.error("rating Delete Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "rating delete failed", false));
    }
  }
}

export const ratingController = new RatingController();
