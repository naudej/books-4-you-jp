import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

type InfoItemProps = {
  label: string;
  value?: string | number | null;
};

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
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
