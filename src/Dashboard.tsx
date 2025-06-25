import * as React from 'react';
import { Outlet, useLocation, useParams, matchPath } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Dashboard() {
  const location = useLocation();
  const { bookTitle } = useParams();

  const title = React.useMemo(() => {
    if (matchPath('/', location.pathname)) {
      return `Catalogue`;
    }
    // if (matchPath('/book/:bookId', location.pathname)) {
    //     return `${bookTitle}`;
    // }
    return undefined;
  }, [location.pathname, bookTitle]);

  return (
    <DashboardLayout hideNavigation>
      <PageContainer title={title}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
