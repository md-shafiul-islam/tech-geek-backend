import { Request, Response } from "express";

class UserController {
  async getUsers(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async getUserById(req: Request, resp: Response) {
    resp.status(200);
    resp.send({ message: "User ", id: req.params.id });
  }

  async addUser(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async updateUser(req: Request, resp: Response) {
    resp.sendStatus(200);
  }

  async deleteUser(req: Request, resp: Response) {
    resp.sendStatus(200);
  }
}

export const userController = new UserController();
