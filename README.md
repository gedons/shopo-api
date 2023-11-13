# E-commerce API Documentation

This documentation provides an overview of the endpoints for user registration and login in the  API.

## Table of Contents

- [User Registration](#user-registration)
- [User Login](#user-login)

## User Registration

### Register a New User

Register a new user with user details.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "password123"
  }
