import { useEffect, useState } from 'react';
import { useSnackbar } from '../context/SnackBarContext';
import { Book } from './types';
import { searchBooks } from './api.ts';

type Books = {
  books: Book[];
  loading: boolean;
  error: boolean;
};

//@TODO
/**
 * Need to look at re-using a book context, so essentially the Catalogue uses the values returned from the BookContext.
 * So Catalogue and useBookByID page use the same context, the context takes the searchTerm which re-triggers the fetch based on the searchTerm.
 * The new books are loaded into the context based on the searchTerm and the Catalogue gets the new books. The Context will also send back the error and loading state while its fetching data.
 * The AddBook form will also submit the Book via the useBook hook but that hook will attach the new Book to the first item of the books thats already within the context. So when the user navigates back to the
 * Catalogue the newly added book is at the top of the BooksTable. The BookDetails will also use the context, except once the user enters the page, using the id from the url it will find the book inside the books in the context.
 * If the book isnt within the books context or the books within the context is empty it will call the useBookById hook to fetch the book by the url id and add it to the context.
 * Submit BookAPI Hook
 */
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
