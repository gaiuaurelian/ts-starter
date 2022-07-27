import { inject, injectable } from "inversify";
import express, { Application, NextFunction, Response } from 'express';
import dotenv from 'dotenv';
import { RoutingModule } from "../routes/routing_module";
import bodyParser from "body-parser";

@injectable()
export class ExpressService {
  private readonly _app: express.Application;
  private readonly port: number;
  private readonly env: string;

  public get app() {
    return this._app;
  }

  constructor(private readonly routingModule: RoutingModule) {
    dotenv.config();
    this.port = process.env.PORT ? Number(process.env.PORT) : 3000;
    this.env = process.env.ENVIRONMENT ?? 'Development';
    this._app = express();
  }

  bootstrapApplication() {
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(bodyParser.json());
    this.routingModule.setup(this._app);
    this._app.listen(process.env.PORT, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }
}
