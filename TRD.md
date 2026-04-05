# 📄 Technical Requirement Document (TRD)

## 🟢 1. System Overview

CampusLoop is a full-stack web application that enables college students in Bhopal to buy and sell used items. The system follows a **client-server architecture** with a React frontend, Spring Boot backend, and MySQL database.

---

## 🟢 2. System Architecture

### 🔹 High-Level Architecture

* **Frontend (Client):** React.js + Tailwind CSS
* **Backend (Server):** Spring Boot (REST APIs)
* **Database:** MySQL
* **External Services:**

  * Email Service (OTP verification)
  * Cloudinary (image storage)

### 🔹 Architecture Flow

Client → REST API → Service Layer → Repository → Database

---

## 🟢 3. Module Breakdown

### 🔐 3.1 Authentication Module

* User registration (email, phone, college)
* OTP generation and verification
* Login with JWT authentication
* Password encryption using BCrypt

---

### 📦 3.2 Product Module

* Add product
* View all products (public)
* View product details
* Delete product
* Fetch products by user

---

### 🖼️ 3.3 Image Upload Module

* Upload product images to Cloudinary
* Store image URLs in database
* Support multiple images per product

---

### 👤 3.4 User Module

* Store user details
* Manage user profile
* Fetch user-specific data

---

### 📞 3.5 Contact Access Module

* Restrict seller contact visibility
* Allow access only after login
* Return seller phone/email via API

---

## 🟢 4. Database Design

### Tables:

* **users**
* **products**
* **product_images**
* **otp_verification**

### Relationships:

* One user → many products
* One product → many images

---

## 🟢 5. API Design

### 🔐 Authentication APIs

* POST /auth/signup
* POST /auth/verify-otp
* POST /auth/login

---

### 📦 Product APIs

* GET /products (public)
* GET /products/{id}
* POST /products (protected)
* DELETE /products/{id} (protected)

---

### 👤 User APIs

* GET /users/{id}
* GET /users/{id}/products

---

## 🟢 6. Security Design

* JWT-based authentication
* Password hashing (BCrypt)
* Role-less system (single user type)
* Public vs Protected API separation

### Access Rules:

* Public:

  * View products
* Protected:

  * Add product
  * View contact
  * Delete product

---

## 🟢 7. Folder Structure (Backend)

```
com.campusloop
│
├── controller
├── service
├── repository
├── model
├── dto
├── security
├── util
```

---

## 🟢 8. Frontend Structure

### Pages:

* Home Page
* Product Details Page
* Login/Signup Page
* Sell Product Page
* My Products Page

### Components:

* Navbar
* Product Card
* Form Components

---

## 🟢 9. Data Flow

### 🔄 Product Upload Flow

Frontend → API → Service → DB → Response

### 🔄 Product Fetch Flow

Frontend → GET API → DB → Response → UI

---

## 🟢 10. External Integrations

### 📧 Email Service

* SMTP (Gmail)
* Used for OTP sending

### 🖼️ Cloudinary

* Image upload
* Returns image URL

---

## 🟢 11. Performance Considerations

* Use pagination for product listing
* Optimize image loading
* Minimize API response size

---

## 🟢 12. Error Handling

* Global exception handler
* Proper HTTP status codes:

  * 200 OK
  * 400 Bad Request
  * 401 Unauthorized
  * 500 Internal Server Error

---

## 🟢 13. Logging & Monitoring

* Basic logging using Spring Boot Logger
* Log API requests and errors

---

## 🟢 14. Deployment (Optional)

* Backend: Render / Railway / AWS
* Frontend: Vercel / Netlify
* Database: MySQL (local/cloud)

---

## 🟢 15. Future Enhancements

* Real-time chat (WebSocket)
* Ratings & reviews
* Favorites system
* Location-based filtering
* Payment integration

---

# 🎯 Summary

This system is designed using a **modular, scalable architecture** with clear separation of concerns. It ensures secure authentication, efficient product management, and a smooth user experience for college students.
