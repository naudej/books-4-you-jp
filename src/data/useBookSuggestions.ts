import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { SearchOption } from './types';
import { useSnackbar } from '../context/SnackBarContext';
import { fetchBookSuggestions } from './api.ts';

const useBookSuggestions = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim().length < 3) {
          return;
        }

        setLoading(true);
        try {
          const suggestions = await fetchBookSuggestions(query);
          setSearchOptions(suggestions);
        } catch {
          showSnackbar({
            message: "Failed to get suggestions for your books, I'm sorry :(",
            type: 'error',
          });
        } finally {
          setLoading(false);
        }
      }, 500),
    [],
  );

  return {
    searchOptions,
    fetchSuggestions,
    loading,
  };
};

export default useBookSuggestions;
