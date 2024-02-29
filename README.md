# Viact Application

## Getting Started

Follow these steps to set up the Viact application locally:

### Prerequisites

- Docker

### Setup

1. Go to the root directory of the cloned repository is "clone-dev-viact":

   ```bash
   cd frontend
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Back to the root directory:
   ```bash
   cd ..
   ```

4. Go to the `backend`:
   ```bash
   cd backend
   ```

5. Copy the `.env.example` file to `.env`:

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
   docker compose up
   ```

3. Wait for the Docker containers to finish setting up.

### Check Mysql host
Please carefully check MYSQL_HOST in the .env file of the backend folder. It must be the same as the name of the mysql container

### URLs test

- Frontend: http://localhost:3000
- Backend: http://localhost:4000