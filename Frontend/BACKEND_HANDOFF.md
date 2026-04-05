# Backend Handoff

This document is the frontend integration reference for the CampusLoop backend.

Base URL:

```text
http://localhost:8080
```

API base path:

```text
/api/v1
```

Swagger:

- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8080/v3/api-docs`

## General API Rules

- Most responses use this envelope:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": {}
}
```

- Protected endpoints require:

```http
Authorization: Bearer <jwt_token>
```

- Public endpoints:
  - `POST /api/v1/auth/signup`
  - `POST /api/v1/auth/verify-otp`
  - `POST /api/v1/auth/login`
  - `GET /api/v1/products`
  - `GET /api/v1/products/{id}`

- Common error statuses:
  - `400 Bad Request`
  - `401 Unauthorized`
  - `404 Not Found`
  - `500 Internal Server Error`

## Auth APIs

### 1. Signup

Endpoint:

```http
POST /api/v1/auth/signup
Content-Type: application/json
```

Request body:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@college.edu",
  "phoneNumber": "9876543210",
  "collegeName": "LNCT Bhopal",
  "password": "CampusLoop@123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Signup successful. OTP sent to email.",
  "data": "aarav@college.edu"
}
```

Frontend notes:

- After signup, route user to OTP verification.
- Backend creates the user as `verified = false`.
- Email is normalized to lowercase.

### 2. Verify OTP

Endpoint:

```http
POST /api/v1/auth/verify-otp
Content-Type: application/json
```

Request body:

```json
{
  "email": "aarav@college.edu",
  "otp": "123456"
}
```

Success response:

```json
{
  "success": true,
  "message": "OTP verified successfully.",
  "data": "aarav@college.edu"
}
```

Frontend notes:

- After successful OTP verification, user can log in.
- If OTP is invalid, used, or expired, backend returns `400`.

### 3. Login

Endpoint:

```http
POST /api/v1/auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "aarav@college.edu",
  "password": "CampusLoop@123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav@college.edu",
      "collegeName": "LNCT Bhopal",
      "verified": true
    }
  }
}
```

Frontend notes:

- Store `data.token`.
- Use the token for protected endpoints.
- Unverified users cannot log in.

## Product APIs

### Product category values

Use one of:

```text
BOOKS
NOTES
FURNITURE
ELECTRONICS
OTHERS
```

### 4. Get Products

Endpoint:

```http
GET /api/v1/products?search=notes&category=BOOKS&page=0&size=10
```

All query params are optional except `page` and `size`, which default to `0` and `10`.

Success response:

```json
{
  "success": true,
  "message": "Products fetched successfully.",
  "data": {
    "items": [
      {
        "id": 10,
        "title": "DSA Notes",
        "description": "Second-hand notes",
        "price": 199.00,
        "category": "NOTES",
        "sold": false,
        "createdAt": "2026-04-01T12:30:00",
        "seller": {
          "id": 1,
          "name": "Aarav Sharma",
          "email": "aarav@college.edu",
          "collegeName": "LNCT Bhopal",
          "verified": true
        },
        "images": [
          {
            "id": 100,
            "imageUrl": "https://example.com/image.jpg"
          }
        ]
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

Frontend notes:

- This is public.
- Use for homepage, search, and category filters.
- `seller.email` is currently included in product responses by backend. For UX, still treat full seller contact as gated behind contact API.

### 5. Get Product By ID

Endpoint:

```http
GET /api/v1/products/{id}
```

Example:

```http
GET /api/v1/products/10
```

Success response:

```json
{
  "success": true,
  "message": "Product fetched successfully.",
  "data": {
    "id": 10,
    "title": "DSA Notes",
    "description": "Second-hand notes",
    "price": 199.00,
    "category": "NOTES",
    "sold": false,
    "createdAt": "2026-04-01T12:30:00",
    "seller": {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav@college.edu",
      "collegeName": "LNCT Bhopal",
      "verified": true
    },
    "images": [
      {
        "id": 100,
        "imageUrl": "https://example.com/image.jpg"
      }
    ]
  }
}
```

### 6. Create Product

Endpoint:

```http
POST /api/v1/products
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Form-data fields:

- `metadata`: stringified JSON
- `images`: optional file array

Example `metadata` JSON:

```json
{
  "title": "Second-hand Chair",
  "description": "Wooden study chair in good condition",
  "price": 850,
  "category": "FURNITURE",
  "imageUrls": [
    "https://example.com/chair-1.jpg"
  ]
}
```

Success response:

```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "id": 12,
    "title": "Second-hand Chair",
    "description": "Wooden study chair in good condition",
    "price": 850.00,
    "category": "FURNITURE",
    "sold": false,
    "createdAt": "2026-04-01T13:00:00",
    "seller": {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav@college.edu",
      "collegeName": "LNCT Bhopal",
      "verified": true
    },
    "images": [
      {
        "id": 120,
        "imageUrl": "https://example.com/chair-1.jpg"
      }
    ]
  }
}
```

Frontend notes:

- If frontend uploads files, send them in `images`.
- If frontend already has hosted image URLs, include them in `metadata.imageUrls`.
- `metadata` must be valid JSON string.
- Backend uploads file inputs to Cloudinary and stores the returned `secure_url` values in MySQL.
- Maximum file count per product is `5`.
- Only image file types are accepted in the `images` field.

### 7. Delete Product

Endpoint:

```http
DELETE /api/v1/products/{id}
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "message": "Product deleted successfully.",
  "data": 12
}
```

Frontend notes:

- Only the product owner can delete.
- Show delete option only on own listings.

### 8. Mark Product As Sold

Endpoint:

```http
PATCH /api/v1/products/{id}/mark-sold
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "message": "Product marked as sold successfully.",
  "data": {
    "id": 12,
    "title": "Second-hand Chair",
    "description": "Wooden study chair in good condition",
    "price": 850.00,
    "category": "FURNITURE",
    "sold": true,
    "createdAt": "2026-04-01T13:00:00",
    "seller": {
      "id": 1,
      "name": "Aarav Sharma",
      "email": "aarav@college.edu",
      "collegeName": "LNCT Bhopal",
      "verified": true
    },
    "images": []
  }
}
```

## User APIs

### 9. Get User Profile

Endpoint:

```http
GET /api/v1/users/{id}
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "message": "User fetched successfully.",
  "data": {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav@college.edu",
    "phoneNumber": "9876543210",
    "collegeName": "LNCT Bhopal",
    "verified": true
  }
}
```

Frontend notes:

- Use this for profile page if needed.
- This endpoint is protected.

### 10. Get User Products

Endpoint:

```http
GET /api/v1/users/{id}/products
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "message": "User products fetched successfully.",
  "data": [
    {
      "id": 12,
      "title": "Second-hand Chair",
      "description": "Wooden study chair in good condition",
      "price": 850.00,
      "category": "FURNITURE",
      "sold": false,
      "createdAt": "2026-04-01T13:00:00",
      "seller": {
        "id": 1,
        "name": "Aarav Sharma",
        "email": "aarav@college.edu",
        "collegeName": "LNCT Bhopal",
        "verified": true
      },
      "images": []
    }
  ]
}
```

Frontend notes:

- Use for "My Products" page.
- Frontend can call this with the logged-in user's id from login response.

## Contact API

### 11. Get Seller Contact For Product

Endpoint:

```http
GET /api/v1/contact/products/{productId}
Authorization: Bearer <token>
```

Success response:

```json
{
  "success": true,
  "message": "Seller contact fetched successfully.",
  "data": {
    "sellerName": "Aarav Sharma",
    "email": "aarav@college.edu",
    "phoneNumber": "9876543210",
    "collegeName": "LNCT Bhopal"
  }
}
```

Frontend notes:

- This powers the "Show Contact" action.
- If unauthenticated, backend returns `401`.
- Frontend should redirect user to login when this happens.

## Recommended Frontend Flow

### Buyer flow

1. Call `GET /api/v1/products`
2. Open `GET /api/v1/products/{id}` on details page
3. On "Show Contact", call `GET /api/v1/contact/products/{productId}`
4. If `401`, redirect to login

### Seller flow

1. Signup
2. Verify OTP
3. Login
4. Save JWT token and user data
5. Create product
6. Fetch own listings with `GET /api/v1/users/{id}/products`
7. Delete or mark sold as needed

## Frontend Storage Recommendation

Store after login:

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav@college.edu",
    "collegeName": "LNCT Bhopal",
    "verified": true
  }
}
```

