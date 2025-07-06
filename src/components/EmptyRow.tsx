import { CircularProgress, TableCell, TableRow, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Stack from '@mui/material/Stack';
import { MEDIUM_ICON } from '../utils/constants.ts';

const EmptyMessage = () => (
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
    <Typography variant="body1" color="textSecondary">
      I hope you were looking for a very obscure book, otherwise this is a little awkward.
    </Typography>
  </>
);

interface EmptyRowProps {
  colSpan: number;
  loading?: boolean;
}
const EmptyRow = ({ colSpan, loading = false }: EmptyRowProps) => (
  <TableRow aria-busy={loading} sx={{ height: 200 }}>
    <TableCell colSpan={colSpan} align="center">
      {loading ? <CircularProgress aria-hidden={true} size={60} /> : <EmptyMessage />}
    </TableCell>
  </TableRow>
);
export default EmptyRow;
