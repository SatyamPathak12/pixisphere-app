import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import usePhotographerStore from '../store/usePhotographerStore';

const SearchBar = ({ value, onChange }) => {
  const [input, setInput] = useState(value || '');
  const { fetchPhotographers } = usePhotographerStore();

  const debouncedFetch = useCallback(
    debounce((searchTerm) => {
      fetchPhotographers(searchTerm);
      onChange && onChange(searchTerm);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(input);
  }, [input]);

  return (
    <input
      type="text"
      placeholder="Search photographers..."
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;

