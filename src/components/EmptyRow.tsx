import { CircularProgress, TableCell, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Stack from '@mui/material/Stack';
import { MEDIUM_ICON } from '../utils/constants.ts';

const EmptyMessage: React.FC = () => (
  <>
    <Stack
      spacing={1}
      direction="row"
      sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mb: '15px' }}
    >
      <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: MEDIUM_ICON }} />
      <Typography variant="h5">No books found.</Typography>
    </Stack>
    <Typography variant="body1" color="text.secondary">
      I hope you were looking for a very obscure book, otherwise this is a little awkward.
    </Typography>
  </>
);

interface EmptyRowProps {
  colSpan: number;
  loading?: boolean;
}
const EmptyRow: React.FC<EmptyRowProps> = ({ colSpan, loading = false }) => (
  <TableRow sx={{ height: 200 }}>
    <TableCell colSpan={colSpan} align="center">
      {loading ? <CircularProgress size={60} /> : <EmptyMessage />}
    </TableCell>
  </TableRow>
);
export default EmptyRow;
