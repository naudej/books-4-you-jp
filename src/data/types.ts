import {InferType} from "yup";
import {industryIdentifierSchema} from "./bookSchema.ts";


export enum ISBN_TYPES {
    ISBN_10 = "ISBN_10",
    ISBN_13 = "ISBN_13",
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
}

export type IndustryIdentifier = InferType<typeof industryIdentifierSchema>

