import { injectable } from "inversify";
import { BooksController } from "../controllers/books.controller";
import { Routes } from "./abstractions/routes";

@injectable()
export class BooksRoutes extends Routes {
  constructor(private readonly booksController: BooksController) {
    super();
  }
  setRoutes(): void {
    // GET /api/books
    this.router.get('/books', this.booksController.fetchAll);
    // GET /api/books/:id
    this.router.get('/books/:id', this.booksController.fetchById);
    // POST /api/books
    this.router.post('/books', this.booksController.create);
  }

}
