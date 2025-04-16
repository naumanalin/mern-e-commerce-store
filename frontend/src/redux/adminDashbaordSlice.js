import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// THUNKS -----------------------------------------------------------------------------------------------------

export const createProduct = createAsyncThunk('product/create', async (formData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/products`, formData, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success("Product created successfully!");
        return res.data.product;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
        return rejectWithValue(message);
    }
});

export const fetchProductList = createAsyncThunk('products/get', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/products`, { withCredentials: true });
        return res.data.products;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Error fetching products.');
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/products/${id}`, { withCredentials: true });
        toast.success("Product deleted successfully.");
        return id;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Error deleting product.");
        return rejectWithValue(error.response.data);
    }
});

export const toggleFeaturedProduct = createAsyncThunk('product/featured', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.patch(`${API_URL}/products/${id}`, null, { withCredentials: true });
        toast.success("Product feature status updated.");
        return res.data.updatedProduct;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Error toggling featured status.");
        return rejectWithValue(error.response.data);
    }
});

// SLICE -----------------------------------------------------------------------------------------------------

const productSlice = createSlice({
    name: "adminActions",
    initialState: {
        isLoading: false,
        isError: null,
        productList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE PRODUCT
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

            // FETCH ALL PRODUCTS
            .addCase(fetchProductList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload || [];
              })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

            // DELETE PRODUCT
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter(p => p._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

            // TOGGLE FEATURED PRODUCT
            .addCase(toggleFeaturedProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleFeaturedProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload;
                state.productList = state.productList.map(product =>
                    product._id === updatedProduct._id ? updatedProduct : product
                );
            })
            .addCase(toggleFeaturedProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            });
    }
});

export default productSlice.reducer;
