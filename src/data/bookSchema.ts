import * as yup from 'yup'


export  const industryIdentifierSchema = yup.object({
    type: yup.string().required(),
    identifier: yup.string().required(),
})

export const bookSchema = yup.object({
    id: yup.string().required(),
    volumeInfo: yup.object({
        title: yup.string().required(),
        subtitle: yup.string(),
        authors: yup.array().of(yup.string().required()).default([]),
        categories: yup.array().of(yup.string().required()).default([]),
        publishedDate: yup.string().required().default(''),
        industryIdentifiers: yup
            .array()
            .of(industryIdentifierSchema)
            .default([]),
        imageLinks: yup
            .object({
                thumbnail: yup.string().url(),
                smallThumbnail: yup.string().url(),
            })
            .nullable(),
    }),
})

export const bookApiSchema = yup.object({
    kind: yup.string().required(),
    items: yup.array().of(bookSchema).default([]),
})
