import Stack from '@mui/material/Stack';
import { Divider, IconButton, Skeleton } from '@mui/material';
import { LARGE_THUMBNAIL } from '../utils/constants.ts';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';

const LoadingBookDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{ width: '100%', height: '100%', padding: '25px', borderRadius: '10px' }}
    >
      <Stack spacing={3}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton aria-label="back" onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
            <Skeleton
              variant="circular"
              width={LARGE_THUMBNAIL}
              height={LARGE_THUMBNAIL}
              animation="wave"
            />
            <Stack spacing={1}>
              <Typography variant="h3">
                <Skeleton width={400} animation="wave" />
              </Typography>
              <Typography variant="h6">
                <Skeleton width={200} animation="wave" />
              </Typography>
              <Skeleton variant="rectangular" width={200} height={24} animation="wave" />
            </Stack>
          </Stack>
          <Skeleton variant="rectangular" width={100} height={40} animation="wave" />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Skeleton variant="rectangular" width={80} height={20} animation="wave" />
          <Skeleton variant="rectangular" width={80} height={20} animation="wave" />
          <Skeleton variant="rectangular" width={80} height={20} animation="wave" />
        </Stack>

        <Skeleton variant="rectangular" height={200} animation="wave" />

        <Typography variant="body2" color="textSecondary">
          <Skeleton width={300} animation="wave" />
        </Typography>

        <Divider />

        <Typography variant="h6" gutterBottom>
          <Skeleton animation="wave" width={200} />
        </Typography>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rectangular" height={100} width={'50%'} animation="wave" />
          <Skeleton variant="rectangular" height={100} width={'50%'} animation="wave" />
        </Stack>
      </Stack>
    </Paper>
  );
};
export default LoadingBookDetails;
