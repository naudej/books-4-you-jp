import { IndustryIdentifier, ISBN_TYPES } from '../data/types.ts';
import { isValid, parse } from 'date-fns';
import { format as dateFormat } from 'date-fns/format';

export const getIsbnNumber = (industryIdentifiers: IndustryIdentifier[]) => {
  const isbn13 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_13);
  if (isbn13 && isbn13.identifier) return isbn13.identifier;

  const isbn10 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_10);
  if (isbn10 && isbn10.identifier) return isbn10.identifier;

  return null;
};

export const formatPublishedDate = (input: string): string => {
  const formats = ['yyyy-MM-dd', 'yyyy-MM', 'yyyy'];
  for (const format of formats) {
    const parsed = parse(input, format, new Date());
    if (isValid(parsed)) return dateFormat(parsed, 'dd/MM/yyyy');
  }
  return 'Unknown';
};

export const formatCurrency = (amount: number, currency: string, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
