import React, { useState } from 'react'
import { ShoppingCart } from "lucide-react";
import { addToCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Product = ({product}) => {
  const [isAdding, setIsAdding] = useState(false)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleClick = async (id) => {
    if (!user) {
      return toast.warning('Only logged in users can add products to cart!')
    }
    try {
      setIsAdding(true)
      await dispatch(addToCart(id)).unwrap()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }
  return (
    <div className=' border-[1px] rounded-md border-gray-600 p-2 flex flex-col gap-2'>
        <img src={product.image} alt="product image"
        className='object-cover w-full h-60 rounded-md' />
        <p className='text-gray-300 capitalize font-semibold'>{product.name}</p>
        <span className='text-xl font-bold text-emerald-400'>${product.price}</span>

        <button 
        onClick={() => handleClick(product._id)}
        disabled={isAdding}
        className={`flex gap-2 py-2 px-3 rounded-md cursor-pointer w-[150px] ${isAdding ? 'bg-gray-400' : 'bg-emerald-400'}`}
      >
        {isAdding ? 'Adding...' : (<> <ShoppingCart size={18} /> Add to cart </>)}
      </button>

    </div>
  )
}

export default Product