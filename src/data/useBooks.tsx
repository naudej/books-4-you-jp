import { useEffect, useState } from 'react';
import { bookApiSchema } from './bookSchema.ts';
import { Book } from './types.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';

type Books = {
  books: Book[];
  loading: boolean;
  error: string | null;
};
const useBooks = (searchTerm: string = 'henry') => {
  const [books, setBooks] = useState<Books>({
    books: [],
    loading: true,
    error: null,
  });
  // https://www.googleapis.com/books/v1/volumes/effBnY4hNDEC
  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      setBooks({ books: [], loading: true, error: null });
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        const { items } = await bookApiSchema.validate(data);
        const books: Book[] = items.map(({ id, volumeInfo }) => {
          const { title, authors, publishedDate, categories, industryIdentifiers, imageLinks } =
            volumeInfo;
          const isbn = getIsbnNumber(industryIdentifiers);
          //@TODO Throw error that ISBN is null
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
          error: null,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          //@TODO Trigger snackBar
          // console.error(err);
          setBooks({
            books: [],
            loading: false,
            error: 'Failed to fetch book.',
          });
        }
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [searchTerm]);

  return books;
};
export default useBooks;
