import * as React from 'react';
import { Outlet, useLocation, useParams, matchPath } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Paper from '@mui/material/Paper';

export default function Dashboard() {
  const location = useLocation();
  const { bookTitle } = useParams();

  const rootPath = matchPath('/', location.pathname);

  const title = React.useMemo(() => {
    if (rootPath) {
      return `Catalogue`;
    }
    return undefined;
  }, [location.pathname, bookTitle]);

  return (
    <DashboardLayout hideNavigation={true}>
      <PageContainer title={title}>
        <Paper
          elevation={3}
          sx={{ width: '100%', height: '100%', padding: '25px', borderRadius: '10px' }}
        >
          <Outlet />
        </Paper>
      </PageContainer>
    </DashboardLayout>
  );
}
