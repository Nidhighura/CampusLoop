# CampusLoop Backend

Spring Boot backend for the CampusLoop student marketplace.

## Stack

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Swagger / OpenAPI
- Cloudinary

## Run locally

1. Configure environment variables for database, JWT, mail, and Cloudinary.
2. Start MySQL and create a `campusloop` database.
3. Run the application with Maven:

```bash
mvn spring-boot:run
```

## Cloudinary setup

Set these before starting the backend:

```powershell
$env:CLOUDINARY_CLOUD_NAME="your_cloud_name"
$env:CLOUDINARY_API_KEY="your_api_key"
$env:CLOUDINARY_API_SECRET="your_api_secret"
$env:CLOUDINARY_FOLDER="campusloop/products"
```

How uploads work:

- `POST /api/v1/products` accepts `multipart/form-data`
- `metadata` contains the product JSON
- `images` contains up to 5 image files
- Backend uploads each file to Cloudinary
- The returned `secure_url` values are stored in the `product_images` table

## Swagger

- OpenAPI JSON: `/v3/api-docs`
- Swagger UI: `/swagger-ui.html`

## Current status

Core auth, product, user, contact, Swagger, and Cloudinary-backed image upload flows are implemented. The backend is ready for frontend integration and manual API testing.
