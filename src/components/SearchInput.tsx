import React from 'react';
import { Autocomplete, TextField, CircularProgress, Box, Typography } from '@mui/material';
import { SearchOption } from '../data/types.ts';

interface SearchInputProps {
  initialValues?: SearchOption[];
  onSearch: (value: string) => void;
  loading: boolean;
  error: boolean;
  label: string;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialValues = [],
  onSearch,
  loading,
  label,
  placeholder,
  error,
}) => {
  return (
    <Box maxWidth={500}>
      <Autocomplete
        disabled={error}
        options={initialValues}
        getOptionLabel={(option) => option.title}
        loading={loading}
        onInputChange={(_, value) => onSearch(value)}
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
