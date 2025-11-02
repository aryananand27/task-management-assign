# Task Management System

Welcome to the **Task Management System**!  
This is a **Full Stack Application** built with **Node.js**, **Express**, **Sequelize**, **TypeScript**, **React.js**, and **Redux Toolkit**, using **PostgreSQL** as the database. This README provides a clear, step-by-step guide to set up and run both the **backend** and **frontend** on your local machine.

---

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

---

## Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (v20.18 or later recommended)
- **npm** (included with Node.js)
- **PostgreSQL** (v15 or later)
- **Git**

> **Tip**: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions easily.

---

## Environment Variables

Create a `.env` file in the root directory of the backend and add the following environment variables:

### Include this when you are setting up the docker
- **POSTGRES_USER**:postgres
- **POSTGRES_PASSWORD**:aryan
- **POSTGRES_DB**:tasksmanagement
- **POSTGRES_PORT**:5432

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

## Running the Backend:
**1. Navigate to Backend**

   Navigate to the backend folder using:

        cd backend
    
**2. Install Dependencies**

        npm install
   
   ### Use the exact package versions from package.json to avoid compatibility issues.

**3. Run Database Migrations**:
   
   #### I have created the migration files just follow in the same directory i.e. /backend and run
          
        npm run db:migrate

   ### This creates the necessary tables in the tasksmanagement database. This will only work when you have desired .env file and database configuration as suggested above

**4. Start the Backend Server**
   
         npm run dev

   ### Server will run at: http://localhost:4000

## Running the Frontend

**1. Navigate to Frontend**

   Navigate to the frontend folder using:

        cd ..
        cd frontend
  
**2. Install Dependencies**

        npm install
   
**3. Create .env File**
       In the frontend root, create a .env file:

       REACT_APP_API_URL='http://localhost:4000/api'

**4. Start the Frontend**
   
         npm run dev

   ### Frontend will run at: http://localhost:5173

   

## API Endpoints

   Test APIs using the provided Postman Collection:
    
   ### Postman Collection Link : https://www.postman.com/aryan2003/tasks-apis/collection/xkmshor/collection1?action=share&creator=32161965

   ### Base URL Used: http://localhost:4000/api
   

## NOTE: 
   * Use Node.js v20.18+ to avoid compatibility issues.
   * Ensure PostgreSQL is running before starting migrations.
   * For production, use secure secrets and environment-specific configs.

## Thank You! 🙌
   Built by Aryan Anand 



