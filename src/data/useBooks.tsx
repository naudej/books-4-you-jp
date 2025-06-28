import { useEffect, useState } from 'react';
import { bookApiSchema } from './bookSchema.ts';
import { Book } from './types.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';

const useBooks = (searchTerm: string = 'henry') => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // https://www.googleapis.com/books/v1/volumes/effBnY4hNDEC
  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
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
        setBooks(books);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          //@TODO Trigger snackBar
          // console.error(err);
          setError('Failed to fetch books.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [searchTerm]);

  return { books, loading, error };
};
export default useBooks;