Use `token` in the `Authorization` header for all protected requests.

## Important Integration Notes

- Product creation is `multipart/form-data`, not plain JSON.
- `metadata` inside product creation must be a stringified JSON object.
- Email values are normalized to lowercase by backend.
- Login only works after OTP verification.
- Some responses include nested seller info for convenience.
- If Cloudinary is not configured, frontend can still send hosted `imageUrls` in metadata.
- If frontend sends real image files, backend must have valid Cloudinary credentials configured.

## Example Product Create Request In Frontend

Example using `fetch`:

```js
const formData = new FormData();

formData.append(
  "metadata",
  JSON.stringify({
    title: "Second-hand Chair",
    description: "Wooden study chair in good condition",
    price: 850,
    category: "FURNITURE",
    imageUrls: []
  })
);

selectedFiles.forEach((file) => {
  formData.append("images", file);
});

await fetch("http://localhost:8080/api/v1/products", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: formData
});
```

## Current Backend Scope

Implemented:

- Signup
- OTP verification
- Login with JWT
- Product listing with search/category/pagination
- Product detail
- Create product
- Delete product
- Mark as sold
- User profile
- User products
- Seller contact access

Not yet implemented:

- Resend OTP
- Forgot password
- Update profile
- Edit product
- Favorites
- Chat
- Ratings/reviews
- Payments
