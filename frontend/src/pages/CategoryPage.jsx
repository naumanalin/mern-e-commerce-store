import React from 'react';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import RecommendedProducts from '../components/RecommendedProducts';

const CategoryPage = () => {
  const { category } = useParams();
  const route = `/products/category/${category}`;
  const { data, isLoading, error } = useFetch({ route });

  const products = data?.products || [];

  return (
    <>
      <motion.h1
        className="com-heading my-7 capitalize"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {category}
      </motion.h1>

      {isLoading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <motion.div
        className="grid gap-2 px-2 items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          !isLoading && <p className="text-center col-span-full">No products found in this category.</p>
        )}
      </motion.div>

      <RecommendedProducts/>
    </>
  );
};

export default CategoryPage;
