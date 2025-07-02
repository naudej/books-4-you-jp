import { API_BASE_URL } from '../utils/constants';
import { getIsbnNumber, parseDate } from '../utils/utils';
import { bookApiSchema, detailedBookSchema } from './bookSchema.ts';
import { Book, BookFormFields, DetailedBook, SearchOption } from './types.ts';

export const fetchBookById = async (id: string, signal?: AbortSignal): Promise<DetailedBook> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { signal });
  const data = await response.json();

  const { id: bookId, volumeInfo, saleInfo } = await detailedBookSchema.validate(data);

  const {
    title,
    imageLinks,
    authors,
    categories,
    publishedDate,
    industryIdentifiers,
    publisher,
    subtitle,
    description,
    pageCount,
    averageRating,
    language,
    previewLink,
  } = volumeInfo;

  const isbn = getIsbnNumber(industryIdentifiers);

  return {
    id: bookId,
    isbn: isbn || '',
    title,
    subtitle: subtitle || '',
    description,
    pageCount,
    averageRating: averageRating || '',
    language: language || '',
    authors,
    categories,
    publishedDate: parseDate(publishedDate),
    publisher,
    previewLink,
    industryIdentifiers,
    thumbnail: imageLinks?.thumbnail,
    saleability: saleInfo.saleability,
    country: saleInfo.country,
    buyLink: saleInfo.buyLink,
    retailPrice: saleInfo.retailPrice,
  };
};

export const searchBooks = async (searchTerm: string, signal?: AbortSignal): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(searchTerm)}`, {
    signal,
  });

  const data = await response.json();
  const { items } = await bookApiSchema.validate(data);

  return items.map(({ id, volumeInfo }) => {
    const { title, authors, publishedDate, categories, industryIdentifiers, imageLinks } =
      volumeInfo;

    const isbn = getIsbnNumber(industryIdentifiers);

    return {
      id,
      isbn: isbn || '',
      title,
      authors,
      categories,
      publishedDate: parseDate(publishedDate),
      thumbnail: imageLinks?.thumbnail || '',
    };
  });
};

export const fetchBookSuggestions = async (searchTerm: string): Promise<SearchOption[]> => {
  const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(searchTerm)}`);
  const data = await response.json();
  const { items } = await bookApiSchema.validate(data);

  return items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
  }));
};

export const submitBook = async (book: BookFormFields): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error(`Unfortunately this will always error because its not a real API`);
  }
};
