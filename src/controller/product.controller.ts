import { Request, Response } from "express";
import { initial } from "lodash";
import { apiWriteLog } from "../logger/writeLog";
import { Comment } from "../model/Comment";
import { Product } from "../model/Product";
import { commentService } from "../service/comment.services";
import { productService } from "../service/product.service";
import { reviewService } from "../service/review.service";
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
}

export const productController = new ProductController();
