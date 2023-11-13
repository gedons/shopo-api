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

- **URL:** `/auth/register`
    - **Method:** `POST`
    - **Request Body:**
