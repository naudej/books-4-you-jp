import { useEffect, useState } from 'react';
import { DetailedBook } from './types.ts';
import { detailedBookSchema } from './bookSchema.ts';
import { formatPublishedDate, getIsbnNumber } from '../utils/utils.ts';

const useBookById = (id?: string) => {
  const [book, setBook] = useState<DetailedBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setBook(null);
      setError('No book ID provided.');
      return;
    }

    const controller = new AbortController();

    const fetchBook = async () => {
      setLoading(true);
      setError(null);

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
        setBook({
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
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError('Failed to fetch book.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
    return () => controller.abort();
  }, [id]);

  return { book, loading, error };
};

export default useBookById;
