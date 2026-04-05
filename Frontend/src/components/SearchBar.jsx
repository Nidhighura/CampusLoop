import React, { useEffect, useRef, useState } from 'react';
import { FiLoader, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SearchBar = ({
  initialValue = '',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  placeholder = 'Search products...',
  compact = false,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return undefined;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await api.get(`/products?query=${encodeURIComponent(trimmedQuery)}&page=0&size=5`);
        const items = res.data?.data?.items ?? [];
        setSuggestions(items);
        setError('');
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setError('Could not load suggestions');
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

    const runSearch = (value = query) => {
      const trimmedQuery = value.trim();
      setShowSuggestions(false);
      if (!trimmedQuery) {
        // Just clear or maybe stay on the current page if empty
        return;
      }
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch();
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    runSearch(value);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className={`flex ${compact ? 'gap-2' : 'flex-col sm:flex-row gap-4'}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(event);
              }
            }}
            className={inputClassName}
            placeholder={placeholder}
          />

          {showSuggestions && query.trim().length >= 2 && (
            <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg shadow-black/50">
              {loadingSuggestions ? (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400">
                  <FiLoader className="animate-spin" />
                  <span>Loading suggestions...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSuggestionClick(product.title)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <span className="truncate">{product.title}</span>
                    <span className="ml-4 shrink-0 text-xs text-gray-500">{product.category}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  {error || 'No suggestions found'}
                </div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className={buttonClassName}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
