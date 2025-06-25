import * as React from 'react';
import BooksTable from '../components/BooksTable.tsx';
import { useBookData } from '../data/useBookData.tsx';
import { HeadCell, SearchOption } from '../data/types.ts';
import { Box } from '@mui/material';
import SearchInput from '../components/SearchInput.tsx';

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
  const { books, loading } = useBookData();
  const searchOptions: SearchOption[] = books.map(({ id, title }) => ({ id, title }));
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Box>
      <Box mb={4}>
        <SearchInput
          label="Search Books"
          placeholder="Start typing to find a book"
          initialValues={searchOptions}
          loading={loading}
          onSearch={handleSearch}
        />
      </Box>
      <BooksTable books={books} tableHeaders={CatalogueHeaders} />
    </Box>
  );
};
export default Catalogue;
