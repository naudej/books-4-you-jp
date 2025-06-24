import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Dashboard from "./Dashboard.tsx";
import Catalogue from "./pages/Catalogue.tsx";
import BookDetails from "./pages/BookDetails.tsx";

//https://github.com/mui/toolpad/blob/v0.16.0/examples/core/crud-vite/src/App.tsx
const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Dashboard,
                children: [
                    {
                        path: '',
                        Component: Catalogue,
                    },
                    {
                        path: '/book/:bookId/*',
                        Component: BookDetails,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
