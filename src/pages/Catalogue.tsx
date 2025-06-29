import * as React from 'react';
import BooksTable from '../components/BooksTable.tsx';
import { HeadCell, SearchOption } from '../data/types.ts';
import { Box } from '@mui/material';
import SearchInput from '../components/SearchInput.tsx';
import useBooks from '../data/useBooks.tsx';
import { useSearchParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

const CatalogueHeaders: HeadCell[] = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'isbn',
    label: 'ISBN',
  },
  {
    id: 'authors',
    label: 'Authors',
  },
  {
    id: 'publishedDate',
    label: 'Published Date',
  },
  {
    id: 'categories',
    label: 'Categories',
  },
];

const Catalogue: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || 'harry';
  const { books, loading, error } = useBooks(searchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);
  const initialValues: SearchOption[] = books.map(({ id, title }) => ({ id, title }));
  const [autocompleteOptions, setAutocompleteOptions] = useState<SearchOption[]>([]);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  //@TODO Have a look at refactoring
  const debouncedFetchSuggestions = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.length < 3) return;

        try {
          const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(value)}`,
          );
          const json = await res.json();
          const items = json.items || [];
          const options: SearchOption[] = items.map((b: any) => ({
            id: b.id,
            title: b.volumeInfo?.title ?? '',
          }));
          setAutocompleteOptions(options);
        } catch (err) {
          console.error('Autocomplete fetch failed:', err);
        }
      }, 400),
    [],
  );

  const handleAutocompleteInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedFetchSuggestions(value);
    },
    [debouncedFetchSuggestions],
  );

  const handleSearchSubmit = useCallback(
    (value: string) => {
      setInputValue('');
      setSearchParams({ q: value });
    },
    [setSearchParams],
  );

  const handleOptionSelect = useCallback(
    (option: SearchOption) => {
      setInputValue(option.title); // immediately reflect selected option
      setSearchParams({ q: option.title });
    },
    [setSearchParams],
  );

  return (
    <Box>
      <Box mb={4}>
        <SearchInput
          onOptionSelect={handleOptionSelect}
          inputValue={inputValue}
          error={error}
          label="Search Books"
          placeholder="Start typing to find a book"
          initialValues={autocompleteOptions.length > 0 ? autocompleteOptions : initialValues}
          loading={loading}
          onInputChange={handleAutocompleteInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </Box>
      <BooksTable books={books} tableHeaders={CatalogueHeaders} loading={loading} />
    </Box>
  );
};
export default Catalogue;
