import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud, FiTag, FiDollarSign, FiType, FiFileText, FiX, FiLoader } from 'react-icons/fi';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '../utils/cloudinary';

const SellProduct = () => {
  const navigate = useNavigate();
  // State to hold final Cloudinary URLs
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const remainingSlots = 3 - images.length;
      const filesToProcess = selectedFiles.slice(0, remainingSlots);

      if (filesToProcess.length === 0) {
        toast.error("You can only upload a maximum of 3 photos.");
        return;
      }

      setIsUploading(true);
      toast.loading('Uploading photo(s) to Cloudinary...', { id: 'uploadToast' });

      try {
        const uploadedUrls = [];
        for (const file of filesToProcess) {
          const url = await uploadToCloudinary(file);
          uploadedUrls.push(url);
        }
        
        setImages((prev) => [...prev, ...uploadedUrls]);
        toast.success(`Successfully uploaded ${uploadedUrls.length} photo(s)!`, { id: 'uploadToast' });
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        toast.error(err.message || 'Failed to upload photo. Check Cloudinary limits.', { id: 'uploadToast' });
      } finally {
        setIsUploading(false);
        // Reset file input
        e.target.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) {
      toast.error('Please wait for photos to finish uploading!');
      return;
    }
    
    setLoading(true);

    try {
      toast.loading('Creating your product...', { id: 'productSubmit' });
      
      // Send raw JSON instead of multipart/form-data
      const payload = {
        title,
        price: Number(price),
        category: category.toUpperCase(),
        description,
        imageUrls: images 
      };

      const res = await api.post('/products', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Product listed successfully!', { id: 'productSubmit' });
        navigate('/my-products');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to list product', { id: 'productSubmit' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 lg:py-12">
      <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-8 md:p-10">
        
        <div className="mb-8 border-b border-gray-800 pb-5">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Sell an Item</h1>
          <p className="mt-2 text-gray-400">List your item for sale to the campus community.</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Photos Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Product Photos <span className="text-gray-500 font-normal">(Max 3)</span>
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${isUploading ? 'border-primary-500 bg-primary-900/10' : 'border-gray-700 hover:bg-gray-800 bg-gray-950'}`}>
              <div className="space-y-2 text-center">
                {isUploading ? (
                   <FiLoader className="mx-auto h-12 w-12 text-primary-500 animate-spin" />
                ) : (
                   <FiUploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                )}
                
                <div className="flex text-sm text-gray-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-500 hover:text-primary-400 focus-within:outline-none disabled:opacity-50">
                    <span>{isUploading ? 'Uploading...' : 'Upload files'}</span>
                    <input 
                       id="file-upload" 
                       name="file-upload" 
                       type="file" 
                       className="sr-only" 
                       multiple 
                       accept="image/*" 
                       onChange={handleImageChange} 
                       disabled={isUploading || images.length >= 3} 
                    />
                  </label>
                  {!isUploading && <p className="pl-1">or drag and drop</p>}
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>

            {/* Cloudinary Hosted Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((src, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden h-24 border border-gray-700 shadow-sm transition-opacity group bg-gray-800">
                    <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-gray-900/90 border border-gray-700 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 shadow-sm transition-opacity hover:bg-gray-800 focus:outline-none"
                      title="Remove Image"
                    >
                      <FiX size={14} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            
            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-200">Display Title</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FiType className="text-gray-500" />
                 </div>
                 <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="pl-10 block w-full border border-gray-700 rounded-lg py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white placeholder-gray-500" placeholder="e.g. Engineering Mathematics Vol 1" />
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-200">Price (₹)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FiDollarSign className="text-gray-500" />
                 </div>
                 <input type="number" id="price" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required className="pl-10 block w-full border border-gray-700 rounded-lg py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white placeholder-gray-500" placeholder="0.00" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-200">Category</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FiTag className="text-gray-500" />
                 </div>
                 <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="pl-10 block w-full border border-gray-700 rounded-lg py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white appearance-none">
                    <option value="">Select Category</option>
                    <option value="BOOKS">Books</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="FURNITURE">Furniture</option>
                    <option value="NOTES">Notes</option>
                    <option value="STATIONERY">Stationery</option>
                    <option value="OTHERS">Other</option>
                 </select>
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-200">Detailed Description</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                   <FiFileText className="text-gray-500" />
                 </div>
                 <textarea id="description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="pl-10 py-2.5 block w-full border border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-950 text-white placeholder-gray-500" placeholder="Describe the item's condition, age, and any relevant details..."></textarea>
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-800">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500">
              Cancel
            </button>
            <button type="submit" disabled={loading || isUploading} className="px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 transition-colors disabled:opacity-50">
              {loading ? 'Listing...' : 'List Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellProduct;
