import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// ---------------------------------------- Controller Helper Function ---------------------------------------------------------
export const getAnalyticsData = async ()=>{
    // we have to send total user, products, sale, revenue
    const totalusers = await User.countDocuments();
    const totalProducts = await  Product.countDocuments();
    
    
    return {
        user: totalusers,
        products: totalProducts,
        totalSales: 101,
        totalRevenue: 101
    }
}

export const getWeeklySaledData = async(startDate, endDate)=>{

}
// ---------------------------------------- Helper Function ---------------------------------------------------------

function getDatesInRange(startDate, endDate){

}