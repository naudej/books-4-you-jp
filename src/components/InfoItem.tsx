import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface InfoItemProps {
  label: string;
  value?: string | number | null;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <Box>
    <Typography variant="body1" display="inline">
      {label}:{' '}
    </Typography>
    <Typography variant="body2" color="textSecondary" display="inline">
      {value ?? 'N/A'}
    </Typography>
  </Box>
);
export default InfoItem;
