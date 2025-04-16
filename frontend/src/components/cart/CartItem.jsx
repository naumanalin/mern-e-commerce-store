import { Trash, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart, updateQuantity } from '../../redux/cartSlice';

const CartItem = ({ cart , isLoading, loading, setLoading }) => {
  const dispatch = useDispatch();

  const removeItem = async (productId, name) => {
    setLoading(true);
    try {
        if(window.confirm(`Are you sure you want to remove "${name}" from cart`)){
            await dispatch(deleteFromCart(productId)).unwrap();
        }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (productId) => {
    setLoading(true);
    try {
      await dispatch(updateQuantity({ productId, quantity: cart.quantity + 1 })).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQty = async (productId) => {
    setLoading(true);
    try {
      if (cart.quantity <= 1) {
        await dispatch(deleteFromCart(productId)).unwrap();
      } else {
        await dispatch(updateQuantity({ productId, quantity: cart.quantity - 1 })).unwrap();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-between flex-col sm:flex-row gap-5 my-7 p-2 sm:p-4 rounded-md bg-gray-800">
      <div className="flex gap-3">
        <img src={cart.image} className="w-40 h-40 rounded-md" alt="cart item" />
        <div className="flex justify-between flex-col py-7">
          <p className="text-xl font-semibold capitalize">{cart.name}</p>
          <p className="text-xl text-gray-300">{cart.category}</p>
          <button
            onClick={() => removeItem(cart._id, cart.name)}
            className="cursor-pointer text-red-400 text-xl"
          >
            <Trash />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      )}

      <div className="flex-c-b gap-10">
        <div className="flex-c-b gap-2 text-xl">
          <button onClick={() => decreaseQty(cart._id)} className="qan-btn">
            <Minus />
          </button>
          <span>{cart.quantity}</span>
          <button onClick={() => increaseQty(cart._id)} className="qan-btn">
            <Plus />
          </button>
        </div>
        <span className="text-2xl font-semibold text-emerald-200">
          ${(cart.price * cart.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
