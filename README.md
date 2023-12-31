# API Documentation

This documentation provides an overview of the endpoints for user registration and login in the  API.

## Table of Contents

- [User Registration](#user-registration)
- [User Login](#user-login)
- [Authentication](#authentication)

## User Registration

### Register a New User

Register a new user.

- **URL:** `https://shopo-api.onrender.com/api/v1/auth/register`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "firstname": "exampleFirst",
    "lastname": "exampleLast",
    "email": "user@example.com",
    "password": "password123",
    "state": "exampleState",
    "country": "exampleCountry",
    "phone": "examplephone",
    "postcode": "exampleCode",
  }

- **Success Response:** 
    - **Status Code:** `201 (Created)`
    - **Request Body:**

      ```json
      {
       "message": "User registered successfully"
      }

- **Error Response:** 
    - **Status Code:** `400 (Bad Request)`
    - **Request Body:**

      ```json
      {
       "message": "Email already in use"
      }

    - **Status Code:** `500 (Internal Server Error)`
    - **Request Body:**

      ```json
      {
       "message": "Registration failed",
       "error": "Internal server error message"
      }

## User Login

### Login User

Authenticate a user by providing their email and password.

- **URL:** `https://shopo-api.onrender.com/api/v1/auth/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
   "email": "user@example.com",
   "password": "password123"
  }

- **Success Response:** 
    - **Status Code:** `200 (OK)`
    - **Request Body:**

      ```json
      {
        "user": {
            "_id": "65521ca99eb34a5c09cfaff6",
            "firstname": "Gedoni",
            "lastname": "Ani",
            "email": "gedoniani@gmail.com",
            "password": "$2b$10$GxkXJxt0zyR.OqQ1K1DGTORtvxT06QWGLddOBQpQ4BduacSKu8TVS",
            "isAdmin": false,
            "state": "Delta",
            "country": "Nigeria",
            "phone": "9098783626",
            "postcode": "345TVA",
            "address": "Asaba mall estate",
            "createdAt": "2023-11-13T12:55:05.258Z",
            "updatedAt": "2023-11-13T12:55:05.258Z",
       },
       "authToken": "created-jwt-token-here"
      }

- **Error Response:** 
    - **Status Code:** `401 (Unauthorized)`
    - **Request Body:**

      ```json
      {
       "message": "Invalid email or password"
      }

    - **Status Code:** `500 (Internal Server Error)`
    - **Request Body:**

      ```json
      {
       "message": "Login failed",
       "error": "Internal server error message"
      } 


## Authentication

For authenticated routes, include the JWT token in the Authorization header.

Note: This is the token received upon successful login.

```json
 {
   "authToken": "created-jwt-token-here"
 }


