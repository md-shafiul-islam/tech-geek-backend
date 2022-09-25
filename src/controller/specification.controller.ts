import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { Specification } from "../model/Specification";
import { specificationService } from "../service/specification.service";
import respFormat from "../utils/response/respFormat";

class SpecificationController {
  async getAll(req: Request, resp: Response) {
    try {
      const specifications = await specificationService.getAll();
      if (specifications) {
        resp.status(200);
        resp.send(respFormat(specifications, "specification found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specifications, "specification not found"));
      }
    } catch (error) {
      apiWriteLog.error("specification getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specification not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);

    try {
      const specification = await specificationService.getById(id);
      if (specification) {
        resp.status(200);
        resp.send(respFormat(specification, "specification found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(specification, "specification not found"));
      }
    } catch (error) {
      apiWriteLog.error("specification getById Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specification not found"));
    }
  }

  async add(req: Request, resp: Response) {
    const { specType, key, value, description, product, isFeature } = req.body;

    try {
      const specification = await specificationService.save({
        key,
        value,
        description,
        product,
        isFeature,
      });

      resp.status(201);
      resp.send(respFormat(specification, " Save Or Added", true));
    } catch (error) {
      apiWriteLog.error("specification Add Error ", error);
      resp.status(202);
      resp.send(respFormat(null, " specification Add failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    const { specType, key, value, description, product, isFeature, id } =
      req.body;

    try {
      const intId = parseInt(id);

      const specification: Partial<Specification> = {
        id: intId,
        key,
        value,
        description,
        product,
        isFeature,
      };
      const update = await specificationService.update(specification);

      if (update !== undefined && update !== null) {
        resp.status(202);
        resp.send(respFormat(update, "specification updated", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "specification update failed", false));
      }
    } catch (error) {
      apiWriteLog.error("specification Update Error, ", error);
      resp.status(202);
      resp.send(respFormat(null, "specification update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    try {
      const intId = parseInt(id);
      if (intId > 0) {
        const deleteResp = await specificationService.delete(intId);

        if (deleteResp) {
          resp.status(202);
          resp.send(respFormat(deleteResp, "specification deleted ", true));
        }
      }
    } catch (error) {
      apiWriteLog.error("specification Delete Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "specification delete failed", false));
    }
  }
}

export const specificationController = new SpecificationController();
