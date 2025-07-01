import { InferType } from 'yup';
import { industryIdentifierSchema } from './bookSchema.ts';
import { bookValidationSchema } from '../form/validationSchemas.ts';

export type Order = 'asc' | 'desc';

export interface HeadCell {
  id: keyof Book;
  label: string;
}

export type SearchOption = {
  id: string;
  title: string;
};

export enum ISBN_TYPES {
  ISBN_10 = 'ISBN_10',
  ISBN_13 = 'ISBN_13',
}

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  categories: string[];
  publishedDate: string;
  isbn: string;
  thumbnail?: string;
};

export type IndustryIdentifier = InferType<typeof industryIdentifierSchema>;

export type DetailedBook = Book & {
  description?: string;
  pageCount?: string;
  averageRating?: string;
  language: string;
  publisher: string;
  previewLink: string;
  industryIdentifiers: IndustryIdentifier[];
  saleability: 'FOR_SALE' | 'NOT_FOR_SALE' | 'FREE';
  country: string;
  buyLink?: string;
  retailPrice?: RetailPrice;
};

export type RetailPrice = {
  amount: number;
  currencyCode: string;
};

export type BookFormFields = InferType<typeof bookValidationSchema>;
