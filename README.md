# CineList

## Project Overview

CineList is a RESTful API designed for managing and interacting with movie lists. This project integrates with The Movie Database (TMDB) API to fetch and manipulate movie data. The API supports operations to create, retrieve, and delete movie lists and provides functionality to find movies that appear across multiple lists. Built with Express.js, the backend handles asynchronous operations with axios and integrates with MongoDB for persistent data storage. Additionally, JSON Web Tokens (JWT) are used for secure user authentication and access control.

## Features

- **Create, Retrieve, and Delete Lists**: Manage movie lists with endpoints to add new lists, fetch existing lists, and delete lists.
- **Combine Lists**: Find movies that appear in all lists, demonstrating the ability to handle complex data manipulation and filtering.
- **Integration with TMDB API**: Fetch movie details and manage pagination to handle large datasets from the TMDB API.
- **Error Handling**: Robust error handling for API requests and responses to ensure reliability and user-friendly error messages.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens (JWT), providing access control to protected routes and user-specific data.
- **MongoDB Integration**: Persistent data storage with MongoDB, handling user and movie list data efficiently and supporting complex queries.


## Folder Structure

The project is organized into the following folders and files:

- **Controllers**: Contains the logic for handling API requests.
  - `lists.js`: Defines handlers for operations such as fetching, deleting, and adding movie lists.
  - `user.js`: Contains handlers for user authentication and management.

- **Models**: Defines data structures and interactions with the database.
  - `list.js`: Contains the schema and methods for managing movie lists.
  - `user.js`: Defines the schema and methods for user management.

- **Routes**: Maps HTTP methods and paths to controller functions.
  - `lists.js`: Defines API endpoints for managing movie lists, connecting them to the appropriate controller functions.
  - `user.js`: Defines API endpoints for user authentication and management.

- **Utils**: Contains utility functions used across the project.
  - `lists.js`: Includes helper functions for managing movie lists, such as combining lists and filtering.
  - `user.js`: Includes helper functions for user sign-up and login
- **Middleware**: Handles authentication and authorization.
  - `auth.js`: Middleware for verifying JWT tokens to secure API endpoints.

- **app.js**: The main entry point of the application that sets up the Express server, middleware, and routes.


## Implementation Details

### Backend Features

- **CRUD Operations**: Implemented using Express.js to manage movie lists. The API allows users to create, retrieve, and delete lists with simple HTTP requests.
- **Error Handling**: Implemented error handling in API requests to manage issues such as missing lists, API errors, and response parsing errors.
- **Asynchronous Requests**: Used `axios` to handle asynchronous API requests to TMDB, ensuring that the server can manage multiple requests efficiently.
- **JWT Authentication**: Utilized JSON Web Tokens (JWT) for secure user authentication. The JWT tokens are used to verify user identity and manage access to protected routes.
- **MongoDB Integration**: Integrated MongoDB for persistent data storage. MongoDB handles storing and querying user and movie list data, allowing for efficient data management and retrieval.

### Integration with TMDB API

- **API Key Management**: The TMDB API key is stored securely and used to authenticate requests to fetch movie data.
- **Pagination Handling**: Implemented logic to handle pagination when fetching large movie lists, ensuring that all movies are retrieved regardless of the number of pages.

### JWT Authentication

- **User Authentication**: Utilizes JWT for secure user authentication. Tokens are generated upon successful login and used to protect sensitive API endpoints.
- **Token Expiry**: Tokens have a set expiration time to enhance security, and expired tokens prompt the deletion of associated user data if necessary.

### MongoDB Integration

- **Database Storage**: Uses MongoDB to store movie lists and user data persistently. This allows for advanced querying and efficient data management.
- **Schema Design**: Defines schemas for movie lists and users, with references to ensure data integrity and relationships between collections.

## How to Use

1. **Clone the Repository**: Download the project from GitHub.
   ```bash
   https://github.com/AhmedMo1242/CineList
   ```
2. **Navigate to the Project Directory**: Change to the project folder.
    ```bash
    cd <<Folder>>
      ```
3. **Install Dependencies**: Run `npm install` to install required packages.
    ```bash
    npm install
      ```
4. **Run the Application**: Start the server with `node app.js`.
    ```bash
    node app.js
      ```
      
## Future Work

- **Actor and Genre Filters**: Add more advanced filters to enhance search capabilities by actors and genres.
- **AI Recommendations**: Enhance recommendations based on user behavior and preferences using AI-driven algorithms.
- **Multiple API Integrations**: Expand functionality to include data from additional movie sources such as Letterboxd and IMDb.

## Additional Information

CineList provides a comprehensive example of backend development and API integration, with features to manage and interact with movie data. For more details on the TMDB API, refer to the [TMDB API documentation](https://www.themoviedb.org/documentation/api).
