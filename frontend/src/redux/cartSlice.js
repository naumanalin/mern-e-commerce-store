import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// THUNKS -----------------------------------------------------------------------------------------------------

export const fetchCartItems = createAsyncThunk('cart/all', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/cart`, { withCredentials: true });
        return res.data.cartItems;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const addToCart = createAsyncThunk('cart/add', async (productId, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            `${API_URL}/cart`,
            { productId },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        toast.success(res.data.message);
        return res.data.cartItems;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message || "Failed to add product to cart!");
        return rejectWithValue(message);
    }
});

export const deleteFromCart = createAsyncThunk('cart/delete', async (productId, { rejectWithValue }) => {
    try {
        const res = await axios.delete(
            `${API_URL}/cart/${productId}`,
            { 
                data: { productId },
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        toast.success(res.data.message);
        return res.data.cartItems;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message || "Failed to remove product from cart!");
        return rejectWithValue(message);
    }
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }, { rejectWithValue }) => {
    try {
        const res = await axios.put(
            `${API_URL}/cart/${productId}`,
            { quantity },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        toast.success(res.data.message);
        return res.data.cartItems;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message || "Failed to update quantity!");
        return rejectWithValue(message);
    }
});

export const checkCouponCode = createAsyncThunk('coupon/code', async (code, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            `${API_URL}/coupon/validate`,
            { code },
            { withCredentials: true }
        );
        
        if (res.data.message === "Coupon is valid") {
            toast.success("Coupon applied successfully");
            return {
                code: res.data.code,
                discountPercentage: res.data.discountPercentage
            };
        }
        return rejectWithValue(res.data.message);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message || "Invalid coupon code");
        return rejectWithValue(message);
    }
});

// Slice -------------------------------------------------------------------------------------------------------
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        coupon: null,
        total: 0,
        subtotal: 0,
        isCouponApplied: false,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart Items
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload;
                state.subtotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.total = state.isCouponApplied && state.coupon 
                    ? state.subtotal * (1 - state.coupon.discountPercentage / 100)
                    : state.subtotal;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload;
                state.subtotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.total = state.isCouponApplied && state.coupon 
                    ? state.subtotal * (1 - state.coupon.discountPercentage / 100)
                    : state.subtotal;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete from Cart
            .addCase(deleteFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload;
                state.subtotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.total = state.isCouponApplied && state.coupon 
                    ? state.subtotal * (1 - state.coupon.discountPercentage / 100)
                    : state.subtotal;
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Quantity
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.carts = action.payload;
                state.subtotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                state.total = state.isCouponApplied && state.coupon 
                    ? state.subtotal * (1 - state.coupon.discountPercentage / 100)
                    : state.subtotal;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Validate Coupon
            .addCase(checkCouponCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkCouponCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupon = action.payload;
                state.isCouponApplied = true;
                state.total = state.subtotal * (1 - action.payload.discountPercentage / 100);
            })
            .addCase(checkCouponCode.rejected, (state) => {
                state.isLoading = false;
                state.coupon = null;
                state.isCouponApplied = false;
                state.total = state.subtotal;
            });
    }
});

export default cartSlice.reducer;