Shop Management System
A full-stack web application for managing an online shop with admin dashboard functionality.
Tech Stack
Frontend:

React.js with React Router
Material-UI components
Tailwind CSS
Chart.js for data visualization

Backend:

Node.js with Express
MySQL database with Sequelize ORM
JWT authentication
AWS S3 integration for file storage
Multer for file uploads

Features
Admin Dashboard

Sales Analytics: Monthly sales reports with interactive charts
Order Management: View, process, and track orders
Inventory Management: Add, edit, and delete products
Content Management: Update banners and information cards
Real-time Statistics: Order counts and sales totals

Product Management

Support for multiple product categories (Fruits, Vegetables, Mushrooms, Herbs)
Image upload with AWS S3 storage
Product variants and pricing
Bestsellers section management

Order Processing

New order notifications
Order status tracking
Bulk order processing
Order search functionality

Getting Started
Prerequisites

Node.js (v14+)
MySQL database
AWS S3 bucket (for image storage)

Installation

Clone the repository

bashgit clone <repository-url>
cd shop-management-system

Backend Setup

bashcd backend
npm install
Create a .env file with:
envTABLE=your_database_name
DBUSER=your_db_user
DBPW=your_db_password
DBHOST=your_db_host
JWT_TOKEN=your_jwt_secret
S3_ACCESS_KEY=your_s3_access_key
SECRET_ACCESS_KEY=your_s3_secret_key
AWS_REGION=your_aws_region

Frontend Setup

bashcd frontend
npm install
Create a .env file with:
envREACT_APP_API_URL=http://localhost:3131/api
REACT_APP_API_POSTINSERT=http://localhost:3131/api/contentEdit/inventory

Start the Application

Backend:
bashcd backend
npm start
Frontend:
bashcd frontend
npm start
Usage

Login: Access the admin panel with your credentials
Dashboard: View sales analytics and recent orders
Inventory: Manage products and categories
Orders: Process new orders and view order history
Content: Update banners and promotional content

Database Schema
The application uses several key tables:

admin - User authentication
orders / finishedorders - Order management
products / items - Product catalog
banners / infos - Content management

Authentication

JWT-based authentication
Passport.js integration
Protected routes for admin access

API Endpoints

POST /api/login - User authentication
GET /api/contentData/:type - Fetch content data
POST /api/contentEdit/:type - Update content
GET /api/orders - Fetch orders
GET /api/totalMonths/:month - Sales reports

Contributing

Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request
