import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import AddBook from '../form/AddBook';
import { SnackbarProvider } from '../context/SnackBarContext.tsx';

const renderWithRouter = () => {
  const routes = [
    {
      path: '/',
      element: (
        <SnackbarProvider>
          <AddBook open={true} />{' '}
        </SnackbarProvider>
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
};

describe('AddBook', () => {
  beforeEach(() => {
    renderWithRouter();
  });

  it('shows validation error for empty title', async () => {
    fireEvent.blur(screen.getByTestId('title-input'));

    await waitFor(() => {
      expect(screen.getByText(/Every book needs a title/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for Elon Musks children', async () => {
    const authorInput = screen.getByTestId('author-input');
    fireEvent.change(authorInput, { target: { value: 'A1' } });
    fireEvent.blur(authorInput);

    await waitFor(() => {
      expect(
        screen.getByText(
          /Only Elon Musk would burden his child with digits in their name, dont be that person too./i,
        ),
      ).toBeInTheDocument();
    });
  });

  it('shows validation error if the authors name is too short', async () => {
    const authorInput = screen.getByTestId('author-input');
    fireEvent.change(authorInput, { target: { value: 'A' } });
    fireEvent.blur(authorInput);

    await waitFor(() => {
      expect(
        screen.getByText(/A name should at least have more than 2 letters/i),
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for empty author', async () => {
    fireEvent.blur(screen.getByTestId('author-input'));

    await waitFor(() => {
      expect(screen.getByText(/Was the book written by a ghost?/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for empty ISBN', async () => {
    fireEvent.blur(screen.getByTestId('isbn-input'));

    await waitFor(() => {
      expect(
        screen.getByText(/Librarians would be mad without this, please dont make one cry/i),
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid ISBN-13', async () => {
    const isbnInput = screen.getByTestId('isbn-input');
    const invalidISBN = '123-4-567-89012-3';
    fireEvent.input(isbnInput, { target: { value: invalidISBN } });
    fireEvent.focus(isbnInput);
    fireEvent.blur(isbnInput);

    await screen.findByText(/Invalid ISBN for selected type/i);
  });

  it('does not show validation error for valid ISBN-13', async () => {
    const isbnInput = screen.getByTestId('isbn-input');
    const validISBN = '978-0-306-40615-7';

    fireEvent.input(isbnInput, { target: { value: validISBN } });
    fireEvent.focus(isbnInput);
    fireEvent.blur(isbnInput);

    await waitFor(() => {
      const error = screen.queryByText(/Invalid ISBN for selected type/i);
      expect(error).not.toBeInTheDocument();
    });
  });

  it('shows validation error for Invalid ISBN-10', async () => {
    const isbnInput = screen.getByTestId('isbn-input');
    const radio = document.getElementById('isbn-10-radio') as HTMLInputElement;
    fireEvent.click(radio);

    fireEvent.input(isbnInput, { target: { value: '0123789' } });
    fireEvent.focus(isbnInput);
    fireEvent.blur(isbnInput);

    await screen.findByText(/Invalid ISBN for selected type/i);
  });

  it('does not show validation error for valid ISBN-10', async () => {
    const isbnInput = screen.getByTestId('isbn-input');
    const validISBN = '0-306-40615-2';
    const radio = document.getElementById('isbn-10-radio') as HTMLInputElement;
    fireEvent.click(radio);

    fireEvent.input(isbnInput, { target: { value: validISBN } });
    fireEvent.focus(isbnInput);
    fireEvent.blur(isbnInput);

    await waitFor(() => {
      const error = screen.queryByText(/Invalid ISBN for selected type/i);
      expect(error).not.toBeInTheDocument();
    });
  });

  it('does not show validation error for valid ISBN-10 that ends in X', async () => {
    const isbnInput = screen.getByTestId('isbn-input');
    const validISBN = '0-8044-2957-X';
    const radio = document.getElementById('isbn-10-radio') as HTMLInputElement;
    fireEvent.click(radio);

    fireEvent.input(isbnInput, { target: { value: validISBN } });
    fireEvent.focus(isbnInput);
    fireEvent.blur(isbnInput);

    await waitFor(() => {
      const error = screen.queryByText(/Invalid ISBN for selected type/i);
      expect(error).not.toBeInTheDocument();
    });
  });
});
