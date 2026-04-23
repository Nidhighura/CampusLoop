# Docker Setup

This project can run fully with Docker Compose:

```powershell
cd D:\CampusLoop
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api/v1`
- Swagger: `http://localhost:8080/swagger-ui.html`
- MySQL: `localhost:3306`

Default database credentials in `docker-compose.yml`:

- database: `campusloop`
- username: `root`
- password: `rootpassword`

Before production deployment, update:

- `JWT_SECRET`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

To stop everything:

```powershell
docker compose down
```

To stop and remove database data too:

```powershell
docker compose down -v
```
