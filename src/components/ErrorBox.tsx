import * as React from 'react';
import BackButton from './BackButton.tsx';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import { LARGE_ICON } from '../utils/constants.ts';

interface ErrorBoxProps {
  showBackButton?: boolean;
}
const ErrorBox: React.FC<ErrorBoxProps> = ({ showBackButton = true }) => (
  <>
    {showBackButton && <BackButton />}
    <Stack
      spacing={2}
      direction="column"
      sx={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}
    >
      <WarningAmberIcon color="error" sx={{ fontSize: LARGE_ICON }} />
      <Typography variant="h5">Oops something went wrong!!</Typography>
      <Typography variant="body2" color="textSecondary">
        Classic demo day issues
      </Typography>
    </Stack>
  </>
);
export default ErrorBox;
