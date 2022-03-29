import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { SpecificationType } from "../model/SpecificationType";
import { specificationTypeService } from "../service/spectype.service";
import respFormat from "../utils/response/respFormat";

class SpecificationTypeController {
  async getAll(req: Request, resp: Response) {
    try {
      const specType = await specificationTypeService.getAll();
      if (specType) {
        resp.status(200);
        resp.send(respFormat(specType, "specType found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specType, "specType not found"));
      }
    } catch (error) {
      apiWriteLog.error("specType getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specType not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);

    try {
      const specType = await specificationTypeService.getById(id);
      if (specType) {
        resp.status(200);
        resp.send(respFormat(specType, "specType found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specType, "specType not found"));
      }
    } catch (error) {
      apiWriteLog.error("specType getById Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specType not found"));
    }
  }

  async add(req: Request, resp: Response) {
    const { name, value } = req.body;

    try {
      const specType = await specificationTypeService.save({
        name,
        value,
      });

      resp.status(201);
      resp.send(respFormat(specType, " Save Or Added", true));
    } catch (error) {
      apiWriteLog.error("specType Add Error ", error);
      resp.status(202);
      resp.send(respFormat(null, " specType Add failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    const { id, name, value } = req.body;

    try {
      const intId = parseInt(id);

      const specType: Partial<SpecificationType> = {
        id: intId,
        name,
        value,
      };
      const update = await specificationTypeService.update(specType);

      if (update !== undefined && update !== null) {
        resp.status(202);
        resp.send(respFormat(update, "specType updated", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "specType update failed", false));
      }
    } catch (error) {
      apiWriteLog.error("specType Update Error, ", error);
      resp.status(202);
      resp.send(respFormat(null, "specType update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    try {
      const intId = parseInt(id);
      if (intId > 0) {
        const deleteResp = await specificationTypeService.delete(intId);

        if (deleteResp) {
          resp.status(202);
          resp.send(respFormat(deleteResp, "specType deleted ", true));
        }
      }
    } catch (error) {
      apiWriteLog.error("specType Delete Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specType delete failed", false));
    }
  }
}

export const specificationTypeController = new SpecificationTypeController();
