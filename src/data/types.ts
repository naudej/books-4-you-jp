import { InferType } from 'yup';
import { industryIdentifierSchema } from './bookSchema.ts';

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
