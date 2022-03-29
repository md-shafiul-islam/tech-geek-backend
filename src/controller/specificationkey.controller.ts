import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { SpecKey } from "../model/SpecKey";
import { specKeyService } from "../service/speckey.service";
import respFormat from "../utils/response/respFormat";

class SpecificationKeyController {
  async getAll(req: Request, resp: Response) {
    try {
      const specKeys = await specKeyService.getAll();
      if (specKeys) {
        resp.status(200);
        resp.send(respFormat(specKeys, "SpecKeys found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specKeys, "SpecKeys not found"));
      }
    } catch (error) {
      apiWriteLog.error("SpecKeys getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "SpecKeys not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);

    try {
      const specKey = await specKeyService.getById(id);
      if (specKey) {
        resp.status(200);
        resp.send(respFormat(specKey, "SpecKey found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specKey, "SpecKey not found"));
      }
    } catch (error) {
      apiWriteLog.error("SpecKey getById Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "SpecKey not found"));
    }
  }

  async add(req: Request, resp: Response) {
    const { name, value } = req.body;

    try {
      const specKey = await specKeyService.save({
        name,
        value,
      });

      resp.status(201);
      resp.send(respFormat(specKey, " Save Or Added", true));
    } catch (error) {
      apiWriteLog.error("SpecKey Add Error ", error);
      resp.status(202);
      resp.send(respFormat(null, " SpecKey Add failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    const { id, name, value } = req.body;

    try {
      const intId = parseInt(id);

      const specKey: Partial<SpecKey> = {
        id: intId,
        name,
        value,
      };
      const update = await specKeyService.update(specKey);

      if (update !== undefined && update !== null) {
        resp.status(202);
        resp.send(respFormat(update, "SpecKey updated", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "SpecKey update failed", false));
      }
    } catch (error) {
      apiWriteLog.error("SpecKey Update Error, ", error);
      resp.status(202);
      resp.send(respFormat(null, "SpecKey update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    try {
      const intId = parseInt(id);
      if (intId > 0) {
        const deleteResp = await specKeyService.delete(intId);

        if (deleteResp) {
          resp.status(202);
          resp.send(respFormat(deleteResp, "SpecKey deleted ", true));
        }
      }
    } catch (error) {
      apiWriteLog.error("SpecKey Delete Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "SpecKey delete failed", false));
    }
  }
}

export const specificationKeyController = new SpecificationKeyController();
