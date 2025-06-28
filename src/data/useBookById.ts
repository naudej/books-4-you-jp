import { useEffect, useState } from 'react';
import { DetailedBook } from './types.ts';
import { detailedBookSchema } from './bookSchema.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';

type BookById = {
  book: DetailedBook | null;
  loading: boolean;
  error: string | null;
};

const useBookById = (id?: string) => {
  const [bookById, setBookById] = useState<BookById>({
    book: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setBookById({
        book: null,
        loading: false,
        error: 'No book ID provided.',
      });
      return;
    }

    const controller = new AbortController();

    const fetchBook = async () => {
      setBookById({ book: null, loading: true, error: null });

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
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
          error: null,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setBookById({
            book: null,
            loading: false,
            error: 'Failed to fetch book.',
          });
        }
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

  return bookById;
};

export default useBookById;
