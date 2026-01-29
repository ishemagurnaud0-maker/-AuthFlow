# AuthFlow

A modern, full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js). Features secure user registration, login, and protected routes with JWT authentication.

## 🚀 Features

- ✅ User Registration & Login
- ✅ JWT Token Authentication
- ✅ Password Hashing with bcrypt
- ✅ Protected Routes
- ✅ Persistent Login (localStorage)
- ✅ Password Visibility Toggle
- ✅ Responsive Design with Tailwind CSS
- ✅ Form Validation
- ✅ Error Handling

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/ishemagurnaud0-maker/authflow.git
cd authflow
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Environment Variables

```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```
Server runs on `http://localhost:3000`

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📁 Project Structure
```
authflow/
├── backend/
│   ├── models/
│   │   └── auth.js          # User model
│   ├── routes/
│   │   └── index.js         # Auth routes
│   ├── middleware/
│   │   └── authen.js        # JWT verification
│   ├── server.js            # Entry point
│   └── .env                 # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Home.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```


### Request Examples

**Register:**
```json
POST /api/user/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```json
POST /api/user/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "U001",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 🎨 Features Walkthrough

### User Registration
- Username, email, and password validation
- Password hashing before storage
- Automatic user ID generation
- JWT token generation
- Duplicate email/username prevention

### User Login
- Email and password verification
- JWT token generation
- Persistent session with localStorage
- Automatic redirect on success

### Protected Routes
- JWT token verification
- Automatic redirect to login if unauthorized
- Token stored in localStorage
- Logout functionality

### Password Visibility Toggle
- Eye icon to show/hide password
- Improves user experience
- Accessible button design

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Protected Routes**: Middleware verification
- **CORS**: Configured for security
- **Environment Variables**: Sensitive data protection

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Mac (with Homebrew)
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

**Port Already in Use:**
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change the PORT in `.env` or kill the process using the port.
```

## 🚀 Deployment

### Deploy Backend (Render)
1. Push code to GitHub
2. Create account on [Render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Add environment variables
6. Deploy

### Deploy Frontend (Vercel)
1. Push code to GitHub
2. Create account on [Vercel.com](https://vercel.com)
3. Import repository
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com`
5. Deploy

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub](https://github.com/ishemagurnaud0-maker)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📧 Contact

For any questions or feedback, feel free to reach out at [ishemagurnaud0.email@gmail.com](mailto:ishemagurnaud0@gmail.com)

---

