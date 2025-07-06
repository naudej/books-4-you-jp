import { CircularProgress, TableCell, TableRow } from '@mui/material';
import EmptyMessage from './EmptyMessage.tsx';

interface EmptyRowProps {
  colSpan: number;
  loading?: boolean;
}
const EmptyRow = ({ colSpan, loading = false }: EmptyRowProps) => (
  <TableRow aria-busy={loading} sx={{ height: 200 }}>
    <TableCell colSpan={colSpan} align="center">
      {loading ? (
        <CircularProgress aria-hidden={true} color="primary" size={60} />
      ) : (
        <EmptyMessage />
      )}
    </TableCell>
  </TableRow>
);
export default EmptyRow;
