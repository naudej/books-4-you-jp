import { useEffect, useState } from 'react';
import { useSnackbar } from '../context/SnackBarContext';
import { Book } from './types';
import { searchBooks } from './api.ts';

type Books = {
  books: Book[];
  loading: boolean;
  error: boolean;
};

const useBooks = (searchTerm: string = 'henry'): Books => {
  const [booksState, setBooksState] = useState<Books>({
    books: [],
    loading: true,
    error: false,
  });
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setBooksState({ books: [], loading: true, error: false });

      try {
        const books = await searchBooks(searchTerm, controller.signal);
        setBooksState({ books, loading: false, error: false });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        showSnackbar({ message: 'Failed to load book data', type: 'error' });
        setBooksState({ books: [], loading: false, error: true });
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [searchTerm]);

  return booksState;
};

export default useBooks;
