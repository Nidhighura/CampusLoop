import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError('');
      try {
        if (!query.trim()) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const params = new URLSearchParams({
          page: '0',
          size: '50', // Fetch a larger batch for search results
          search: query.trim() // Backend API explicitly expects 'search'
        });

        const res = await api.get(`/products?${params.toString()}`);
        if (res.data.success) {
          setProducts(res.data.data.items);
        }
      } catch (err) {
        setProducts([]);
        setError(err.response?.data?.message || 'Failed to search products');
        toast.error('Failed to load search results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full flex-1">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-100 mb-6 transition-colors">
        <FiChevronLeft className="mr-1 h-5 w-5" />
        Back to Home
      </Link>

      <div className="flex justify-between items-end mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
          Search results for "<span className="text-primary-500">{query}</span>"
        </h1>
        <div className="text-sm text-gray-400 font-medium">
          {loading ? 'Searching...' : `${products.length} item${products.length === 1 ? '' : 's'} found`}
        </div>
      </div>

      <section>
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p>Searching for matches...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center bg-red-900/20 rounded-2xl border border-red-800/50">
            <h3 className="text-lg font-medium text-red-400">Search failed</h3>
            <p className="mt-2 text-red-500">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-900 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-medium text-gray-200">No results found</h3>
            <p className="mt-2 text-gray-500">
              We couldn't find anything matching "{query}". Try another keyword or check your spelling.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
