import Stack from '@mui/material/Stack';
import { Divider, Skeleton, SkeletonProps } from '@mui/material';
import { THUMBNAIL_SIZES } from '../utils/constants.ts';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import BackButton from './BackButton.tsx';

const SectionSkeleton: React.FC<SkeletonProps> = ({
  animation = 'wave',
  variant = 'rectangular',
  ...props
}) => {
  return <Skeleton animation={animation} variant={variant} {...props} />;
};

const LoadingBookDetails: React.FC = () => {
  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <BackButton />
          <SectionSkeleton style={{ ...THUMBNAIL_SIZES['lg'] }} />
          <Stack spacing={1}>
            <Typography variant="h3">
              <SectionSkeleton width={400} />
            </Typography>
            <Typography variant="h6">
              <SectionSkeleton width={200} />
            </Typography>
            <SectionSkeleton width={200} height={24} />
          </Stack>
        </Stack>
        <SectionSkeleton width={100} height={40} />
      </Stack>

      <Stack direction="row" spacing={1}>
        <SectionSkeleton width={80} height={20} />
        <SectionSkeleton width={80} height={20} />
        <SectionSkeleton width={80} height={20} />
      </Stack>

      <SectionSkeleton height={200} />

      <Typography variant="body2" color="textSecondary">
        <SectionSkeleton width={300} />
      </Typography>

      <Divider />

      <Typography variant="h6" gutterBottom={true}>
        <SectionSkeleton width={200} />
      </Typography>
      <Stack direction="row" spacing={1}>
        <SectionSkeleton height={100} width={'50%'} />
        <SectionSkeleton height={100} width={'50%'} />
      </Stack>
    </Stack>
  );
};
export default LoadingBookDetails;
