import { Application, Router } from 'express';
import { inject, injectable, multiInject } from 'inversify';
import { Routes, RoutesSymbol } from './abstractions/routes';

@injectable()
export class RoutingModule {
  constructor(
      @multiInject(RoutesSymbol) private routes: Routes[]
  ) {}

  setup(app: Application) {
    for(let route of this.routes) {
      app.use('/api', route.get());
    }
  }
}
