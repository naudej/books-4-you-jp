import { useEffect, useState } from 'react';
import { bookApiSchema } from './bookSchema.ts';
import { Book } from './types.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';
import { useSnackbar } from '../context/SnackBarContext.tsx';
import { API_BASE_URL } from '../utils/constants.ts';

type Books = {
  books: Book[];
  loading: boolean;
  error: boolean;
};
const useBooks = (searchTerm: string = 'henry') => {
  const [books, setBooks] = useState<Books>({
    books: [],
    loading: true,
    error: false,
  });
  const { showSnackbar } = useSnackbar();
  // https://www.googleapis.com/books/v1/volumes/effBnY4hNDEC
  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      setBooks({ books: [], loading: true, error: false });
      try {
        const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(searchTerm)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        const { items } = await bookApiSchema.validate(data);
        const books: Book[] = items.map(({ id, volumeInfo }) => {
          const { title, authors, publishedDate, categories, industryIdentifiers, imageLinks } =
            volumeInfo;
          const isbn = getIsbnNumber(industryIdentifiers);
          return {
            id,
            isbn: isbn || '',
            title,
            authors,
            categories,
            publishedDate: formatPublishedDate(publishedDate),
            thumbnail: imageLinks?.thumbnail || '',
          };
        });
        setBooks({
          books,
          loading: false,
          error: false,
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        showSnackbar({
          message: 'Failed to load book data',
          type: 'error',
        });
        setBooks({
          books: [],
          loading: false,
          error: true,
        });
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [searchTerm]);

  return books;
};
export default useBooks;
