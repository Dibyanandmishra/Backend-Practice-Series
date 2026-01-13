# 📺 YouTubeChai – Backend API

A **YouTube-like backend REST API** built using **Node.js, Express, MongoDB**.  
This project supports **user authentication, video upload, subscriptions, likes, comments, playlists**, and more.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization  
- 👤 User Management (Register, Login, Profile)  
- 🎥 Video Upload & Management (CRUD)  
- ❤️ Like / Unlike Videos & Comments  
- 💬 Comment System  
- 📂 Playlists  
- 🔔 Channel Subscriptions (Subscribe / Unsubscribe)  
- 📊 Dashboard APIs  
- 🩺 Health Check API  
- ☁️ Cloudinary integration for media storage  
- 📦 Multer for file uploads  
- 🧩 Clean MVC architecture  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT (JSON Web Token)  
- **File Upload:** Multer  
- **Cloud Storage:** Cloudinary  
- **Pagination:** mongoose-aggregate-paginate-v2  

---

## 📁 Project Structure
```bash
backend_chaiAurCode/
│
├── public/
│ └── temp/ # Temporary uploads
│
├── src/
│ ├── controllers/ # All route controllers
│ ├── middlewares/ # Auth & multer middlewares
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── utils/ # Helpers (ApiError, ApiResponse, asyncHandler)
│ ├── constants.js
│ ├── app.js
│ └── index.js
│
├── .env
├── package.json
└── README.md

yaml
Copy code

---
```

## 🔐 Authentication Flow

1. User registers or logs in  
2. Server returns a **JWT access token**  
3. Token must be sent in headers for protected routes  

Authorization: Bearer <your_jwt_token>

yaml
Copy code

---

## 📌 API Routes Overview

### 👤 User Routes
POST /users/register
POST /users/login
GET /users/current-user
PATCH /users/update-account

shell
Copy code

### 🎥 Video Routes
GET /videos
POST /videos
GET /videos/:videoId
PATCH /videos/:videoId
DELETE /videos/:videoId
PATCH /videos/toggle/publish/:videoId

shell
Copy code

### ❤️ Like Routes
POST /likes/toggle/v/:videoId
POST /likes/toggle/c/:commentId

shell
Copy code

### 💬 Comment Routes
GET /comments/:videoId
POST /comments/:videoId

shell
Copy code

### 🔔 Subscription Routes
POST /subscriptions/c/:channelId
GET /subscriptions/u/:subscriberId
GET /subscriptions/c/:channelId

shell
Copy code

### 📂 Playlist Routes
POST /playlists
PATCH /playlists/:playlistId
DELETE /playlists/:playlistId

shell
Copy code

### 🩺 Health Check Route
GET /healthcheck

yaml
Copy code

---

## 📦 Environment Variables

Create a `.env` file in the root directory:

PORT=8000
MONGODB_URL=your_mongodb_url
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

yaml
Copy code

---

## ▶️ Run Project Locally

```bash
npm install
npm run dev
Server will start at:

arduino
Copy code
http://localhost:8000
```

## 🧪 API Testing
### Use Postman

All protected routes require Bearer Token

File uploads must be sent using form-data

Correct field names are required for multer uploads

## 📌 Learning Outcome
This project helped me learn:

Real-world backend project structure

Authentication & authorization using JWT

File upload handling with Multer

MongoDB aggregation pipelines

Centralized error handling

Clean and scalable REST API design

## 🙌 Acknowledgement
Inspired by Chai aur Code backend practices.
This project is built purely for learning and practice purposes.

## 👨‍💻 Author
Dibyanand
CSE Student | Backend Developer
🚀 Learning by building real-world projects