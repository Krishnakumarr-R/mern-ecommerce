# 🛒 MERN E-Commerce Website

A full-featured e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. This project includes product listings, user authentication, admin dashboard, and shopping cart functionality.

## 🚀 Features

### 🛍️ User Features
- Sign up / Login with JWT Authentication
- Browse products with images, prices, and details
- Add to cart and manage cart items
- Checkout with order summary
- Responsive and modern UI

### 🛠️ Admin Features
- Admin login with role-based access
- Add, update, delete products
- Manage users and orders
- Dashboard with analytics

## ⚙️ Tech Stack

**Frontend**
- React.js
- Redux / Context API (state management)
- Axios
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for auth
- bcrypt for password hashing
- Multer (for image upload)


## 🔧 Installation

1. Clone the repo

```bash
git clone https://github.com/Krishnakumarr-R/mern-ecommerce.git
cd mern-ecommerce
```

2. Backend Setup
```bash
cd server
npm install
```
# Create a .env file and add the following:
```bash
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME="your Api keys"
CLOUDINARY_API_KEY="your Api keys"
CLOUDINARY_API_SECRET="your Api keys"
```
```bash
npm run dev
```
3.Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

🔗 [Live E-Commerce App](https://mern-ecommerce-seven-alpha.vercel.app)

### 📚 Learning Outcomes
- Built a production-ready MERN stack application
- Learned file upload, protected routes, and middleware usage
- Implemented full CRUD for products and admin panel
- Integrated role-based access control (RBAC)

