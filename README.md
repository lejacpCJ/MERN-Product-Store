# MERN Product Store

A full-stack web application for managing a product store built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Product Management**: Create, read, update, and delete products
- **Responsive UI**: Modern, responsive design using Chakra UI
- **Real-time Updates**: State management with Zustand for seamless UI updates
- **RESTful API**: Backend API with Express.js and MongoDB
- **Image Support**: Store product images via URLs
- **Toast Notifications**: User feedback for actions using Chakra UI toasts

## Tech Stack

### Frontend

- **React**: UI library for building the user interface
- **Vite**: Fast build tool and development server
- **Chakra UI**: Component library for styling and UI components
- **React Router**: Client-side routing
- **Zustand**: State management
- **Framer Motion**: Animations

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for building the API
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** package manager

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lejacpCJ/MERN-Product-Store.git
   cd MERN-Product-Store
   ```

2. **Install dependencies:**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   npm run build
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

## Usage

### Development Mode

**Start Backend (Terminal 1):**

```bash
# In root directory
npm run dev
```

**Start Frontend (Terminal 2):**

```bash
# In root directory
cd frontend
npm run dev
```

_Note: Run these commands in separate terminals for optimal development experience._

### Production Mode

```bash
npm run build
npm start
```

This builds the frontend and starts the production server.

### API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

### Product Schema

Each product has the following structure:

```javascript
{
  name: String (required),
  price: Number (required),
  image: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
MERN-Product-Store/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   └── product.controller.js  # Product CRUD operations
│   ├── models/
│   │   └── product.model.js   # Product MongoDB schema
│   ├── routes/
│   │   └── product.route.js   # Product API routes
│   └── server.js              # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   └── ProductCard.jsx # Product display card
│   │   ├── pages/
│   │   │   ├── HomePage.jsx   # Products listing page
│   │   │   └── CreatePage.jsx # Create product form
│   │   ├── store/
│   │   │   └── product.js     # Zustand store for products
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── package.json
└── README.md
```

## License

This project is licensed under the ISC License.
