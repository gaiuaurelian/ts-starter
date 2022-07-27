import { Book } from '../../models/book.model';

export interface CreateBookDtoParams {
  title: string;
  cover: string;
  description: string;
}

export class CreateBookDto {
  title: string;
  cover: string;
  description: string;

  constructor(params: CreateBookDtoParams) {
    this.title = params.title;
    this.cover = params.cover;
    this.description = params.description;
  }
}
