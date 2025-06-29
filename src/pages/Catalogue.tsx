import * as React from 'react';
import BooksTable from '../components/BooksTable.tsx';
import { HeadCell, SearchOption } from '../data/types.ts';
import { Box } from '@mui/material';
import SearchInput from '../components/SearchInput.tsx';
import useBooks from '../data/useBooks.tsx';
import { useSearchParams } from 'react-router';
import { useMemo } from 'react';
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
  const queryParam = searchParams.get('q') || 'Harry';
  const { books, loading, error } = useBooks(queryParam);
  const searchOptions: SearchOption[] = books.map(({ id, title }) => ({ id, title }));

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams({ q: value });
      }, 400),
    [setSearchParams],
  );

  const handleSearch = React.useCallback(
    (value: string) => {
      if (value.trim().length >= 3) {
        debouncedSearch(value);
      }
    },
    [debouncedSearch],
  );

  return (
    <Box>
      <Box mb={4}>
        <SearchInput
          error={error}
          label="Search Books"
          placeholder="Start typing to find a book"
          initialValues={searchOptions}
          loading={loading}
          onSearch={handleSearch}
        />
      </Box>
      <BooksTable books={books} tableHeaders={CatalogueHeaders} loading={loading} />
    </Box>
  );
};
export default Catalogue;
