import React, { useEffect, useState } from 'react';
import EmptyCartPage from '../components/cart/EmptyCartPage.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../redux/cartSlice';
import OrderSummary from '../components/cart/OrderSummary.jsx';
import GiftCouponCard from '../components/cart/GiftCouponCard.jsx';

const CartPage = () => {
  const [loading, setLoading] = useState(false); // to fix error of empty carts values after dispatch
  const { carts, isLoading } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [loading]);




  return (
    <>
      {carts.length === 0 ? (
        <EmptyCartPage/>
      ) : (
        <div className=' p-2 sm:p-4'>
          {/* Cart */}
          { !isLoading?carts.map((cart) => (
            <CartItem cart={cart} key={cart._id} loading={loading} setLoading={setLoading} isLoading={isLoading}/>
          )) :(
        <div className='w-full bg-gray-800'>
            <div className="flex justify-center items-center h-20">
              <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
        </div>
        )}
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <OrderSummary/>
          <GiftCouponCard/>
        </div>

      
        </div>
      )}
      
    </>
  );
};

export default CartPage;