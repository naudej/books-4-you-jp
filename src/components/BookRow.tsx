import * as React from 'react';
import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import BookPreviewImage from './BookPreviewImage';
import { blue } from '@mui/material/colors';
import { Book } from '../data/types.ts';
import { format } from 'date-fns';

interface BookRowProps {
  book: Book;
  onClick: (id: string) => void;
}

const BookRow: React.FC<BookRowProps> = ({ book, onClick }) => {
  const { id, title, isbn, authors, publishedDate, categories, thumbnail } = book;

  return (
    <TableRow hover={true} onClick={() => onClick(id)} key={id}>
      <TableCell id={id}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookPreviewImage id={id} title={title} src={thumbnail} />
          <Typography variant="body1" pl="10px">
            {title}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{isbn}</TableCell>
      <TableCell>
        {authors.map((author) => (
          <Box
            key={`${author}-${id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              marginBottom: '10px',
            }}
          >
            <Avatar
              sx={{
                bgcolor: blue[300],
                width: 30,
                height: 30,
                marginRight: '10px',
              }}
            >
              {author.charAt(0)}
            </Avatar>
            <Typography variant="body1">{author}</Typography>
          </Box>
        ))}
      </TableCell>
      <TableCell> {publishedDate ? format(publishedDate, 'dd/MM/yyyy') : 'Unknown'}</TableCell>
      <TableCell>
        {categories.map((category) => (
          <Typography
            variant="body1"
            key={`${category}-${id}`}
            gutterBottom={categories.length > 1}
          >
            {category}
          </Typography>
        ))}
      </TableCell>
    </TableRow>
  );
};
export default BookRow;
