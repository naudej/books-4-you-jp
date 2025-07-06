import BackButton from './BackButton.tsx';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import { LARGE_ICON } from '../utils/constants.ts';

interface ErrorBoxProps {
  showBackButton?: boolean;
}
const ErrorBox = ({ showBackButton = true }: ErrorBoxProps) => (
  <>
    {showBackButton && <BackButton />}
    <Stack
      spacing={2}
      direction="column"
      sx={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}
    >
      <WarningAmberIcon aria-hidden={true} color="error" sx={{ fontSize: LARGE_ICON }} />
      <Typography aria-label="Error loading book details" variant="h5">
        Oops something went wrong!!
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Classic demo day issues
      </Typography>
    </Stack>
  </>
);
export default ErrorBox;
