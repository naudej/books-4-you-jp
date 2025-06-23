// src/components/BookSearch.tsx
import React, { useState, useEffect, useMemo } from 'react'
import {
    Autocomplete,
    TextField,
    CircularProgress,
    Box,
    Typography,
} from '@mui/material'
import { debounce } from 'lodash';


type BookOption = {
    id: string
    title: string
}

export default function BookSearch() {
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState<BookOption[]>([])
    const [loading, setLoading] = useState(false)

    // Debounced API fetch
    const fetchBooks = useMemo(
        () =>
            debounce(async (searchTerm: string) => {
                setLoading(true)
                try {
                    const res = await fetch(
                        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                            searchTerm,
                        )}`,
                    )
                    const data = await res.json()
                    const items = data.items || []
                    const results: BookOption[] = items.map((item: any) => ({
                        id: item.id,
                        title: item.volumeInfo.title,
                    }))
                    setOptions(results)
                } catch (err) {
                    console.error('Error fetching books:', err)
                    setOptions([])
                } finally {
                    setLoading(false)
                }
            }, 500),
        [],
    )

    useEffect(() => {
        if (query.trim().length >= 3) {
            fetchBooks(query)
        } else {
            setOptions([])
        }
    }, [query, fetchBooks])

    return (
        <Box maxWidth={600} mx="auto" mt={4}>
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.title}
                loading={loading}
                onInputChange={(_, value) => setQuery(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Books"
                        placeholder="Start typing (e.g. 'witcher')"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        <Typography variant="body2">{option.title}</Typography>
                    </li>
                )}
            />
        </Box>
    )
}
