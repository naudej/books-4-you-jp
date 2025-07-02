import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Paper from '@mui/material/Paper';
import { SnackbarProvider } from './context/SnackBarContext.tsx';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout hideNavigation={true}>
      <SnackbarProvider>
        <PageContainer>
          <Paper
            elevation={3}
            sx={{ width: '100%', height: '100%', padding: '25px', borderRadius: '10px' }}
          >
            <Outlet />
          </Paper>
        </PageContainer>
      </SnackbarProvider>
    </DashboardLayout>
  );
};
export default Dashboard;
