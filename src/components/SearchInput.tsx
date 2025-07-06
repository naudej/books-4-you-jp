import React from 'react';
import { Autocomplete, TextField, CircularProgress, Typography, IconButton } from '@mui/material';
import { SearchOption } from '../data/types.ts';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  options?: SearchOption[];
  onInputChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  onOptionSelect: (option: SearchOption) => void;
  loading: boolean;
  error: boolean;
  label: string;
  placeholder: string;
  inputValue: string;
}

const SearchInput = ({
  options = [],
  onInputChange,
  onSearchSubmit,
  loading,
  label,
  placeholder,
  error,
  inputValue,
  onOptionSelect,
}: SearchInputProps) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim().length >= 3) {
      onSearchSubmit(inputValue);
    }
  };

  const handleIconClick = () => {
    if (inputValue.trim().length >= 3) {
      onSearchSubmit(inputValue);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 400 }}
      disabled={error}
      options={options}
      getOptionLabel={(option) => option.title}
      loading={loading}
      inputValue={inputValue}
      onChange={(_, selectedOption) => {
        if (selectedOption) {
          onOptionSelect(selectedOption);
        }
      }}
      onInputChange={(_, value) => onInputChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          aria-label={label}
          label={label}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress aria-hidden={true} color="primary" size={20} /> : null}
                <IconButton aria-label="search" onClick={handleIconClick}>
                  <SearchIcon aria-hidden={true} />
                </IconButton>
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, { id, title }) => (
        <li {...props} key={id}>
          <Typography aria-label={title} variant="body2">
            {title}
          </Typography>
        </li>
      )}
    />
  );
};
export default SearchInput;
