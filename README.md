Project Overview
The web application is designed to provide a platform where users can manage their favorite stores in Jönköping city and discover more about city gems. It offers functionalities like user authentication, store browsing, and managing favorite stores. The application is structured into various components, including user and store management, and is designed to be scalable and maintainable.

Key Features
User Authentication: Allows users to sign up, log in, and log out. It includes validations to handle errors such as duplicate usernames or missing fields.
Store Management: Users can view a list of stores and add them to their favorites. The application prevents adding a store to favorites if it's already added.
REST API: A RESTful API endpoint is available to fetch all stores, enabling integration with external systems or future development of mobile applications or third-party services.
Technical Stack. Here is the link to the API : http://localhost:3000/api/stores
Backend: The server-side logic is implemented using Node.js, with Express.js as the web application framework.
Frontend: The user interface is rendered server-side using Handlebars templates, which provide dynamic content rendering.
Database: MySQL is used for data persistence, storing user and store information, along with favorite relationships.
Security: bcrypt is utilized for password hashing, ensuring user credentials are securely stored.
Docker Configuration
The application is containerized using Docker, which simplifies deployment and ensures consistency across different environments.
Web Application Container: Built from the official Node.js image, it mounts the application source code and exposes port 3000.
MySQL Container: Uses the MySQL 5.7.33 image, initialized with a script to set up the database schema. Data is persisted using a Docker volume.
Deployment and Development

This web application serves as a robust platform for managing favorite stores, with a focus on user experience and data integrity. The REST API adds a layer of extensibility, preparing the application for future enhancements. Dockerization ensures a streamlined workflow from development to production, promoting efficiency and reducing potential environmental discrepancies.
