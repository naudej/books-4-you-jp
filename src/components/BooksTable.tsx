import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHeader from './TableHeader.tsx';
import { Book, HeadCell, Order } from '../data/types.ts';
import { useNavigate } from 'react-router';
import BookRow from './BookRow.tsx';
import EmptyRow from './EmptyRow.tsx';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy] ?? '';
  const bValue = b[orderBy] ?? '';

  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator<Key extends keyof Book>(
  order: Order,
  orderBy: Key,
): (a: Book, b: Book) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface BooksTableProps {
  books: Book[];
  tableHeaders: HeadCell[];
  loading?: boolean;
}

const BooksTable: React.FC<BooksTableProps> = ({ books, tableHeaders, loading = false }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Book>('title');
  const navigate = useNavigate();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onRowClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const sortedBooks = React.useMemo(
    () => [...books].sort(getComparator(order, orderBy)),
    [books, order, orderBy],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              headers={tableHeaders}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedBooks.length === 0 && (
                <EmptyRow colSpan={tableHeaders.length} loading={loading} />
              )}
              {sortedBooks.map((book) => (
                <BookRow book={book} key={book.id} onClick={onRowClick} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default BooksTable;
