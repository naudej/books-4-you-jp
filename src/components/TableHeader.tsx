import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Book, HeadCell, Order } from '../data/types.ts';

interface TableHeaderProps {
  onRequestSort: (property: keyof Book) => void;
  order: Order;
  orderBy: string;
  headers: HeadCell[];
}

const TableHeader = ({ order, orderBy, onRequestSort, headers }: TableHeaderProps) => {
  const createSortHandler = (property: keyof Book) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ id, label }) => (
          <TableCell
            role="button"
            onClick={() => createSortHandler(id)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            key={id}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              aria-label={`Sort by ${label}`}
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;
