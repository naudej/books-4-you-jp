import { Book } from '../data/types.ts';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import EmptyMessage from './EmptyMessage.tsx';
import { truncText } from '../utils/utils.ts';

interface BooksCardsProps {
  books: Book[];
  loading?: boolean;
}
const BooksCards = ({ books, loading }: BooksCardsProps) => {
  const navigate = useNavigate();
  const onRowClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  if (loading) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <CircularProgress aria-hidden={true} color="primary" size={80} />
      </Stack>
    );
  }

  if (books.length === 0) {
    return <EmptyMessage isMobile={true} />;
  }

  return (
    <Grid container={true} spacing={2}>
      {books.map(({ id, thumbnail, title, authors, isbn, publishedDate }) => (
        <Grid size={12} key={id}>
          <Card>
            <CardActionArea onClick={() => onRowClick(id)}>
              <Stack direction="row">
                <Stack alignItems="center" justifyContent="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: '100%', objectFit: 'cover' }}
                    image={thumbnail}
                    alt={title}
                  />
                </Stack>
                <CardContent>
                  <Typography aria-label={title} variant="h6">
                    {truncText(title)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {authors.join(', ')}
                  </Typography>
                  <Typography aria-label={isbn} variant="body2" color="textSecondary">
                    ISBN: {isbn}
                  </Typography>
                  <Typography
                    aria-label={publishedDate ? format(publishedDate, 'dd/MM/yyyy') : 'Unknown'}
                    variant="body2"
                    color="textSecondary"
                  >
                    Published: {publishedDate ? format(publishedDate, 'dd/MM/yyyy') : 'Unknown'}
                  </Typography>
                </CardContent>
              </Stack>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default BooksCards;
