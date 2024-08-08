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
