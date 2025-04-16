import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Trash, Star } from "lucide-react"
import { toggleFeaturedProduct, deleteProduct, fetchProductList } from '../../redux/adminDashbaordSlice.js'

const ProductsList = () => {
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.adminActions)

  useEffect(() => {
    dispatch(fetchProductList())
  }, [dispatch, toggleFeaturedProduct, deleteProduct])

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await dispatch(deleteProduct(id))
    }
  }

  const handleToggleFeatured = (id) => {
    dispatch(toggleFeaturedProduct(id))
  }

  return (
    <motion.div
      className='w-full overflow-x-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className='w-full mx-auto shadow-lg bg-gray-700 rounded-lg overflow-hidden'>
        <thead className='bg-gray-800'>
          <tr className='text-gray-300'>
            <th className='px-6 py-4 text-left'>PRODUCT</th>
            <th className='px-6 py-4 text-left'>PRICE</th>
            <th className='px-6 py-4 text-left'>CATEGORY</th>
            <th className='px-6 py-4 text-center'>FEATURED</th>
            <th className='px-6 py-4 text-center'>ACTIONS</th>
          </tr>
        </thead>

        <tbody className='text-gray-300 divide-y divide-gray-500'>
          {productList.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700 transition-colors">
              <td className='px-6 py-4 flex items-center gap-4'>
                <img 
                  src={product.image} 
                  className='w-16 h-16 rounded-lg object-cover' 
                  alt={product.name} 
                />
                <span className='font-medium'>{product.name}</span>
              </td>
              <td className='px-6 py-4'>${product.price}</td>
              <td className='px-6 py-4 capitalize'>{product.category}</td>
              
              <td className='px-6 py-4 text-center'>
                <button
                  onClick={() => handleToggleFeatured(product._id)}
                  className={`p-2 rounded-full transition-colors ${
                    product.isFeatured 
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                      : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
                >
                  <Star className='h-5 w-5' />
                </button>
              </td>

              <td className='px-6 py-4 text-center'>
                <button 
                  onClick={() => handleDelete(product._id, product.name)}
                  className='p-2 text-red-400 hover:text-red-500 transition-colors'
                >
                  <Trash className='h-5 w-5' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productList.length === 0 && (
        <div className='text-gray-400 text-center py-8'>
          No products found. Start by creating a new product.
        </div>
      )}
    </motion.div>
  )
}

export default ProductsList