import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Chip, Divider, Grid, Link } from '@mui/material';
import { LARGE_THUMBNAIL } from '../utils/constants.ts';
import { useParams } from 'react-router';
import useBookById from '../data/useBookById.ts';
import Stack from '@mui/material/Stack';
import DOMPurify from 'dompurify';
import BuyButton from '../components/BuyButton.tsx';
import InfoItem from '../components/InfoItem.tsx';
import LoadingBookDetails from '../components/LoadingBookDetails.tsx';
import BackButton from '../components/BackButton.tsx';
import ErrorBox from '../components/ErrorBox.tsx';

const BookDetails: React.FC = () => {
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
          spacing={1}
        >
          <BackButton />
          {/*//@TODO Use BookPreviewImage here variant sm and variant lg*/}
          <Avatar
            alt={title}
            src={thumbnail}
            sx={{ width: LARGE_THUMBNAIL, height: LARGE_THUMBNAIL }}
          >
            {title.charAt(0)}
          </Avatar>
          <Stack direction="column" spacing={2}>
            <Typography noWrap={true} variant="h5">
              {title}
            </Typography>
            {subtitle && (
              <Typography noWrap={true} variant="h6" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem={true} />}
              spacing={2}
            >
              {authors.map((author) => (
                <Typography noWrap={true} color="textSecondary" variant="subtitle2" key={author}>
                  {author}
                </Typography>
              ))}
            </Stack>
            {/*//@TODO need to assign icons and colors to different known categories*/}
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
          <Chip label={category} variant="outlined" key={category} />
        ))}
      </Stack>
      {/*//@TODO for long descriptions + mobile view add a show more*/}
      {description && (
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      )}
      <Typography variant="body2" color="textSecondary">
        Do you want to know more?{' '}
        <Link href={previewLink} target="_blank" variant="body2">
          Click here
        </Link>
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom={true}>
        Additional Information:
      </Typography>
      <Grid container={true}>
        <Grid size={6}>
          <Stack spacing={1}>
            <InfoItem label="ID" value={book.id} />
            <InfoItem label="ISBN" value={book.isbn} />
            <InfoItem label="Language" value={book.language} />
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack spacing={1}>
            <InfoItem label="Published Date" value={book.publishedDate} />
            <InfoItem label="Publisher" value={book.publisher} />
            <InfoItem label="Page Count" value={book.pageCount} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default BookDetails;
