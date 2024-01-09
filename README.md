# Yassir Task Challenge

This project is built using the NestJS framework ([NestJS](https://nestjs.com/)).

## Accessing Endpoints
For access to the endpoints and various examples, refer to the [Postman collection](https://www.postman.com/crimson-sunset-8117/workspace/yassir/collection/5140236-ad41ff76-3207-4c4f-8a6c-f6881ee01aee?action=share&creator=5140236&active-environment=5140236-4d038d65-6861-4470-a5d1-034e7ecf531a). This collection provides detailed examples and access to different endpoints.

## Getting Started

### Prerequisites

Before running the project, ensure Node.js is installed. Copy the `.env.example` file to `.env` and fill in the required environment variables with their corresponding values.

### Running with Docker

```bash
docker-compose up --build
```

### Installation and Running Locally

To set up the project locally, install the required dependencies using npm:

```bash
npm install -g @nestjs/cli
npm install
```
## Running the Project
### Development Mode
To run the project in development mode:

```bash
npm run start:dev
```

### Watch Mode
For watch mode:

```bash
npm run start:watch
```

### Production Mode
To run the project in production mode:

```bash
npm run start:prod
```

## Additional Features

### Cronjob

A cronjob is set to execute automatically every minute while the app is running.

### Testing

To perform unit and integration testing:

```bash
npm run test
```


