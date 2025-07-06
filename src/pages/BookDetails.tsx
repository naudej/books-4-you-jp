import Typography from '@mui/material/Typography';
import { Chip, Divider, Grid, Link } from '@mui/material';
import { useParams } from 'react-router';
import useBookById from '../data/useBookById.ts';
import Stack from '@mui/material/Stack';
import DOMPurify from 'dompurify';
import BuyButton from '../components/BuyButton.tsx';
import InfoItem from '../components/InfoItem.tsx';
import LoadingBookDetails from '../components/LoadingBookDetails.tsx';
import BackButton from '../components/BackButton.tsx';
import ErrorBox from '../components/ErrorBox.tsx';
import BookPreviewImage from '../components/BookPreviewImage.tsx';
import { format } from 'date-fns';

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { book, loading, error } = useBookById(bookId);

  if (loading) {
    return <LoadingBookDetails />;
  }

  if (!book || error) {
    return <ErrorBox />;
  }

  const {
    title,
    thumbnail,
    authors,
    description,
    subtitle,
    categories,
    previewLink,
    buyLink,
    retailPrice,
    publishedDate,
    id,
    publisher,
    pageCount,
    isbn,
    language,
  } = book;
  return (
    <Stack spacing={3} direction="column">
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
          }}
          spacing={2}
        >
          <BackButton />
          <BookPreviewImage title={title} src={thumbnail} variant="lg" />
          <Stack direction="column" spacing={2}>
            <Typography noWrap={true} aria-label={title} variant="h5">
              {title}
            </Typography>
            {subtitle && (
              <Typography noWrap={true} aria-label={subtitle} variant="h6" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" aria-hidden={true} flexItem={true} />}
              spacing={2}
            >
              {authors.map((author) => (
                <Typography
                  noWrap={true}
                  color="textSecondary"
                  aria-label={author}
                  variant="subtitle2"
                  key={author}
                >
                  {author}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack>{retailPrice && buyLink && <BuyButton link={buyLink} price={retailPrice} />}</Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap={true}
        flexWrap="wrap"
        sx={{ maxWidth: '100%' }}
      >
        {categories.map((category) => (
          <Chip label={category} variant="outlined" aria-label={category} key={category} />
        ))}
      </Stack>
      {description && (
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      )}
      <Typography variant="body2" color="textSecondary">
        Do you want to know more?
        <Link
          href={previewLink}
          aria-label={`Find out more about ${title}`}
          target="_blank"
          variant="body2"
        >
          Click here
        </Link>
      </Typography>
      <Divider />
      <Typography variant="h6" aria-label="Additional information" gutterBottom={true}>
        Additional Information:
      </Typography>
      <Grid container={true}>
        <Grid size={6}>
          <Stack spacing={1}>
            <InfoItem label="ID" value={id} />
            <InfoItem label="ISBN" value={isbn} />
            <InfoItem label="Language" value={language} />
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack spacing={1}>
            <InfoItem
              label="Published Date"
              value={publishedDate ? format(publishedDate, 'dd/MM/yyyy') : 'Unknown'}
            />
            <InfoItem label="Publisher" value={publisher} />
            <InfoItem label="Page Count" value={pageCount} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default BookDetails;
