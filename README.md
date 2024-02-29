# Viact Application

## Getting Started

Follow these steps to set up the Viact application locally:

### Prerequisites

- Docker

### Setup

1. Access mysql by terminal:

   ```bash
   mysql -u root -p
   ```

2. Create user in database:

   ```bash
   CREATE USER 'viact'@'localhost' IDENTIFIED BY 'viact';
   ```
3. Grant permission for user in database:

   ```bash
   GRANT ALL PRIVILEGES ON *.* TO 'viact'@'localhost';
   ```
4. Refresh permissions:

   ```bash
   FLUSH PRIVILEGES;
   ```

5. Go to the root directory of the cloned repository is "clone-dev-viact":

   ```bash
   cd frontend
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Back to the root directory:

   ```bash
   cd backend
   ```

4. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

### Running the Application

1. Back to the root directory:

   ```bash
   cd ..
   ```

2. Start docker compose

   ```bash
   docker-compose up
   ```

3. Wait for the Docker containers to finish setting up.

### Check Mysql host
Please carefully check MYSQL_HOST in the .env file of the backend folder. It must be the same as the name of the mysql container

### URLs test

- Frontend: http://localhost:3000
- Backend: http://localhost:4000