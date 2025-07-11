import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHeader from './TableHeader.tsx';
import { Book, HeadCell, Order } from '../data/types.ts';
import { useNavigate } from 'react-router';
import BookRow from './BookRow.tsx';
import EmptyRow from './EmptyRow.tsx';
import { useMemo, useState } from 'react';

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
  initialSortBy?: keyof Book;
  initialOrder?: Order;
  onSortChange: (orderBy: keyof Book, order: Order) => void;
}

const BooksTable = ({
  books,
  tableHeaders,
  loading = false,
  initialSortBy,
  initialOrder,
  onSortChange,
}: BooksTableProps) => {
  const [order, setOrder] = useState<Order>(initialOrder || 'asc');
  const [orderBy, setOrderBy] = useState<keyof Book>(initialSortBy || 'title');
  const navigate = useNavigate();

  const handleRequestSort = (property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    const updatedOrder = isAsc ? 'desc' : 'asc';
    setOrder(updatedOrder);
    setOrderBy(property);
    onSortChange(property, updatedOrder);
  };

  const onRowClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const sortedBooks = useMemo(
    () => [...books].sort(getComparator(order, orderBy)),
    [books, order, orderBy],
  );

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="Book Catalogue" aria-busy={loading}>
          <TableHeader
            headers={tableHeaders}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {(sortedBooks.length === 0 || loading) && (
              <EmptyRow colSpan={tableHeaders.length} loading={loading} />
            )}
            {sortedBooks.map((book) => (
              <BookRow book={book} key={book.id} onClick={onRowClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default BooksTable;
