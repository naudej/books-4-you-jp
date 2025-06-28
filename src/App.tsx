import * as React from 'react';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createTheme } from '@mui/material/styles';

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

// const NAVIGATION: Navigation = [
//     {
//         title: 'Catalogue',
//     },
//     {
//         title: 'BookDetails',
//         pattern: 'book{/:employeeId}*',
//     },
// ];

//@TODO CHeck this
const BRANDING = {
  title: 'Books 4 You!',
  homeUrl: '/',
};

//@TODO Add a pre-push for simple-git-hooks that run the NPM tests
//@TODO Page Error boundary see App.tsx (libraries/client-core/src/components/layout/Page.tsx)
//@TODO Add suspense fallback with 404 page cannot be found or something went wrong
//@TODO NEXT STEP: LOCALIZATION
//@TODO: Super nice to have a detector if the user is disconnected from the internet
export default function App() {
  return (
    <ReactRouterAppProvider theme={theme} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
