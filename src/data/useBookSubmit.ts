import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { BookFormFields } from './types.ts';
import { submitBook } from './api.ts';
import { useSnackbar } from '../context/SnackBarContext.tsx';

export const useBookSubmit = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const submit = useCallback(
    async (values: BookFormFields) => {
      try {
        await submitBook(values);
        showSnackbar({
          message: 'What it was actually successful? Something is fishy here!',
          type: 'success',
        });
      } catch (error) {
        console.error(error);
        showSnackbar({
          message:
            'Lets all pretend that was successful, we all know it wasnt ;) because Google API is read-only',
          type: 'success',
          autoHideDuration: 10000,
        });
      } finally {
        navigate(-1);
      }
    },
    [navigate, showSnackbar],
  );

  return { submit };
};
