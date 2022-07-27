import express, { Router } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class Routes {
  protected readonly router: Router = express.Router();
  abstract setRoutes(): void;

  get(): Router {
    this.setRoutes();
    return this.router;
  }
}

export const RoutesSymbol = Symbol.for(Routes.name);
