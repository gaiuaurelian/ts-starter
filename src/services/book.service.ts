import { injectable } from "inversify";
import { CreateBookDto } from "../dto/books/create-book.dto";
import { Book } from "../models/book.model";

const BOOKS: Book[] = [];

@injectable()
export class BookService {
  fetchAllBooks(): Promise<Book[]> {
    return Promise.resolve(BOOKS);
  }

  fetchById(bookId: number): Promise<Book | null> {
    const book = BOOKS.find(b => b.id === bookId);
    if(book) {
      return Promise.resolve(book);
    }

    return Promise.resolve(null);
  }

  createNewBook(bookDto: CreateBookDto): Promise<Book> {
    const newId = BOOKS.length + 1;
    const newBook = {
      id: newId,
      title: bookDto.title,
      cover: bookDto.cover,
      description: bookDto.description
    }
    BOOKS.push(newBook);
    return Promise.resolve(newBook);
  }
}
