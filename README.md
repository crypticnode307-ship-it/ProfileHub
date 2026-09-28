# Practice Web App

A simple full-stack web application built with Express.js and SQLite for user registration, login, and authenticated profile access.

## Features

- User registration with validation
- User login with password verification
- JWT-based authentication
- Protected user profile route
- Static frontend pages for login, registration, and dashboard
- SQLite database for storing user records

## Tech Stack

- Node.js
- Express.js
- SQLite (`better-sqlite3`)
- bcrypt for password hashing
- JWT for authentication
- Vanilla JavaScript for frontend logic

## Project Structure

```text
practice/
├── app.js
├── server.js
├── package.json
├── .env
├── database/
│   └── db.js
├── controllers/
│   └── usersController.js
├── middleware/
│   └── authUser.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   └── js/
├── routes/
│   └── usersRouter.js
└── README.md
```

## Prerequisites

- Node.js installed
- npm installed

## Installation

1. Clone or download the project.
2. Open the project folder in your terminal.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root with a secret key:

```env
JWT_SECRET=your_super_secret_key_here
```

## Run the Project

Start the development server:

```bash
npm run dev
```

Then open your browser at:

```text
http://localhost:3000
```

## API Endpoints

### Register a user

```http
POST /users
```

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login a user

```http
POST /users/login
```

Request body:

```json
{
  "username": "john",
  "password": "password123"
}
```

### Get logged-in user data

```http
GET /users
```

Headers:

```http
Authorization: Bearer <token>
```

## Notes

- The application stores user data in a local SQLite database file named `library`.
- Tokens are valid for 1 hour by default.
- The frontend uses `localStorage` to store the JWT token after login or registration.

## License

This project is licensed under the ISC License.
