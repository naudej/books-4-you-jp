import Stack from '@mui/material/Stack';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { MEDIUM_ICON } from '../utils/constants.ts';
import { Typography } from '@mui/material';

interface EmptyMessageProps {
  isMobile?: boolean;
}
const EmptyMessage = ({ isMobile = false }: EmptyMessageProps) => (
  <>
    <Stack
      spacing={1}
      direction="row"
      sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mb: '15px' }}
    >
      <SentimentDissatisfiedIcon
        aria-hidden={true}
        color="disabled"
        sx={{ fontSize: MEDIUM_ICON }}
      />
      <Typography aria-label="No Books found" variant="h5">
        No books found.
      </Typography>
    </Stack>
    <Typography variant="body1" align={isMobile ? 'center' : undefined} color="textSecondary">
      I hope you were looking for a very obscure book, otherwise this is a little awkward.
    </Typography>
  </>
);
export default EmptyMessage;
