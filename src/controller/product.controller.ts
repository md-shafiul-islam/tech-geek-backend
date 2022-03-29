import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { Product } from "../model/Product";
import { productService } from "../service/product.service";
import respFormat from "../utils/response/respFormat";

class ProductController {
  async getAll(req: Request, resp: Response) {
    try {
      const product = await productService.getAll();
      if (product) {
        resp.status(200);
        resp.send(respFormat(product, "product found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("product getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);

    try {
      const product = await productService.getById(id);
      if (product) {
        resp.status(200);
        resp.send(respFormat(product, "product found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("product getById Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }

  async add(req: Request, resp: Response) {
    try {
      const {
        title,
        model,
        quantity,
        price,
        discountPrice,
        discountStatus,
        description,
        category,
        images,
        tags,
        metaDatas,
        brand,
        specifications,
      } = req.body;

      const product = await productService.save({
        title,
        model,
        quantity,
        price,
        discountPrice,
        discountStatus,
        description,
        category,
        images,
        tags,
        metaDatas,
        brand,
        specifications,
      });

      resp.status(201);
      resp.send(respFormat(product, "product Save Or Added", true));
    } catch (error) {
      apiWriteLog.error("product Add Error ", error);
      resp.status(202);
      resp.send(respFormat(null, " product Add failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    try {
      const update = await productService.update(req.body);

      if (update !== undefined && update !== null) {
        resp.status(202);
        resp.send(respFormat(update, "product updated", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product update failed", false));
      }
    } catch (error) {
      apiWriteLog.error("product Update Error, ", error);
      resp.status(202);
      resp.send(respFormat(null, "product update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;

    try {
      const intId = parseInt(id);
      if (intId > 0) {
        const deleteResp = await productService.delete(intId);

        if (deleteResp) {
          resp.status(202);
          resp.send(respFormat(deleteResp, "product deleted ", true));
        }
      }
    } catch (error) {
      apiWriteLog.error("product Delete Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product delete failed", false));
    }
  }
}

export const productController = new ProductController();
