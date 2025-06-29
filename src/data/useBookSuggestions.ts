import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { SearchOption } from './types.ts';
import { API_BASE_URL } from '../utils/constants.ts';
import { bookApiSchema } from './bookSchema.ts';
import { useSnackbar } from '../context/SnackBarContext.tsx';

const useBookSuggestions = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showSnackbar } = useSnackbar();

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim().length < 3) {
          return;
        }
        setLoading(true);

        try {
          const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          const { items } = await bookApiSchema.validate(data);
          const foundSearchOptions: SearchOption[] = items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo?.title ?? '',
          }));
          setSearchOptions(foundSearchOptions);
        } catch (err) {
          showSnackbar({
            message: 'Failed to get suggestions for your books, Im sorry :(',
            type: 'error',
          });
        } finally {
          setLoading(false);
        }
      }, 400),
    [],
  );

  return {
    searchOptions,
    fetchSuggestions,
    loading,
  };
};

export default useBookSuggestions;
