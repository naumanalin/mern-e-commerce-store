import React from 'react';
import useFetch from '../hooks/useFetch';
import Product from './Product';

const RecommendedProducts = () => {
  const route = "/products/recommended-products";
  const { data: products, isLoading, error } = useFetch({ route });

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">
        People also bought
      </h2>

      {isLoading && <p className="text-gray-300">Loading recommended products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      ) : (
        !isLoading && !error && <p className="text-gray-400">No recommended products found.</p>
      )}
    </div>
  );
};

export default RecommendedProducts;
