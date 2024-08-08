# Take home assignment


# Account and Payment Manager Services

## Overview

This project consists of two backend services:
1. **Account Manager Service**: Manages user accounts and their payment accounts.
2. **Payment Manager Service**: Handles transactions (send/withdraw) for the payment accounts.

### Features

- User registration and login.
- Manage multiple payment accounts per user (credit, debit, loan, etc.).
- Record and retrieve transaction histories.
- Send and withdraw transactions.
- API documentation with Swagger (optional).
- Auto-debit/recurring payments (optional).

## Tech Stack

- Node.js with Fastify framework
- TypeScript
- PostgreSQL with Prisma ORM
- Docker and Docker Compose
- Cypress for end-to-end testing
- Jest for unit testing

## Prerequisites

- Node.js (>=14.x)
- Docker and Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Configure Environment Variables
Create a .env file in the project root directory and add the following environment variables:
```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
JWT_SECRET="your_jwt_secret"
```

### 3. Docker Compose Usage

Docker Compose simplifies managing multi-container Docker applications. Below are the instructions for building, running, and managing your services using Docker Compose.

1. Build and Start Containers

To build and start the services defined in your docker-compose.yml file, use:
Create a .env file in the project root directory and add the following environment variables:
```bash
docker-compose up --build
```
This command performs the following:

	•	Builds the Docker images for the services.
	•	Starts the containers.
2. Access the Services
Once the containers are running, you can access the services at:

	•	Account Manager Service: http://localhost:3000
	•	Payment Manager Service: http://localhost:3001

These URLs assume default ports; adjust based on your docker-compose.yml configuration.
3. Database Migration
To set up the database schema, run the following command:
```bash
docker-compose run --rm <service-name> npx prisma migrate dev
```
Replace <service-name> with the name of the service responsible for database migrations. This command will:

	•	Run the Prisma migration script inside the container.
	•	Apply any pending migrations to the database.
4.  Seed the Database (Optional)
If you have a seed script to populate the database with initial data, run:
```bash
docker-compose run --rm <service-name> npx prisma db seed
```
5. Stop and Remove Containers
To stop and remove the containers, networks, and volumes defined in your docker-compose.yml, use:
```bash
docker-compose down
```
This command will:

	•	Stop all running containers.
	•	Remove the stopped containers, networks, and volumes.
