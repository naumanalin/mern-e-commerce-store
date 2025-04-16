<h1 align="center">MERN Stack E-Commerce Store 🛒</h1>

![Demo App](/frontend/public/)


Features This Project:

-   🚀 Open source, any one can use and  easy to Setup
-   🗄️ MongoDB & Redis Integration
-   💳 Stripe Payment Setup
-   🔐 Authentication System
-   🔑 JWT with Tokens
-   📝 User Signup & Login
-   🛒 E-Commerce Core
-   📦 Product & Category Management
-   🛍️ Shopping Cart Functionality
-   💰 Checkout with Stripe
-   🏷️ Coupon Code System
-   👑 Admin Dashboard
-   📊 Sales Analytics
-   🎨 Design with Tailwind
-   🛒 Cart & Checkout Process
-   🔒 Security
-   🛡️ Data Protection
-   🚀Caching with Redis
-   ⌛ And for functionalityies me contact me 

## 🛠 Technologies Used
**Frontend:**
- React.js (with Hooks)
- Redux toolkit, createAsyncThunk, redux-persist
- Axios (API integration)
- Chart.js/Recharts (Data visualization)
- Tailwind CSS (Responsive UI Design)
- HTML5/CSS3

**Backend:**
- Node.js
- Express.js
- Mongoose (ODM) with MongoDB (Database)
- Redis for fast Cache Database
- CORS (Cross-Origin Resource Sharing)

# Who to Setup Project
#### in your local machine
## Clone repository:
```
git clone https://github.com/naumanalin/mern-e-commerce-store.git
```
### Backend Setup:
```
cd backend
npm install
or 
npm install
// run commmand 
npm run dev 
```

### Frontend Setup:
```
cd frontend
npm install
or 
npm install
// run commmand 
npm run dev
```

# Setup .env file
```bash
PORT=5000

MONGODB_URI=
UPSTASH_REDIS_URL=

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRECT=your_refresh_token_secrect

NODE_ENV=development
NODE_ENV=production

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

# API Documentation

## Table of Backend API's
- [Authentication](#authentication)
- [Products](#products)
- [Cart](#cart)
- [Coupons](#coupons)
- [Payments](#payments)
- [Analytics](#analytics)

---

## Authentication

| No. | Title                | Method | Route                | Access      |
|-----|----------------------|--------|----------------------|-------------|
| 1   | User Signup          | POST   | `/api/auth/signup`   | Public      |
| 2   | User Login           | POST   | `/api/auth/login`    | Public      |
| 3   | User Logout          | POST   | `/api/auth/logout`   | Private     |
| 4   | Get User Profile     | GET    | `/api/auth/profile`  | Private     |

---

## Products

| No. | Title                          | Method | Route                              | Access            |
|-----|--------------------------------|--------|------------------------------------|-------------------|
| 1   | Create New Product             | POST   | `/api/products/`                   | Admin             |
| 2   | Get All Products               | GET    | `/api/products/`                   | Admin             |
| 3   | Delete Product                 | DELETE | `/api/products/:id`                | Admin             |
| 4   | Toggle Featured Status         | PATCH  | `/api/products/:id`                | Admin             |
| 5   | Get Featured Products          | GET    | `/api/products/featured`           | Public            |
| 6   | Get Products by Category       | GET    | `/api/products/category/:category` | Public            |
| 7   | Get Recommended Products       | GET    | `/api/products/recommended-products` | Private           |

---

## Cart

| No. | Title                          | Method | Route                | Access      |
|-----|--------------------------------|--------|----------------------|-------------|
| 1   | Add to Cart                    | POST   | `/api/cart/`         | Private     |
| 2   | Get Cart Items                 | GET    | `/api/cart/`         | Private     |
| 3   | Remove from Cart               | DELETE | `/api/cart/:id`      | Private     |
| 4   | Update Quantity                | PUT    | `/api/cart/:id`      | Private     |

---

## Coupons

| No. | Title                          | Method | Route                | Access      |
|-----|--------------------------------|--------|----------------------|-------------|
| 1   | Get Coupons                    | GET    | `/api/coupon/`       | Private     |
| 2   | Validate Coupon                | POST   | `/api/coupon/validate` | Private     |

---

## Payments

| No. | Title                          | Method | Route                | Access      |
|-----|--------------------------------|--------|----------------------|-------------|
| 1   | Create Checkout Session        | POST   | `/api/payment/create-checkout-session` | Private |
| 2   | Checkout Success               | POST   | `/api/payment/checkout-success` | Private     |

---

## Analytics

| No. | Title                          | Method | Route                | Access      |
|-----|--------------------------------|--------|----------------------|-------------|
| 1   | Get Analytics Data             | GET    | `/api/analytics/`    | Admin       |


🔗 **Live Demo**: 

📧 **Contact**: naumanalin865@gmail.com | <a href="https://noumanali.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>