import cloudinary from "../config/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";


// -------------------------- Controller Functions ---------------------------------------------------------------------------------------
export const getAllProducts = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({success:true, products, message:"fetch all products successfully."})
    } catch (error) {
        console.log(`❌ Error in getAllProducts controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error", error:error.message });
    }
}
// -----------------------------------------------------------------------------------------------------------------
export const getFeaturedProducts = async (req, res)=>{
    try {
        let featuredPrdouts = await redis.get("featured_products");
        if(featuredPrdouts) return res.status(200).json(JSON.parse(featuredPrdouts));

        // if ! featured products then find in DB and store in redis for quick access
        featuredPrdouts = await Product.find({isFeatured:true}).lean();
        // lean() return js object instead of document which is good for performance

        if(!featuredPrdouts) return res.status(404).json({success:false, message:"No featured prodcuts found"})
        
        // if featured products avilable in mongoDB then store in cache redis DB
        await redis.set("featured_products", JSON.stringify(featuredPrdouts))
        res.status(200).json({success:true, getFeaturedProducts})
    } catch (error) {
        console.log(`❌ Error in getFeaturedProducts controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error", error:error.message });
    }
}
// -----------------------------------------------------------------------------------------------------------------
export const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !price || !req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, price and image are required fields" 
            });
        }

        // Convert buffer to base64 string
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "products",
            resource_type: "auto"
        });

        // Create product with just the URL string
        const product = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            image: result.secure_url // Store only the URL string
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully 🎉",
            product
        });

    } catch (error) {
        console.error(`❌ Error in createNewProduct: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
  

// -----------------------------------------------------------------------------------------------------------------
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({success:true, message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
// -----------------------------------------------------------------------------------------------------------------
export const getProductsByCategory = async (req, res)=>{
    const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.status(200).json({ products });
    } catch (error) {
        console.log(`❌ Error in getProductsByCategory controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error", error:error.message });
    }
}
// -----------------------------------------------------------------------------------------------------------------
export const getRecommendedProcuts = async (req, res)=>{
    try {
        const products = await Product.aggregate([
			{ $sample: { size: 4 } },
			{ $project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.status(200).json(products);
    } catch (error) {
        console.log(`❌ Error in getRecommendedProcuts controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error", error:error.message });
    }
}
// -----------------------------------------------------------------------------------------------------------------
export const toggleFeaturedProductStatus = async (req, res)=>{
	try {
		const product = await Product.findById(req.params.id);
		if(!product){
			return res.status(404).json({success:false, message:"Product not found"})
		} else {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save(); // i think only await product.save() is enough and not to send in res to short api res.
			// now update featured product in redis cache database
			await updateFeaturedProductsCache();
			res.status(200).json({success:true, message:"Product Featured Successfully.", updatedProduct})
		}
		
	} catch (error) {
		console.log(`❌ Error in toggleFeaturedProductStatus controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error to modify isFeatured status of product.", error:error.message });
	}
}

async function updateFeaturedProductsCache(){
	try {
		const featuredPrdouts = await Product.find({isFeatured:true}).lean();
		await redis.set("featured_products", JSON.stringify(featuredPrdouts))
	} catch (error) {
		onsole.log(`❌ Error in update cache function: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error to update featured product redis cache.", error:error.message });
	}
}
