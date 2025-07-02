import { IndustryIdentifier, ISBN_TYPES } from '../data/types.ts';
import { isValid, parseISO } from 'date-fns';

export const getIsbnNumber = (industryIdentifiers: IndustryIdentifier[]) => {
  const isbn13 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_13);
  if (isbn13 && isbn13.identifier) {
    return isbn13.identifier;
  }

  const isbn10 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_10);
  if (isbn10 && isbn10.identifier) {
    return isbn10.identifier;
  }

  const otherIsbn = industryIdentifiers.find((id) => id.identifier);
  if (otherIsbn?.identifier) {
    return otherIsbn.identifier;
  }

  return null;
};

export const parseDate = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }
  const date = parseISO(dateString);
  return isValid(date) ? date : null;
};

export const formatCurrency = (amount: number, currency: string, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
