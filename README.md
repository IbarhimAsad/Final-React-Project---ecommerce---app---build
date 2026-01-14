# LearnHub - Online Learning Platform

A fully functional e-commerce/EdTech web application built with React, Vite, and TailwindCSS.

## 🔑 Demo Account

Use the following credentials to test the application:

| Field    | Value                  |
|----------|------------------------|
| Email    | `student@learnhub.com` |
| Password | `password123`          |



## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Context API + useReducer** - State management
- **LocalStorage** - Data persistence

## ✨ Features

### Pages
- **Home** - Hero, features, testimonials, pricing, and CTA sections
- **Products** - Course listing with search, filters, and sorting
- **Product Details** - Individual course page with curriculum and purchase options
- **Blog** - Articles and resources
- **About** - Company information and team
- **Contact** - Contact form with validation
- **Login/Register** - Authentication UI with form validation
- **Dashboard** - Course management with CRUD operations

### Functionality
- 🌓 Dark/Light mode toggle
- 🔍 Search and filter products
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📱 Fully responsive design
- 💾 LocalStorage persistence
- ⚡ Loading and error states
- ✅ Form validation

## 📁 Project Structure

```
src/
├── assets/
├── data/
│   ├── products.json
│   └── testimonials.json
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Badge.jsx
│   │   ├── Loader.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorState.jsx
│   ├── cards/
│   │   ├── ProductCard.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── PricingCard.jsx
│   ├── modal/
│   │   └── Modal.jsx
│   └── filters/
│       ├── SearchBar.jsx
│       └── FilterDropdown.jsx
├── context/
│   ├── ThemeContext.jsx
│   └── AppContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Blog.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── routes/
│   └── AppRoutes.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🛠️ Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deployment

The build output is in the \`dist\` folder. Deploy to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 📸 Screenshots

![Screenshot 1](./screenshots/Screenshot%202026-01-14%20170031.png)
![Screenshot 2](./screenshots/Screenshot%202026-01-14%20170106.png)
![Screenshot 3](./screenshots/Screenshot%202026-01-14%20170138.png)
![Screenshot 4](./screenshots/Screenshot%202026-01-14%20170223.png)
![Screenshot 5](./screenshots/Screenshot%202026-01-14%20170317.png)
![Screenshot 6](./screenshots/Screenshot%202026-01-14%20170345.png)
![Screenshot 7](./screenshots/Screenshot%202026-01-14%20170403.png)
![Screenshot 8](./screenshots/Screenshot%202026-01-14%20170425.png)
![Screenshot 9](./screenshots/Screenshot%202026-01-14%20170441.png)
![Screenshot 10](./screenshots/Screenshot%202026-01-14%20170508.png)
![Screenshot 11](./screenshots/Screenshot%202026-01-14%20170637.png)
![Screenshot 12](./screenshots/Screenshot%202026-01-14%20170654.png)
![Screenshot 13](./screenshots/Screenshot%202026-01-14%20170715.png)


```
