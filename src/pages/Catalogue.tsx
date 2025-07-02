import * as React from 'react';
import BooksTable from '../components/BooksTable.tsx';
import { HeadCell, SearchOption } from '../data/types.ts';
import { Button, Grid, Stack } from '@mui/material';
import SearchInput from '../components/SearchInput.tsx';
import useBooks from '../data/useBooks.tsx';
import { useMatch, useNavigate, useSearchParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import useBookSuggestions from '../data/useBookSuggestions.ts';
import AddIcon from '@mui/icons-material/Add';
import AddBook from '../form/AddBook.tsx';

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
  const { searchOptions, fetchSuggestions, loading: loadingSuggestions } = useBookSuggestions();
  const navigate = useNavigate();
  const openCreate = useMatch('/create');

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
      setInputValue(option.title);
      setSearchParams({ q: option.title });
    },
    [setSearchParams],
  );

  return (
    <Stack spacing={4}>
      <Grid
        container={true}
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchInput
          onOptionSelect={handleOptionSelect}
          inputValue={inputValue}
          error={error}
          label="Search Books"
          placeholder="Start typing to find a book"
          options={searchOptions.length > 0 ? searchOptions : initialValues}
          loading={loadingSuggestions}
          onInputChange={handleAutocompleteInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <Button variant="contained" onClick={() => navigate('/create')} endIcon={<AddIcon />}>
          Add Book
        </Button>
      </Grid>
      <BooksTable
        key={searchTerm}
        books={books}
        tableHeaders={CatalogueHeaders}
        loading={loading}
      />
      <AddBook open={Boolean(openCreate)} />
    </Stack>
  );
};
export default Catalogue;
