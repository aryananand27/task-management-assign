# Task Management System

Welcome to the Task Management System! This is a Full Stack Application built with Node.js, Express, Sequelize, Typescript, React.js, Redux Toolkit designed to manage tasks with PostgreSQL as the database. This README will guide you through setting up and running the backend annd frontend on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Database Migration](#database-migration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v20.x or later recommended)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or later)
- **Git** (for cloning the repository)

## Environment Variables

Create a `.env` file in the root directory of the backend and add the following environment variables:
- **PORT**: The port on which the backend will run (default: 4000).
- **NODE_ENV**: Set to `development` for local development.
- **DB_USER**: PostgreSQL username (default: `postgres`).
- **DB_PASSWORD**: PostgreSQL password (default: `aryan`).
- **DB_NAME**: Name of the PostgreSQL database (default: `tasksmanagement`).
- **DB_HOST**: Database host (default: `localhost`).
- **DB_PORT**: PostgreSQL port (default: `5432`).
- **JWT_SECRET**: Secret key for JSON Web Tokens.
- **REFRESH_TOKEN_SECRET**: Secret key for refresh tokens.

**Note**: Ensure your PostgreSQL server is running and the database user has the necessary permissions to create the `tasksmanagement` database.

## Installation

1. **Clone the Repository**:
   Navigate to your desired directory and clone the repository:
   ```bash
   git clone https://github.com/aryananand27/task-management-assign.git

2. **Move to the direrctory**:

    Navigate to the backend folder using:

       cd backend
    use

        npm install
   to install the packages
         Please try to install the specified verions of packages for  smooth installation and running of application

3. **Setup the Database now**:
   
   I have created the migration files just do in the same directory backend 
          run

        npm run db:migrate
   This will only work when you have desired .env file and datasbe configuration as suggested above

4. ** Run The Server**
   
         npm run dev

## Frontend Installation

1. **Move to the direrctory**:

   Navigate to the frontend folder using:

        cd ..
        cd frontend
    use

       npm install
    to install the packages
         Please try to install the specified verions of packages for  smooth installation and running of application
   
2. **.env file**
       make .env file add

       REACT_APP_API_URL='http://localhost:4000/auth'
3. **Run the application**

       npm run dev

## Useful Link
  -- Postman:
      
      https://www.postman.com/aryan2003/tasks-apis/collection/xkmshor/collection1?action=share&creator=32161965


## NOTE: 
   please note that use node version >20.18 to run the application in the latest version 

# Thank you 



