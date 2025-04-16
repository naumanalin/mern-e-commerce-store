import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCartPage = () => {
  return (
    <motion.div className='flex flex-col gap-3 items-center justify-center h-screen'
        initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1 }}
    >
        <ShoppingCart className='w-50 h-50'/>
        <h1 className='text-3xl font-bold text-gray-200'>Your cart is empty</h1>
        <p className='text-xl text-gray-400'>Looks like your haven't added anything to you cart yest.</p>
        <Link className='px-6 py-3 rounded-md text-xl font-semibold cursor-pointer bg-emerald-600' to='/'>Start Shopping</Link>
    </motion.div>
  )
}

export default EmptyCartPage