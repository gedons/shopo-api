# API Documentation

This documentation provides an overview of the endpoints for user registration and login in the  API.

## Table of Contents

- [User Registration](#user-registration)
- [User Login](#user-login)
- [Authentication](#authentication)

## User Registration

### Register a New User

Register a new user with user details.

- **URL:** `/auth/register`
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


