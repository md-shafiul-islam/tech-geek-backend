import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const csvToJson = require("csvtojson");

const xlsxj = require("xlsx-to-json");

import { apiWriteLog } from "../logger/writeLog";
import { productMapper } from "../mapper/product.mapper";
import { Product } from "../model/Product";
import { productService } from "../service/product.service";
import respFormat from "../utils/response/respFormat";

class InitialController {
  // async getFileAndConvertToJSON() {
  //   const { loc, fileName } = req.query;

  //   console.log("Initial File Req QUery ", req.query);

  //   // const filePath = path.join(__dirname, `${sprt}..${sprt}..${sprt}`);

  //   // const csvToJsonFilePath = `${filePath}${fileName}`;
  //   // const csvToJsonFile = await csvToJson.csv().fromFile(csvToJsonFilePath);
  //   return csvToJsonFile;
  // }

  // initSaveAllGeniric() {
  //   this.saveAllGenericItem();
  // }

  async convertFile(req: Request, resp: Response) {
    console.log("Reuest Query ", req.query);

    const { loc, fileName } = req.query;

    try {
      const sprt = path.sep;

      console.log(" __dirname ", __dirname);

      const filePath = path.join(
        __dirname,
        `${sprt}..${sprt}..${sprt}data-file${sprt}`
      );
      console.log("File Path ", filePath);
      const xlsxToJsonFilePath = `${filePath}${loc}.xlsx`;

      // const jsonFile = await csvToJson.csv().fromFile(`${filePath}${fileName}`);
      let xlsxToJson: any = [];
      console.log("Befor xlsxj Run ...");
      xlsxj(
        {
          input: xlsxToJsonFilePath,
          output: `${fileName}.json`,
        },
        function (err: any, result: any) {
          if (err) {
            apiWriteLog.error("JSON Convertion Error ", err);
            resp.send(respFormat(null, `JSON Convertion Error  `, true));
          } else {
            xlsxToJson = result;
            resp.send(
              respFormat(result, `JSON Response ${result?.length}`, true)
            );
          }
        }
      );
      console.log("Befor xlsxj Run ...");
    } catch (error) {
      console.log("Convert File Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Convert File failed", false));
    }
  }

  
  async saveAllProduct(req: Request, resp: Response) {
    try {
      console.log("Save All Product Run ........");
      const productsJson = req.body?.products;

      console.log("Product Mapping Start ....");

      const products: Product[] = [];

      if (productsJson) {
        // productsJson.length
        console.log("Product JSON Size, ", productsJson.length);
        for (let index = 0; index < productsJson.length; index++) {
          const product = await productMapper.mapProductByJSON(
            productsJson[index]
          );

          if (product !== null) {
            console.log("Befor Push Mapped Product ...");
            products.push(product);
          } else {
            console.log("Befor Push Mapped Product Is Null ...");
          }
          console.log("Product Mapping Status ....", index);
        }
        console.log("After Product Mapping Size ", products?.length);
        const dbProducts: Product[] = [];

        for (let i = 0; i < products.length; i++) {
          console.time(`Save ${i}`);
          const dbProduct = await productService.saveViaJson(products[i]);
          console.timeEnd(`Save ${i}`);

          if (dbProduct !== undefined && dbProduct !== null) {
            dbProducts.push(dbProduct);
          }
        }

        console.log("After Save Product ... ", dbProducts?.length);
      }

      console.log("After Product Save ");
      resp.status(200);
      resp.send(
        respFormat(products, `Product Save Size ${products?.length}`, true)
      );
    } catch (error) {
      console.log("Products Save Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Product Save Failed", false));
    }
  }
}

export const initialController = new InitialController();
