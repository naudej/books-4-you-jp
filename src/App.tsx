import * as React from 'react';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createTheme } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const BRANDING = {
  title: 'Books 4 You!',
  homeUrl: '/',
  logo: <AutoStoriesIcon color="primary" fontSize="large" />,
};

const App: React.FC = () => {
  return (
    <ReactRouterAppProvider theme={theme} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
};
export default App;
