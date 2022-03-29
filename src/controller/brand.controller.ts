import { Request, Response } from "express";
import { apiWriteLog } from "../logger/writeLog";
import { Brand } from "../model/Brand";
import { brandService } from "../service/brand.service";
import { esIsEmpty } from "../utils/esHelper";
import respFormat from "../utils/response/respFormat";

class BrandController {
  async getAll(req: Request, resp: Response) {
    apiWriteLog.info("Test writ file", { test: "Object is write" });
    const brands = await brandService.getAllBrand();
    if (brands) {
      resp.status(200);
      resp.send(respFormat(brands, "Brand found", true));
    } else {
      resp.status(202);
      resp.send(respFormat(brands, "Brand not found"));
    }
  }

  async getById(req: Request, resp: Response) {
    const id = parseInt(req?.params?.id);
    const brand = await brandService.getBrandById(id);

    if (brand) {
      resp.status(200);
      resp.send(respFormat(brand, "Brand Found", true));
    } else {
      resp.status(202);
      resp.send(respFormat(brand, "Brand not Found by given id", true));
    }
  }

  async add(req: Request, resp: Response) {
    console.log("Brand Add Request Body ", req.body);

    const brandReq: Partial<Brand> = req.body;

    console.log("After Partial Brand Add Request Body ", brandReq);

    const { name, description, tagLine, logoUrl, website } = req.body;

    try {
      const nBrand = await brandService.save({
        name,
        description,
        tagLine,
        logoUrl,
        website,
      });

      console.log("Brand added Response ", nBrand);

      resp.status(201);
      resp.send(respFormat(nBrand, "Brand Save Or Added", true));
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Brand Added failed", false));
    }
  }

  async update(req: Request, resp: Response) {
    const { id, name, description, tagLine, logoUrl, website } = req.body;
    const brand: Brand = {
      id,
      name,
      description,
      tagLine,
      logoUrl,
      website,
      products: [],
      news: [],
    };
    const updateBrand = await brandService.updateBrand(brand);

    if (updateBrand !== undefined && updateBrand !== null) {
      resp.status(202);
      resp.send(respFormat(updateBrand, "Brand updated", true));
    } else {
      resp.status(202);
      resp.send(respFormat(null, "Brand update failed", false));
    }
  }

  async delete(req: Request, resp: Response) {
    const { id } = req.params;
    const intId = parseInt(id);

    if (intId > 0) {
      const deleteResp = await brandService.deleteBrand(intId);

      if (deleteResp) {
        resp.status(202);
        resp.send(respFormat(deleteResp, "Brand deleted ", true));
      }
    }
    resp.status(202);
    resp.send(respFormat(null, "Brand delete failed", false));
  }
}

export const brandController = new BrandController();
