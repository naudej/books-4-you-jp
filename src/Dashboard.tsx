import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Paper from '@mui/material/Paper';
import { SnackbarProvider } from './context/SnackBarContext.tsx';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Button, Grid, Stack } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Typography from '@mui/material/Typography';
import type { ErrorInfo } from 'react';

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const navigate = useNavigate();
  const retry = () => {
    navigate('/');
    resetErrorBoundary();
  };

  return (
    <Grid
      container={true}
      sx={{ height: '100%', padding: '100px' }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={2} alignItems="center">
        <WarningAmberIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h4">Omg why is this happening!</Typography>
        <Typography variant="body1" color="textSecondary" textAlign="center">
          I hope the rest of the demo goes better, maybe I can win them over with my charm or at
          least being funny. Maybe being funny. Its a long shot.
        </Typography>
        <Button variant="contained" onClick={retry}>
          Retry
        </Button>
      </Stack>
    </Grid>
  );
};

const logError = (error: Error, info: ErrorInfo) => {
  console.error('I would usually log this to Sentry but for now, Uncaught error:', error);
  console.error('Component Stack:', info.componentStack);
};

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout hideNavigation={true}>
      <SnackbarProvider>
        <PageContainer>
          <Paper
            elevation={3}
            sx={{ width: '100%', height: '100%', padding: '25px', borderRadius: '10px' }}
          >
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
              <Outlet />
            </ErrorBoundary>
          </Paper>
        </PageContainer>
      </SnackbarProvider>
    </DashboardLayout>
  );
};
export default Dashboard;
