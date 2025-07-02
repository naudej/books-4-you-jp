import * as yup from 'yup';
import { ISBN_TYPES } from '../data/types.ts';
import isISBN from 'validator/es/lib/isISBN';

export const bookValidationSchema = yup.object({
  title: yup.string().required('Every book needs a title'),
  author: yup
    .string()
    .min(2, 'A name should at least have more than 2 letters')
    .matches(
      /^\D*$/,
      'Only Elon Musk would burden his child with digits in their name, dont be that person too.',
    )
    .required('Was the book written by a ghost?'),
  publishedDate: yup.date().required('Published date is required').typeError('Invalid date'),
  isbnType: yup.string().oneOf(Object.values(ISBN_TYPES)).required('Please select ISBN type'),
  isbn: yup
    .string()
    .required('Librarians would be mad without this, please dont make one cry')
    .test('is-valid-isbn', 'Invalid ISBN for selected type', function (value) {
      const { isbnType } = this.parent;
      if (!value || !isbnType) {
        return false;
      }
      const version = isbnType === ISBN_TYPES.ISBN_10 ? '10' : '13';
      return isISBN(value, version);
    }),
});
