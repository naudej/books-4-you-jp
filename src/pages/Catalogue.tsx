import * as React from 'react';
import BooksTable from '../components/BooksTable.tsx';
import { HeadCell, SearchOption } from '../data/types.ts';
import { Box } from '@mui/material';
import SearchInput from '../components/SearchInput.tsx';
import useBooks from '../data/useBooks.tsx';
import { useSearchParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import useBookSuggestions from '../data/useBookSuggestions.ts';

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
  //@TODO need a loading state for the suggestions
  const { searchOptions, fetchSuggestions } = useBookSuggestions();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleAutocompleteInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      fetchSuggestions(value);
    },
    [fetchSuggestions],
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
          options={searchOptions.length > 0 ? searchOptions : initialValues}
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
