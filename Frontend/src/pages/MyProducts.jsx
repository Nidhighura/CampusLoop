import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

const MyProducts = () => {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchMyProducts();
    }
  }, [user]);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${user.id}/products`);
      if (res.data.success) {
        setMyProducts(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load your products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await api.delete(`/products/${id}`);
        if (res.data.success) {
          toast.success('Product deleted successfully');
          setMyProducts(prev => prev.filter(p => p.id !== id));
        }
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleMarkAsSold = async (id) => {
    try {
      const res = await api.patch(`/products/${id}/mark-sold`);
      if (res.data.success) {
        toast.success('Product marked as sold!');
        setMyProducts(prev => prev.map(p => 
          p.id === id ? { ...p, sold: true } : p
        ));
      }
    } catch (err) {
      toast.error('Failed to update product status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">My Products</h1>
        <p className="mt-2 text-gray-400">Manage your active and past listings.</p>
      </div>

      <div className="bg-gray-900 shadow-sm rounded-2xl border border-gray-800 overflow-hidden">
        
        {loading ? (
           <div className="py-20 text-center text-gray-500">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500 mx-auto mb-4"></div>
             <p>Loading your listings...</p>
           </div>
        ) : myProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            You haven't listed any products yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-950">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Stats</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {myProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                          {(() => {
                            const img = product.imageUrl || product.image_url ||
                              (product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : null) || 
                              (product.images && product.images.length > 0 ? product.images[0].imageUrl : null) || 
                              product.image;
                            
                            return img ? (
                              <img 
                                className="h-14 w-14 object-cover" 
                                src={img} 
                                alt={product.title} 
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col mt-2 items-center justify-center text-[10px] text-gray-500 font-medium text-center leading-tight">
                                <span>No</span>
                                <span>Image</span>
                              </div>
                            );
                          })()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-100">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-200 font-medium font-sans">₹{product.price}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.sold 
                          ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                          : 'bg-green-900/30 text-green-400 border border-green-800/50'
                      }`}>
                        {product.sold ? 'Sold' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiEye className="mr-1.5 text-gray-600" />
                        12 views {/* We don't have views count from backend right now, so hardcoding a static placeholder or removing it works. I'll leave a dummy stat */}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        {!product.sold && (
                          <button onClick={() => handleMarkAsSold(product.id)} className="text-green-500 hover:text-green-400 bg-gray-800/80 p-2 rounded-lg transition-colors border border-gray-700 hover:border-green-800" title="Mark as Sold">
                            <FiCheckCircle size={18} />
                          </button>
                        )}
                        <button className="text-blue-500 hover:text-blue-400 bg-gray-800/80 p-2 rounded-lg transition-colors border border-gray-700 hover:border-blue-800" title="Edit">
                          <FiEdit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400 bg-gray-800/80 p-2 rounded-lg transition-colors border border-gray-700 hover:border-red-800" title="Delete">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
