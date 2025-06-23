import { useEffect, useState } from 'react'
import {bookApiSchema} from "./bookSchema.ts";
import {Book, IndustryIdentifier, ISBN_TYPES} from "./types.ts";
import { parse, format as dateFormat, isValid } from 'date-fns'

const getIsbnNumber = (industryIdentifiers: IndustryIdentifier[]) => {
    const isbn13 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_13);
    if (isbn13 && isbn13.identifier) {
        return isbn13.identifier;
    }
    const isbn10 = industryIdentifiers.find((isbn) => isbn.type === ISBN_TYPES.ISBN_10);
    if (isbn10 && isbn10.identifier) {
        return isbn10.identifier;
    }

    return null;
}

export const formatPublishedDate = (input: string): string => {
    const acceptedFormats = ['yyyy-MM-dd', 'yyyy-MM', 'yyyy']

    for (const format of acceptedFormats) {
        const parsed = parse(input, format, new Date())
        if (isValid(parsed)) {
            return dateFormat(parsed, 'dd/MM/yyyy')
        }
    }

    return 'Unknown'
}


export function useBookData(searchTerm: string = 'henry') {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        const fetchBooks = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`,
                    { signal: controller.signal },
                )
                const data = await response.json()
                const {items } = await bookApiSchema.validate(data);
                const books: Book [] = items.map(({id, volumeInfo}) => {
                    const { title, authors, publishedDate, categories, industryIdentifiers, imageLinks } = volumeInfo;
                    const isbn = getIsbnNumber(industryIdentifiers);
                    //@TODO Throw error that ISBN is null
                    return ({
                        id,
                        isbn: isbn || '',
                        title,
                        authors,
                        categories,
                        publishedDate: formatPublishedDate(publishedDate),
                        thumbnail: imageLinks?.thumbnail || ''
                    })
                })
                setBooks(books)
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    //@TODO Trigger snackBar
                    console.error(err)
                    setError('Failed to fetch books.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
        return () => controller.abort()
    }, [searchTerm])

    return { books, loading, error }
}
