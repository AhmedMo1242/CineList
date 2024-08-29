# CineList

## Project Overview

**CineList** is a RESTful API designed for managing and interacting with movie lists. This project integrates with The Movie Database (TMDB) API to fetch and manipulate movie data. The API supports operations to create, retrieve, and delete movie lists, and it provides functionality to find movies that appear across multiple lists. The project showcases the use of Express.js for building a backend application, handling asynchronous operations with `axios`, and integrating external APIs.

## Features

- **Create, Retrieve, and Delete Lists**: Manage movie lists with endpoints to add new lists, fetch existing lists, and delete lists.
- **Combine Lists**: Find movies that appear in all lists, demonstrating the ability to handle complex data manipulation and filtering.
- **Integration with TMDB API**: Fetch movie details and manage pagination to handle large datasets from the TMDB API.
- **Error Handling**: Robust error handling for API requests and responses to ensure reliability and user-friendly error messages.

## Folder Structure

The project is organized into the following folders and files:

- **Controllers**: Contains the logic for handling API requests.
  - `lists.js`: Defines handlers for operations such as fetching a list, deleting a list, adding a list, and retrieving movies that appear in all lists.

- **Models**: Defines data structures and interactions.
  - `lists.js`: Contains the `CreateList` function and the `lists` array to manage movie lists.

- **Routes**: Maps HTTP methods and paths to controller functions.
  - `lists.js`: Defines API endpoints and connects them to the appropriate controller functions.

- **Utils**: Contains utility functions used across the project.
  - `lists.js`: Includes helper functions such as `CombineLists` for identifying movies that appear in all lists and `DeleteList` for removing lists.

- **app.js**: The main entry point of the application that sets up the Express server, middleware, and routes.

## Implementation Details

### Backend Features

- **CRUD Operations**: Implemented using Express.js to manage movie lists. The API allows users to create, retrieve, and delete lists with simple HTTP requests.
- **Error Handling**: Implemented error handling in API requests to manage issues such as missing lists, API errors, and response parsing errors.
- **Asynchronous Requests**: Used `axios` to handle asynchronous API requests to TMDB, ensuring that the server can manage multiple requests efficiently.

### Integration with TMDB API

- **API Key Management**: The TMDB API key is stored securely and used to authenticate requests to fetch movie data.
- **Pagination Handling**: Implemented logic to handle pagination when fetching large movie lists, ensuring that all movies are retrieved regardless of the number of pages.

### Custom Logic

- **Combine Lists**: Developed a method to find movies that appear in all provided lists. This logic involves filtering and comparing movies across multiple lists to identify common entries.

## Future Work

- **Database Integration**:
  Integrate MongoDB for persistent data storage, allowing for advanced data querying and management.

- **Support for Multiple Sites**:
  Expand functionality to include movie data from additional sources or APIs, enhancing the breadth of information available.

- **Authentication**:
  Implement user authentication and authorization to secure endpoints and manage user-specific data.

- **Additional Features**:
  Add features like user ratings, reviews, and improved search capabilities to enhance the API's functionality and user experience.

## Additional Information

CineList demonstrates practical applications of backend development concepts and external API integration. Feel free to contribute or reach out with questions or suggestions. For details on using the TMDB API, refer to the [TMDB API documentation](https://www.themoviedb.org/documentation/api).
