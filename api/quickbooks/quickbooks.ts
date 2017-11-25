import { Express } from "express";
import * as express from "express";

export class Quickbooks {
  public app: Express;

  constructor() {
    this.app = express();
    this.app.get("/:id", (req, res) => res.send(req.params.id));
  }
}
