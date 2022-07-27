import { Container, inject, injectable } from 'inversify';
import { BooksController } from './controllers/books.controller';
import { Routes, RoutesSymbol } from './routes/abstractions/routes';
import { BooksRoutes } from './routes/books.routes';
import { RoutingModule } from './routes/routing_module';
import { BookService } from './services/book.service';
import { ExpressService } from './services/express.service';

@injectable()
export class Server {
  constructor() {}

  static configureServices(container: Container) {
    container.bind<ExpressService>(ExpressService).toSelf().inSingletonScope();
    container.bind<RoutingModule>(RoutingModule).toSelf().inRequestScope();
    // ROUTES binding
    container.bind<Routes>(RoutesSymbol).to(BooksRoutes).inRequestScope();
    // CONTROLLERS binding
    container.bind<BooksController>(BooksController).toSelf().inRequestScope();
    // SERVICES binding
    container.bind<BookService>(BookService).toSelf().inRequestScope();
  }

  static configure() {
    const container = new Container();
    this.configureServices(container);
    container.get(ExpressService).bootstrapApplication();
  }
}
