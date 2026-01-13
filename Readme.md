📺 YouTubeChai – Backend API

A YouTube-like backend REST API built using Node.js, Express, MongoDB.
This project supports user authentication, video upload, subscriptions, likes, comments, playlists, and more.

🚀 Features

🔐 JWT-based Authentication & Authorization

👤 User Management (Register, Login, Profile)

🎥 Video Upload & Management (CRUD)

❤️ Like / Unlike Videos & Comments

💬 Comment System

📂 Playlists

🔔 Channel Subscriptions (Subscribe / Unsubscribe)

📊 Dashboard & Health Check APIs

☁️ Cloudinary integration for media storage

📦 Multer for file uploads

🧩 Clean MVC architecture

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JWT

File Upload: Multer

Cloud Storage: Cloudinary

Pagination: mongoose-aggregate-paginate-v2

📁 Project Structure
backend_chaiAurCode/
│
├── public/
│   └── temp/                # Temporary uploads
│
├── src/
│   ├── controllers/         # All route controllers
│   ├── middlewares/         # Auth & multer middlewares
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── utils/               # Helpers (ApiError, ApiResponse, asyncHandler)
│   ├── constants.js
│   ├── app.js
│   └── index.js
│
├── .env
├── package.json
└── README.md

🔐 Authentication Flow

User registers / logs in

Server returns JWT access token

Token is sent in headers for protected routes:

Authorization: Bearer <your_jwt_token>

📌 API Routes Overview
👤 User Routes
POST   /users/register
POST   /users/login
GET    /users/current-user
PATCH  /users/update-account

🎥 Video Routes
GET    /videos
POST   /videos
GET    /videos/:videoId
PATCH  /videos/:videoId
DELETE /videos/:videoId
PATCH  /videos/toggle/publish/:videoId

❤️ Like Routes
POST /likes/toggle/v/:videoId
POST /likes/toggle/c/:commentId

💬 Comment Routes
GET  /comments/:videoId
POST /comments/:videoId

🔔 Subscription Routes
POST /subscriptions/c/:channelId
GET  /subscriptions/u/:subscriberId
GET  /subscriptions/c/:channelId

📂 Playlist Routes
POST   /playlists
PATCH  /playlists/:playlistId
DELETE /playlists/:playlistId

🩺 Health Check
GET /healthcheck

📦 Environment Variables

Create a .env file in root:

PORT=8000
MONGODB_URL=your_mongodb_url
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

▶️ Run Locally
npm install
npm run dev


Server will start at:

http://localhost:8000

🧪 API Testing

Use Postman

All protected routes require Bearer Token

File uploads must be sent as form-data

📌 Learning Outcome

This project helped me understand:

Real-world backend architecture

Authentication & authorization

File upload handling

MongoDB aggregation pipelines

Clean error handling

Scalable REST API design

🙌 Acknowledgement

Inspired by Chai aur Code backend practices.
Built for learning and practice purposes.

👨‍💻 Author

Dibyanand
CSE Student | Backend Developer
🚀 Learning by building real projects