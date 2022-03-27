import { Request, Response } from "express";

class PostController {
  async getAll(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async getById(req: Request, resp: Response) {
    resp.status(200);
    resp.send({ message: "User ", id: req.params.id });
  }

  async add(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async update(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async delete(req: Request, resp: Response) {
    resp.sendStatus(200);
  }
}

export const postController = new PostController();
