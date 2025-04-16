import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";


// ---------------------------------- Payment Controller Functions --------------------------------------------
export const createCheckoutSession = async (req, res)=>{
    try {
        const { products, couponCode} = req.body;

        // check is product in the form of Array!
        if(!Array.isArray(products) || products.length === 0){
            return res.status(400).json({success:false, message:"invalid or empty cart items"})
        }

        let totalAmount = 0;
        const lineItems = products.map((product)=>{
            const amount = Math.round(product.price * 100); // stripe wants cents, so multiply dollar with 100 | $10 = 1000 cents
            totalAmount += amount * product.quantity;

            return { price_data:{
                        currency: "usd",
                        product_data:{name:product.name, images:[product.image]},
                        unit_amount: amount
                    },
                     quantity: product.quantity || 1 }  
        });

        let coupon = null;
        if(couponCode){
            coupon = await Coupon.findOne({ code:couponCode, userId:req.user._id, isActive:true});
            if(coupon){
                totalAmount -= Math.round( (totalAmount * coupon.discountPercentage) / 100)
            } else { coupon = null}
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_type: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon?[{coupon: await createStripeCoupon(coupon.discountPercentage)}]:[],
            metadata:{
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(products.map((p)=>({
                                id: p._id,
                                quantity: p.quantity,
                                price: p.price
                })))
            }
        })


        if(totalAmount >= 2000){
            await createNewCoupon(req.user._id)
        }

        res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });

    } catch (error) {
        console.log(`❌ Error in createCheckoutSession controller: ${error.message}`);
        res.status(500).json({ success: false, message:"internal server error to creating our payment.", error:error.message });
    }
}

// ---------------------------------- Create New Order Document -------------------------------------------------------------------
export const checkoutSuccess = async (req, res)=>{
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        let b = false;
        if(session.payment_status === "paid"){
            if(session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    { code:session.metadata.couponCode, userId:session.metadata.userId},
                    { isActive:false }
                )
                b = true;
            }}
        // create new order document
        const products = JSON.parse(session.metadata.products);
        const newOrder = new Order({ 
                                user: session.metadata.userId,
                                products: products.map((p)=>({
                                product: p.id,
                                quantity: p.quantity,
                                price: p.price
                                })),
                                totalAmount: session.amount_total / 100, // convert cents to dollars
                                stripeSessionId: sessionId
        })

        await newOrder.save();
        res.status(200).json({success:true, message:`Payment done successfully ${b?'in addition your coupon used and destroed':''}`})
        
    } catch (error) {
        console.log(`❌ Error in checkoutSuccess controller: ${error.message}`);
        res.status(500).json({ success: false, orderId:newOrder._id, message:"internal server error to creating our payment.", error:error.message });
    }
}

// ---------------------------------- Coupons Functions --------------------------------------------
async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once"
    })

    return coupon.id;
}
// -----------------------------------------------------------------------------------------------------
async function createNewCoupon(userId){
    await Coupon.findOneAndDelete({userId})

    const newCoupon = new Coupon({
        code: "GIFT" +  Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId
    })

    await newCoupon.save();
    return newCoupon;
}
