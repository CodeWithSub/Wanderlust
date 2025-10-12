# Wanderlust

**Note**: This project was developed as a learning exercise during my initial journey into full-stack web development. While it showcases various functionalities, it's a foundational project and may not include advanced optimizations or enterprise-level features.

Wanderlust is a full-stack web application designed to help users discover and book unique accommodations around the world. It features a comprehensive listing system, user authentication, reviews, and an interactive map to showcase property locations.

## Features

- **User Authentication**: Secure user registration, login, and logout functionalities using Passport.js.
- **Listing Management**: Users can create, view, edit, and delete their own accommodation listings.
- **Review System**: Users can leave ratings and comments on listings.
- **Interactive Map**: Listings are displayed on an interactive map powered by Mapbox.
- **Image Uploads**: Cloudinary integration for secure and efficient image storage.
- **Future Enhancements**: Planned features include advanced search, filtering options, and more.
- **Flash Messages**: User-friendly notifications for successful operations and errors.

## Project Structure

```
.
├── controllers/          # Contains the logic for handling requests (e.g., listings, reviews, users)
├── init/                 # Database initialization scripts and sample data
├── middleware.js         # Custom middleware functions for authentication and authorization
├── models/               # Mongoose schemas and models for database interaction
├── public/               # Static assets like CSS, JavaScript, and images
│   ├── JS/               # Client-side JavaScript files
│   └── styles/           # CSS stylesheets
├── routes/               # Defines API endpoints and links them to controller functions
├── views/                # EJS templates for rendering dynamic content
│   ├── includes/         # Reusable EJS partials (e.g., header, footer, flash messages)
│   ├── layouts/          # Base EJS layouts (e.g., boilerplate)
│   ├── listings/         # EJS templates specific to listing management
│   └── users/            # EJS templates specific to user authentication
├── app.js                # Main application file, sets up Express, middleware, and routes
├── cloudConfig.js        # Cloudinary configuration for image uploads
├── .env                  # Environment variables (e.g., database URL, API keys)
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Records the exact versions of dependencies
├── README.md             # Project overview and documentation
└── schema.js             # Joi schemas for server-side data validation
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Frontend**: EJS (Embedded JavaScript) for templating, HTML, CSS, JavaScript
- **Authentication**: Passport.js
- **Cloud Storage**: Cloudinary for image uploads
- **Mapping**: Mapbox GL JS
- **Session Management**: `express-session` with `connect-mongo` for session storage
- **Environment Variables**: `dotenv`

## Setup and Installation

To get Wanderlust up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/CodeWithSub/Wanderlust.git
    cd Wanderlust
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project and add the following:
    ```
    ATLAS_DB_URL=mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@<YOUR_CLUSTER_URL>/<YOUR_DATABASE_NAME>?retryWrites=true&w=majority&appName=<YOUR_APP_NAME>
    CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUD_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUD_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
    MAPBOX_TOKEN=<YOUR_MAPBOX_ACCESS_TOKEN>
    ```
    *Replace the placeholder values with your actual credentials from MongoDB Atlas, Cloudinary, and Mapbox.*

4.  **Initialize the database (optional):**
    To populate your database with sample data, run the initialization script:
    ```bash
    node init/index.js
    ```

5.  **Start the server:**
    ```bash
    node app.js
    ```

    The application will be accessible at `http://localhost:8080`.

## Usage

-   **Browse Listings**: View all available accommodation listings on the homepage.
-   **Create New Listing**: Log in as a user and create your own listing with details and images.
-   **Review Listings**: Share your experience by adding reviews and ratings to accommodations.
-   **User Profiles**: Manage your account and view your created listings.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.