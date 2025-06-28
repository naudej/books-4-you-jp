import * as yup from 'yup';

export const industryIdentifierSchema = yup.object({
  type: yup.string().required(),
  identifier: yup.string().required(),
});

export const bookSchema = yup.object({
  id: yup.string().required(),
  volumeInfo: yup.object({
    title: yup.string().required(),
    subtitle: yup.string(),
    authors: yup.array().of(yup.string().required()).default([]),
    categories: yup.array().of(yup.string().required()).default([]),
    publishedDate: yup.string().default('Unknown'),
    industryIdentifiers: yup.array().of(industryIdentifierSchema).default([]),
    imageLinks: yup
      .object({
        thumbnail: yup.string().url(),
        smallThumbnail: yup.string().url(),
      })
      .nullable(),
  }),
});

export const bookApiSchema = yup.object({
  kind: yup.string().required(),
  items: yup.array().of(bookSchema).default([]),
});

const saleInfoSchema = yup.object({
  country: yup.string().required(),
  saleability: yup.string().oneOf(['FOR_SALE', 'NOT_FOR_SALE', 'FREE']).required(),
  buyLink: yup
    .string()
    .url()
    .when('saleability', {
      is: 'FOR_SALE',
      then: (schema) => schema.required('buyLink is required when saleability is FOR_SALE'),
      otherwise: (schema) => schema.strip(),
    }),
  retailPrice: yup
    .object({
      amount: yup.number().required(),
      currencyCode: yup.string().required(),
    })
    .when('saleability', {
      is: 'FOR_SALE',
      then: (schema) => schema.required('retailPrice is required when saleability is FOR_SALE'),
      otherwise: (schema) => schema.strip(),
    }),
});

export const detailedBookSchema = yup.object({
  id: yup.string().required(),
  saleInfo: saleInfoSchema.required(),
  volumeInfo: yup.object({
    title: yup.string().required(),
    subtitle: yup.string(),
    description: yup.string(),
    pageCount: yup.string(),
    averageRating: yup.string(),
    language: yup.string(),
    authors: yup.array().of(yup.string().required()).default([]),
    categories: yup.array().of(yup.string().required()).default([]),
    publishedDate: yup.string().required().default(''),
    publisher: yup.string().default(''),
    previewLink: yup.string().required().default(''),
    industryIdentifiers: yup.array().of(industryIdentifierSchema).default([]),
    imageLinks: yup
      .object({
        thumbnail: yup.string().url(),
        smallThumbnail: yup.string().url(),
      })
      .nullable(),
  }),
});
