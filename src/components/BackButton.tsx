import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton aria-label="back" onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </IconButton>
  );
};
export default BackButton;
