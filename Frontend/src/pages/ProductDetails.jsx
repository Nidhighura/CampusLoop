import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiMapPin, FiClock, FiCheckCircle, FiShield, FiPhoneCall } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [contactInfo, setContactInfo] = useState(null);
  const [loadingContact, setLoadingContact] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowContact = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first to view seller contact details!");
      navigate('/login');
      return;
    }
    
    setLoadingContact(true);
    try {
      const res = await api.get(`/contact/products/${id}`);
      if (res.data.success) {
        setContactInfo(res.data.data);
        toast.success("Contact details revealed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch contact details');
    } finally {
      setLoadingContact(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found.</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  // Extract image using same logic as ProductCard
  const displayImage = 
    product.imageUrl || 
    product.image_url ||
    (product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null) || 
    (product.images && product.images.length > 0 ? product.images[0].imageUrl : null) || 
    product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <FiChevronLeft className="mr-1 h-5 w-5" />
        Back to listings
      </Link>

      <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Main Image Section */}
          <div className="aspect-w-4 aspect-h-3 lg:aspect-none lg:h-full bg-gray-800 relative group">
            {displayImage ? (
              <img
                src={displayImage}
                alt={product.title}
                className="object-cover object-center w-full h-full lg:absolute lg:inset-0"
              />
            ) : (
              <div className="w-full h-full lg:absolute lg:inset-0 flex items-center justify-center text-gray-500 font-medium">
                No Image Provided
              </div>
            )}
            
            {product.sold && (
              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wide shadow-md">
                Sold Out
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            
            {/* Core Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-900/30 text-primary-400 border border-primary-800/50">
                    {product.category}
                 </span>
                 <div className="flex items-center text-gray-500 text-sm">
                   <FiClock className="mr-1.5" />
                   {new Date(product.createdAt).toLocaleDateString()}
                 </div>
              </div>
              
              <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-4">
                {product.title}
              </h1>
              
              <p className="text-4xl font-bold text-white mb-8">
                ₹{product.price}
              </p>

              <div className="prose prose-sm sm:prose prose-invert text-gray-400 mb-10">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Description</h3>
                <p className="leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Seller Card */}
            <div className="mt-auto pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Seller Information</h3>
              <div className="bg-gray-950 rounded-xl p-5 border border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary-900/50 flex items-center justify-center text-primary-400 font-bold text-xl border border-primary-800">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center">
                        {product.seller.name}
                        {product.seller.verified && (
                          <FiCheckCircle className="ml-1.5 text-blue-400" title="Verified Student" />
                        )}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiMapPin className="mr-1.5 text-gray-600" />
                        {product.seller.collegeName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Action */}
                <div className="mt-6">
                  {contactInfo ? (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-sm animate-fade-in">
                      <p className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Contact Details Unlocked</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-200 font-medium">
                          <FiPhoneCall className="mr-3 text-primary-500 h-5 w-5" />
                          <a href={`tel:${contactInfo.phoneNumber}`} className="hover:text-primary-400 transition-colors">{contactInfo.phoneNumber}</a>
                        </div>
                        <div className="flex items-center text-gray-200 font-medium pt-1">
                          <FiMapPin className="mr-3 text-primary-500 h-5 w-5" />
                          <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-400 transition-colors">{contactInfo.email}</a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleShowContact}
                      disabled={loadingContact}
                      className="w-full flex justify-center items-center px-4 py-3 border border-gray-700 shadow-sm text-sm font-semibold rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-primary-500 transition-colors disabled:opacity-50"
                    >
                      {loadingContact ? 'Unlocking...' : (
                        <>
                          <FiShield className="mr-2 h-5 w-5 text-gray-500" />
                          Show Seller Contact Options
                        </>
                      )}
                    </button>
                  )}
                  <p className="mt-3 text-xs text-center text-gray-500">
                    Always arrange to meet on campus in public, well-lit spaces.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
