import { useEffect, useState } from 'react';
import { DetailedBook } from './types';
import { useSnackbar } from '../context/SnackBarContext';
import { fetchBookById } from './api.ts';

type BookById = {
  book: DetailedBook | null;
  loading: boolean;
  error: boolean;
};

const useBookById = (id?: string): BookById => {
  const [bookByIdState, setBookByIdState] = useState<BookById>({
    book: null,
    loading: true,
    error: false,
  });
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) {
      setBookByIdState({ book: null, loading: false, error: true });
      return;
    }

    const controller = new AbortController();

    const fetchBook = async () => {
      setBookByIdState({ book: null, loading: true, error: false });

      try {
        const book = await fetchBookById(id, controller.signal);
        setBookByIdState({ book, loading: false, error: false });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        showSnackbar({ message: 'Failed to load book', type: 'error' });
        setBookByIdState({ book: null, loading: false, error: true });
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

  return bookByIdState;
};

export default useBookById;
