import express from 'express'
import { isAdmin, isLogedIn } from '../middleware/auth.middleware.js';
import { getAnalyticsData, getWeeklySaledData } from '../controllers/analytics.controller.js'

const router = express.Router();

router.get('/', isLogedIn, isAdmin, async (req, res)=>{
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7*24*60*60*1000 )

        const weeklySaledData = await getWeeklySaledData(startDate, endDate)

        res.status(200).json({success:true, analyticsData, weeklySaledData})
    } catch (error) {
        console.log(`❌ Error in analytics controller: ${error.message}`);
        res.status(500).json({ success: false, message: "internal server error to creating analytics data for admin", error: error.message });
    }
})


export default router;