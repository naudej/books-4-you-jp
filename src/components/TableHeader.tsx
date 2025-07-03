import * as React from 'react';
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

const TableHeader: React.FC<TableHeaderProps> = ({ order, orderBy, onRequestSort, headers }) => {
  const createSortHandler = (property: keyof Book) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            role="button"
            onClick={() => createSortHandler(header.id)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            key={header.id}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === header.id}
              direction={orderBy === header.id ? order : 'asc'}
            >
              {header.label}
              {orderBy === header.id ? (
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
