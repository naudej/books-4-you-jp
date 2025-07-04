import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Catalogue from './pages/Catalogue.tsx';
import BookDetails from './pages/BookDetails.tsx';
import Dashboard from './Dashboard.tsx';
import React from 'react';
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
          {
            path: '/create',
            Component: Catalogue,
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
