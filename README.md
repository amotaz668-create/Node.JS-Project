# 🚀 Course Management REST API

A robust **Backend REST API** built using **Node.js, Express.js, and MongoDB**, designed to manage courses, users, and authentication with secure role-based access control.

## 📌 Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT Authentication
- Role-Based Authorization (**Admin, Manager, User**)
- Protected Routes

### 📚 Course Management
- Create Course
- Update Course
- Delete Course
- Get Single Course
- Get All Courses

### 👤 User Management
- User Profiles
- Role Management
- Authorization Handling

### 📂 File Upload
- Upload files using **Multer**

### ✅ Validation & Error Handling
- Request validation using **Express Validator**
- Centralized Error Handling Middleware

### 📄 Pagination
- Pagination support for API responses

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**
- **Mongoose**

### Authentication
- **JWT (JSON Web Token)**

### Validation
- **Express Validator**

### File Upload
- **Multer**

---

## 📁 Project Structure

```bash
project/
│── controllers/
│── middleware/
│── models/
│── routes/
│── uploads/
│── utils/
│── config/
│── app.js
│── server.js
│── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### 2️⃣ Navigate to project directory

```bash
cd YOUR_REPO
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run the server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### Courses

| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/courses` | Get All Courses |
| GET | `/api/courses/:id` | Get Single Course |
| POST | `/api/courses` | Create Course |
| PUT | `/api/courses/:id` | Update Course |
| DELETE | `/api/courses/:id` | Delete Course |

---

## 🧪 Testing

Use **Postman** to test API endpoints.

---

## 🔒 Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Permissions
- Input Validation

---

## 🎯 Future Improvements

- Swagger API Documentation
- Refresh Tokens
- Docker Support
- Unit Testing
- Rate Limiting

---

## 👨‍💻 Author

**Moataz Ahmed**  
📍 Giza, Egypt  
🔗 LinkedIn: https://linkedin.com/in/moataz-ahmed-0153403a0
