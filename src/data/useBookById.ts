import { useEffect, useState } from 'react';
import { DetailedBook } from './types.ts';
import { detailedBookSchema } from './bookSchema.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';
import { useSnackbar } from '../context/SnackBarContext.tsx';
import { API_BASE_URL } from '../utils/constants.ts';

type BookById = {
  book: DetailedBook | null;
  loading: boolean;
  error: boolean;
};

const useBookById = (id?: string) => {
  const [bookById, setBookById] = useState<BookById>({
    book: null,
    loading: true,
    error: false,
  });
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) {
      setBookById({
        book: null,
        loading: false,
        error: true,
      });
      return;
    }

    const controller = new AbortController();

    const fetchBook = async () => {
      setBookById({ book: null, loading: true, error: false });

      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          signal: controller.signal,
        });

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

        const mappedBook: DetailedBook = {
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
          publishedDate: formatPublishedDate(publishedDate),
          publisher,
          previewLink,
          industryIdentifiers,
          thumbnail: imageLinks?.thumbnail,
          saleability: saleInfo.saleability,
          country: saleInfo.country,
          buyLink: saleInfo.buyLink,
          retailPrice: saleInfo.retailPrice,
        };

        setBookById({
          book: mappedBook,
          loading: false,
          error: false,
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        showSnackbar({
          message: 'Failed to load book',
          type: 'error',
        });
        setBookById({
          book: null,
          loading: false,
          error: true,
        });
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

  return bookById;
};

export default useBookById;
