import Product from "../models/product.model.js";
// and geting user from the middleware

export const getCartproducts = async (req, res) => {
    try {
        // extract all productIds from cartItems array
        const productIds = req.user.cartItems.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        // add quantity for each product
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.product.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: item.quantity };
        });

        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        console.log(`❌ Error in getCartproducts controller: ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error to fetching cart products", error: error.message });
    }
}
// -------------------------------------------------------------------------------------------------------------

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const isExistingItem = user.cartItems.find(item => item.product.toString() === productId);

        if (isExistingItem) {
            isExistingItem.quantity += 1;
            await user.save();
            res.status(201).json({ success: true, message: "increase quantity of already added product", cartItems: user.cartItems });
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
            await user.save();
            res.status(201).json({ success: true, message: "product add to cart successfully", cartItems: user.cartItems });
        }

    } catch (error) {
        console.log(`❌ Error in addToCart controller: ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error during add to cart.", error: error.message });
    }
}
// -------------------------------------------------------------------------------------------------------------

export const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!productId) {
            return res.status(404).json({ success: false, message: "product not found!" });
        } else {
            user.cartItems = user.cartItems.filter(item => item.product.toString() !== productId);
        }

        await user.save();
        res.status(200).json({ success: true, message: "product remove from cart items", cartItems: user.cartItems });
    } catch (error) {
        console.log(`❌ Error in removeProductFromCart controller: ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error to remove product from cart.", error: error.message });
    }
}
// -------------------------------------------------------------------------------------------------------------

export const updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const isExistingItem = user.cartItems.find(item => item.product.toString() === id);

        if (isExistingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item.product.toString() !== id);
                await user.save();
                return res.status(200).json({ success: true, message: "product remove from cart because of zero quanttiy", cartItems: user.cartItems });
            }

            isExistingItem.quantity = quantity;
            await user.save();
            res.status(200).json({ success: true, message: "update quantity successfully", cartItems: user.cartItems });
        } else {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log(`❌ Error in updateQuantity controller: ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error to Update Quantity of product.", error: error.message });
    }
}
