import React, { useEffect, useMemo, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CATEGORIES = ['All items', 'Books', 'Electronics', 'Furniture', 'Notes', 'Other'];
const CATEGORY_API_MAP = {
  Books: 'BOOKS',
  Electronics: 'ELECTRONICS',
  Furniture: 'FURNITURE',
  Notes: 'NOTES',
  Other: 'OTHERS',
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All items');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: '0',
        size: '20',
      });

      if (activeCategory !== 'All items') {
        params.set('category', CATEGORY_API_MAP[activeCategory]);
      }

      const res = await api.get(`/products?${params.toString()}`);
      if (res.data.success) {
        setProducts(res.data.data.items);
      }
    } catch (err) {
      setProducts([]);
      setError('Failed to load products');
      toast.error('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 sm:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
            Buy & Sell within your <span className="text-primary-500 block sm:inline">College Community</span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            A trusted marketplace exclusively for verified students. Find cheap books, notes, and dorm essentials right on campus.
          </p>
          <div className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <SearchBar
              initialValue=""
              className="w-full"
              placeholder="What are you looking for?"
              inputClassName="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg leading-5 bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              buttonClassName="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Categories / Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-primary-400 transition-colors">
            <FiFilter />
            <span>More Filters</span>
          </button>
        </div>

        {/* Product Grid */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
              {activeCategory === 'All items' ? 'Recently Added' : `${activeCategory} for Sale`}
            </h2>
            <div className="text-sm text-gray-400">
              {loading ? 'Refreshing...' : `${products.length} item${products.length === 1 ? '' : 's'} available`}
            </div>
          </div>
          
          {loading ? (
             <div className="py-20 text-center text-gray-500">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
               <p>Loading products...</p>
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
              <h3 className="text-lg font-medium text-gray-200">No products found</h3>
              <p className="mt-2 text-gray-500">
                We couldn't find anything in "{activeCategory}". Try exploring other categories!
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Home;
