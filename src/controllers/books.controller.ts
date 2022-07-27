import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { CreateBookDto } from '../dto/books/create-book.dto';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@injectable()
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  fetchAll = async (req: Request, res: Response): Promise<void> => {
    const listOfBooks = await this.bookService.fetchAllBooks();
    res.status(200).send({
      code: 200,
      data: listOfBooks,
    });
  };

  fetchById = async (req: Request, res: Response): Promise<void> => {
    const bookId = Number(req.params.id);
    const foundBook = await this.bookService.fetchById(bookId);
    if (foundBook) {
      res.status(200).send({
        code: 201,
        data: foundBook,
      });
    } else {
      res.status(404).send({
        code: 404,
        errors: {
          message: `Book with id ${req.params.id} does not exit. Make sure that the book has been added`,
        },
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const bookDto: CreateBookDto = new CreateBookDto(req.body);
    const newBook: Book = await this.bookService.createNewBook(bookDto);
    res.status(201).send({
      code: 201,
      data: newBook,
      metadata: {
        self: `http://localhost:5432/api/todo/${newBook.id}`,
      },
    });
  };
}
