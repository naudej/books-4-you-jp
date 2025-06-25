import React, { useState, useEffect, useMemo } from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { SearchOption } from '../data/types.ts';

interface SearchInputProps {
  initialValues?: SearchOption[];
  onSearch: (value: string) => void;
  loading: boolean;
  label: string;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialValues = [],
  onSearch,
  loading,
  label,
  placeholder,
}) => {
  const [query, setQuery] = useState('');
  console.log({ initialValues, onSearch, loading });

  // Debounced API fetch
  // const fetchBooks = useMemo(
  //     () =>
  //         debounce(async (searchTerm: string) => {
  //             setLoading(true)
  //             try {
  //                 const res = await fetch(
  //                     `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  //                         searchTerm,
  //                     )}`,
  //                 )
  //                 const data = await res.json()
  //                 const items = data.items || []
  //                 const results: BookOption[] = items.map((item: any) => ({
  //                     id: item.id,
  //                     title: item.volumeInfo.title,
  //                 }))
  //                 setOptions(results)
  //             } catch (err) {
  //                 console.error('Error fetching books:', err)
  //                 setOptions([])
  //             } finally {
  //                 setLoading(false)
  //             }
  //         }, 500),
  //     [],
  // )

  useEffect(() => {
    if (query.trim().length >= 3) {
      onSearch(query);
    }
  }, [query, onSearch]);

  return (
    <Box maxWidth={500}>
      <Autocomplete
        options={initialValues}
        getOptionLabel={(option) => option.title}
        loading={loading}
        onInputChange={(_, value) => setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
  );
};
export default SearchInput;
