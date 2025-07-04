import { describe, it, expect } from 'vitest';
import { ISBN_TYPES, IndustryIdentifier } from '../data/types';
import { formatCurrency, getIsbnNumber, parseDate } from '../utils/utils.ts';

const ISBN_13 = '9780306406157';
const ISBN_10 = '0306406152';

describe('getIsbnNumber', () => {
  const exampleIsbn: IndustryIdentifier[] = [
    { type: ISBN_TYPES.ISBN_13, identifier: ISBN_13 },
    { type: ISBN_TYPES.ISBN_10, identifier: ISBN_10 },
  ];

  it('returns ISBN_13 if both ISBN_10 and ISBN_13 are available', () => {
    expect(getIsbnNumber(exampleIsbn)).toBe(ISBN_13);
  });

  it('returns ISBN_10 if ISBN_13 is not available', () => {
    const ISBN = [{ type: ISBN_TYPES.ISBN_10, identifier: ISBN_10 }];
    expect(getIsbnNumber(ISBN)).toBe(ISBN_10);
  });

  it('returns other identifier if type is OTHER', () => {
    const ISBN = [{ type: 'OTHER', identifier: 'WOW' }];
    expect(getIsbnNumber(ISBN)).toBe('WOW');
  });

  it('returns null if no ISBN is inputted', () => {
    expect(getIsbnNumber([])).toBeNull();
  });
});

describe('parseDate', () => {
  it('returns valid Date object for correct ISO string', () => {
    const date = parseDate('2024-03-15');
    expect(date).toBeInstanceOf(Date);
    expect(date?.toISOString().startsWith('2024-03-15')).toBe(true);
  });

  it('returns null for invalid date string', () => {
    expect(parseDate('not-a-date')).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(parseDate(undefined)).toBeNull();
  });
});

describe('formatCurrency', () => {
  it('formats USD correctly for en-US', () => {
    expect(formatCurrency(1100.2, 'USD')).toBe('$1,100.20');
  });

  it('formats EUR correctly', () => {
    expect(formatCurrency(1200.6, 'EUR')).toBe('€1,200.60');
  });
});
