import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import BookPreviewImage from './BookPreviewImage';
import { blue } from '@mui/material/colors';
import { Book } from '../data/types.ts';
import { format } from 'date-fns';

interface BookRowProps {
  book: Book;
  onClick: (id: string) => void;
}

const BookRow = ({ book, onClick }: BookRowProps) => {
  const { id, title, isbn, authors, publishedDate, categories, thumbnail } = book;

  return (
    <TableRow
      tabIndex={0}
      hover={true}
      aria-label={`View details for ${title}`}
      sx={{
        cursor: 'pointer',
        '&:focus-visible': {
          border: '2px solid white',
          borderRadius: '5px',
        },
      }}
      onClick={() => onClick(id)}
      key={id}
    >
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
              aria-hidden={true}
              sx={{
                bgcolor: blue[300],
                width: 30,
                height: 30,
                marginRight: '10px',
              }}
            >
              {author.charAt(0)}
            </Avatar>
            <Typography aria-label={`Author ${author}`} variant="body1">
              {author}
            </Typography>
          </Box>
        ))}
      </TableCell>
      <TableCell aria-label={`Published on ${publishedDate}`}>
        {publishedDate ? format(publishedDate, 'dd/MM/yyyy') : 'Unknown'}
      </TableCell>
      <TableCell>
        {categories.map((category) => (
          <Typography
            aria-label={category}
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
