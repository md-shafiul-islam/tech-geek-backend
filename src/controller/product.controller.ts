import { Request, Response } from "express";
import { initial } from "lodash";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Comment } from "../model/Comment";
import { Product } from "../model/Product";
import { Rating } from "../model/Rating";
import { commentService } from "../service/comment.services";
import { productService } from "../service/product.service";
import { ratingService } from "../service/rating.service";
import { reviewService } from "../service/review.service";
import { esGetNumber } from "../utils/esHelper";
import respFormat from "../utils/response/respFormat";

class ProductController {
  
  async getProductByAliasNames(req: Request, resp: Response) {
    try {
      const products = await productService.getAllByAliasNames(req.body);
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products?.length} product(s) found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("product getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }
  async getProductsRangeItems(req: Request, resp: Response) {
    try {
      const products = await productService.getAllByPriceRange(req.query);
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products?.length} product(s) found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("product getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }

  async getProductsSiteMapItems(req: Request, resp: Response) {
    try {
      console.log("Geting  products sitemap ... ");
      const products = await productService.getProductSiteMapItems(req.query);

      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products?.length} Search Options found`, true)
        );
      } else {
        resp.status(200);
        resp.send(respFormat(products, `Search Options not found`));
      }
    } catch (error) {
      apiWriteLog.error("Search Options found Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Search Options found not found"));
    }
  }
  async getProductsBySearch(req: Request, resp: Response) {
    try {
      console.log("Geting Search products ... ");
      const products = await productService.getProductSearchOptions();

      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products?.length} Search Options found`, true)
        );
      } else {
        resp.status(200);
        resp.send(respFormat(products, `Search Options not found`));
      }
    } catch (error) {
      apiWriteLog.error("Search Options found Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Search Options found not found"));
    }
  }

  async getProductsByQuerySearch(req: Request, resp: Response) {
    try {
      console.log(
        "Geting Search Query products ... Query, ",
        req?.params?.name
      );
      const products = await productService.getProductSearchQuery(
        req?.params?.name
      );

      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products?.length} Search Query found`, true)
        );
      } else {
        resp.status(200);
        resp.send(respFormat(products, `Search Query not found`));
      }
    } catch (error) {
      apiWriteLog.error("Search Query found Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Search Query found not found"));
    }
  }

  async getByMostVisitedProducts(req: Request, resp: Response) {
    try {
      let limit = esGetNumber(req.query.size);
      const products = await productService.getMostVisitedProducts(limit);
      resp.status(200);
      resp.send(respFormat(products, "Visited product's not found"));
    } catch (error) {
      apiWriteLog.error("Visited products Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Visited product's not found"));
    }
  }

  async getProductByPriceRange(req: Request, resp: Response) {
    try {
      const { count, cat, start, end } = req.query;
      let minPrice = esGetNumber(start);
      let maxPrice = esGetNumber(end);

      const products = await productService.getProductByPriceRange(
        cat,
        minPrice,
        maxPrice
      );

      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products.length} product's found`, true)
        );
      } else {
        resp.status(200);
        resp.send(respFormat(null, "Visited product's not found"));
      }
    } catch (error) {
      apiWriteLog.error("Visited products Error ", error);
      resp.status(200);
      resp.send(respFormat(null, "Visited product's not found"));
    }
  }

  async getAll(req: Request, resp: Response) {
    try {
      const respData = await productService.getAll(req.query);
      if (respData) {
        resp.status(200);
        resp.send(
          respFormat(
            respData,
            `${respData?.products?.length} product(s) found`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("product getAll Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }

  async getBySinglePageData(req: Request, resp: Response) {
    try {
      const productResp = await productService.getAliasName(req.params?.name);
      if (productResp) {
        productService.saveVisitCount(productResp?.id, productResp?.aliasName);
        const recommended = await productService.getRecommendedProducts(
          productResp
        );
        const newArrival = await productService.getNewArrivalProducts(
          productResp?.category?.key
        );
        const mostVisited = await productService.getMostVisitedProducts(8);

        resp.status(200);
        resp.send(
          respFormat(
            {
              product: productResp,
              recommended,
              visiteds: mostVisited,
              newArrival,
            },
            ` product found`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("Get product By Alias Name Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "product not found"));
    }
  }

  async getByAliasName(req: Request, resp: Response) {
    try {
      const productResp = await productService.getAliasName(req.params?.name);
      if (productResp) {
        resp.status(200);
        resp.send(respFormat(productResp, ` product found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "product not found"));
      }
    } catch (error) {
      apiWriteLog.error("Get product By Alias Name Error ", error);
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
      const product = await productService.save(req.body);

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

  async getProductAllReview(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductByAllyName(id);
      if (product) {
        const reviews = await reviewService.getAllReviewsByProduct(product.id);

        resp
          .status(200)
          .send(respFormat(reviews, "Product reviews found", true));
      }
    } catch (error) {
      apiWriteLog.error("Product reviews error ", error);
      resp
        .status(200)
        .send(respFormat(null, "Product reviews not found", false));
    }
  }

  async addProductReview(req: Request, resp: Response) {
    try {
      const { connect } = req.body;
      const { id } = req.params;
      const product = await productService.getProductByAllyName(id);
      if (product) {
        const reviews = await reviewService.getAddReviewsByProduct(
          product,
          connect
        );

        resp.status(200).send(respFormat(reviews, "Add Product review", true));
      }
    } catch (error) {
      apiWriteLog.error("Product reviews error ", error);
      resp
        .status(200)
        .send(respFormat(null, "Add Product review failed", false));
    }
  }

  async getProductComment(req: Request, resp: Response) {
    try {
      const { id, cid } = req.params;
      const intCid = Number(cid);
      const comment = await commentService.getById(intCid);
      resp
        .status(200)
        .send(respFormat(comment, "Product Comment found", false));
    } catch (error) {
      resp
        .status(200)
        .send(respFormat(null, "Product Comment not found", false));
    }
  }
  async getProductAllComment(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const intCid = Number(id);
      const comments = await commentService.getCommentByProductAsTree(intCid);
      resp
        .status(200)
        .send(respFormat(comments, "Product Comments found", true));
    } catch (error) {
      resp
        .status(200)
        .send(respFormat(null, "Product Comment not found", false));
    }
  }

  async addProductComment(req: Request, resp: Response) {
    try {
      const { content, parent } = req.body;

      const product = await productService.getProductByAllyName(req.params.id);
      const initComment = new Comment();
      initComment.content = content;
      if (product != null && product !== undefined) {
        initComment.product = product;
      }

      if (parent !== null && parent !== undefined) {
        initComment.parent = parent;
      }

      const comment = await productService.addComment(initComment);
      resp.status(201).send(respFormat(comment, "Product Comment add ", true));
    } catch (error) {
      apiWriteLog.error("Product Comment add error ", error);
      resp.status(202);
      resp.send(respFormat(null, "Comment Add failed"));
    }
  }

  //Product Rating
  async addProductRating(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const iId = Number(id);
      const product = await productService.getById(iId);
      req.body.product = product;

      const rating = await ratingService.addRatingByProduct(req.body);
      resp.status(201);
      resp.send(respFormat(rating, "Product Rating Added", true));
    } catch (error) {
      apiWriteLog.error("Add Product Rating Product controller Error ", error);
    }
  }

  async getProductRating(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const iId = Number(id);
      const product = await productService.getById(iId);
      if (product !== null && product !== undefined) {
        const rating = await ratingService.getByProductId(product.id);

        resp.status(202);
        resp.send(respFormat(rating, "Product Rating found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, "Product not found", false));
      }
    } catch (error) {
      apiWriteLog.error("Add Product Rating Product controller Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "Product Rating not found", false));
    }
  }
}

export const productController = new ProductController();
