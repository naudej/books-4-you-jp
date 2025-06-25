import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, Box } from '@mui/material';
import { Book } from '../data/types.ts';

const testObj = {
  id: 'raTsvgEACAAJ',
  isbn: '9781789460292',
  title: 'Harry',
  authors: ['Eugenie Herbst', 'Angela Levin'],
  categories: ['Biography & Autobiography'],
  publishedDate: '01/01/2019',
  thumbnail:
    'http://books.google.com/books/content?id=raTsvgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
};

const BookDetails: React.FC = () => {
  const book: Book = testObj;
  const { title, thumbnail } = book;
  return (
    <Paper
      elevation={3}
      sx={{ width: '100%', height: '100%', padding: '25px', borderRadius: '10px' }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {/*//@TODO need to add loading skeleton*/}
        <Avatar alt={title} src={thumbnail} sx={{ width: 56, height: 56 }}>
          {title.charAt(0)}
        </Avatar>
        <Typography variant="h4">{title}</Typography>
      </Box>
    </Paper>
  );
};
export default BookDetails;
