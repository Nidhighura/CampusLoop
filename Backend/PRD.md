# 📄 Product Requirement Document (PRD)

## 🟢 1. Product Name

**CampusLoop** (Working Title)

---

## 🟢 2. Overview

CampusLoop is a **college-focused marketplace web application** designed for students in Bhopal. It enables students to **buy and sell used items** such as books, notes, furniture, and electronics within their local college community.

The goal of this platform is to:

* Create a **simple and efficient resale system**
* Enable **peer-to-peer transactions without middlemen**
* Build a **trusted environment for students**

---

## 🟢 3. Target Users

* College students in Bhopal
* Hostel residents
* Students who want to:

  * Sell used items (books, furniture, etc.)
  * Buy affordable second-hand items

---

## 🟢 4. Core Features

### 🔓 4.1 Public Access (No Login Required)

* Browse all products
* Search products
* Filter by category
* View product details

---

### 🔐 4.2 Authentication

* User signup with:

  * Name
  * Email
  * Phone number
  * College name
* Email-based OTP verification
* Login using email and password

---

### 🛍️ 4.3 Product Management (Seller Features)

* Add product with:

  * Title
  * Description
  * Price
  * Category
  * Images
* View own listings (“My Products”)
* Delete product
* Mark product as sold

---

### 🛒 4.4 Buyer Features

* Browse and view products
* View detailed product information
* Click “Show Contact” (login required)
* Contact seller via phone or message
* Finalize deal offline

---

### 🧑‍🎓 4.5 College Verification

* Prefer college email domains
* OTP verification required
* Verified users receive a “Verified Student” badge

---

## 🟢 5. User Flows

### 📌 Browsing Flow

User → Open website → Browse products → View details

---

### 📌 Selling Flow

User → Click “Sell” → Login/Signup → Fill product form → Upload → Product listed

---

### 📌 Buying Flow

User → View product → Click “Show Contact” → Login → View seller details → Contact seller

---

## 🟢 6. Tech Stack

### Frontend:

* React.js
* Tailwind CSS

### Backend:

* Java Spring Boot

### Database:

* MySQL

### External Services:

* Email service (OTP verification)
* Cloudinary (image upload)

---

## 🟢 7. APIs (High-Level)

### Authentication APIs:

* POST /auth/signup
* POST /auth/verify-otp
* POST /auth/login

### Product APIs:

* GET /products
* GET /products/{id}
* POST /products
* DELETE /products/{id}

### User APIs:

* GET /users/{id}/products

---

## 🟢 8. Database Tables

* users
* products
* product_images
* otp_verification

---

## 🟢 9. Security

* JWT-based authentication
* Password hashing using BCrypt
* Protected endpoints for:

  * Selling products
  * Viewing seller contact

---

## 🟢 10. Non-Functional Requirements

* Clean and responsive UI
* Fast product loading
* Secure handling of user data

---

## 🟢 11. Future Enhancements

* In-app chat system
* Ratings and reviews
* Wishlist/Favorites
* Location-based filtering
* Online payment integration

---

## 🟢 12. Success Criteria

* Users can easily:

  * Browse products without login
  * Upload and manage products
  * Contact sellers smoothly

---

## 🟢 13. Constraints

* Initially limited to Bhopal users
* No online payments in MVP
* Transactions handled offline

---

# 🎯 Summary

CampusLoop is a **simple, secure, and student-centric marketplace** that enables easy buying and selling within a trusted college community.
