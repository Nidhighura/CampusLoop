import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Extract correct image URL falling back through possible backend schema structures
  const displayImage = 
    product.imageUrl || 
    product.image_url ||
    (product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null) || 
    (product.images && product.images.length > 0 ? product.images[0].imageUrl : null) || 
    product.image;

  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-800 overflow-hidden">
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={product.title || "Product Image"} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
            No Image Provided
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900/90 backdrop-blur-sm text-gray-300 shadow-sm border border-gray-700">
             {product.category || 'General'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100 truncate mb-1" title={product.title}>
          <Link to={`/products/${product.id}`} className="hover:text-primary-400 focus:outline-none">
            {/* Extended clickable area spanning the whole card text area */}
            <span className="absolute inset-0" aria-hidden="true" />
            {product.title}
          </Link>
        </h3>
        
        <p className="text-sm text-gray-400 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800">
          <p className="text-lg font-bold text-gray-100">
            ₹{product.price}
          </p>
          <p className="text-xs text-gray-500">
             {new Date(product.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
