# LapinouMath Backend

Express.js backend API for the LapinouMath educational platform with PostgreSQL, JWT authentication, and data synchronization endpoints.

## Features

- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **Profile Management**: Create and manage student profiles with grade levels
- **Progress Tracking**: Store and sync user progress across domains and levels
- **Data Synchronization**: Bulk sync endpoint for frontend-to-backend data synchronization
- **Type Safety**: Full TypeScript support with strict mode enabled
- **Input Validation**: express-validator for request validation
- **Security**: Helmet.js for security headers, CORS protection
- **Database**: PostgreSQL with migrations support

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Language**: TypeScript 5.5.3
- **Database**: PostgreSQL with pg driver
- **Authentication**: JWT + bcryptjs
- **Testing**: Vitest
- **Development**: tsx for TypeScript execution

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL connection details

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled backend
- `npm run test` - Run tests with Vitest
- `npm run test:coverage` - Run tests with coverage report
- `npm run db:migrate` - Run database migrations
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
  - Body: `{ email, username, password }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

### Profiles

- `POST /api/profiles` - Create new profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, gradeLevel }`

- `GET /api/profiles` - List user profiles
  - Headers: `Authorization: Bearer <token>`

- `GET /api/profiles/:id` - Get specific profile
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/profiles/:id` - Update profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name?, gradeLevel?, totalStars? }`

- `DELETE /api/profiles/:id` - Delete profile
  - Headers: `Authorization: Bearer <token>`

### Progress

- `GET /api/progress/:profileId` - Get profile progress
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/progress/:profileId/:domain` - Update domain progress
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ level, stats }`

- `POST /api/progress/sync/:profileId` - Bulk sync progress data
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ progressData: [{ domain, level, stats }] }`

## Database Schema

### users
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE)
- `username` (VARCHAR UNIQUE)
- `password_hash` (VARCHAR)
- `created_at` (TIMESTAMP)

### profiles
- `id` (SERIAL PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `name` (VARCHAR)
- `grade_level` (VARCHAR)
- `total_stars` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### progress
- `id` (SERIAL PRIMARY KEY)
- `profile_id` (FOREIGN KEY)
- `level` (INTEGER)
- `domain` (VARCHAR)
- `stats` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### quiz_results
- `id` (SERIAL PRIMARY KEY)
- `profile_id` (FOREIGN KEY)
- `level` (INTEGER)
- `domain` (VARCHAR)
- `score` (FLOAT)
- `timestamp` (TIMESTAMP)

### sync_logs
- `id` (SERIAL PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `action` (VARCHAR)
- `entity_type` (VARCHAR)
- `entity_id` (INTEGER)
- `timestamp` (TIMESTAMP)

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_DATABASE` - Database name
- `DB_USERNAME` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - JWT token expiration (default: 7d)
- `CORS_ORIGIN` - Allowed CORS origins

## Docker Development

Run PostgreSQL in Docker:

```bash
docker-compose up -d
```

This will start a PostgreSQL instance on `localhost:5432` with the credentials from `.env`.

## Testing

Run tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security

- Passwords are hashed with bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days by default
- CORS is configured to allow specific origins
- Helmet.js provides security headers
- SQL injection is prevented using parameterized queries

## Development

### Project Structure

```
backend/
├── src/
│   ├── config.ts           # Configuration management
│   ├── database.ts         # PostgreSQL connection pool
│   ├── server.ts           # Express server setup
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── migrations/         # Database migrations
│   └── types/              # TypeScript types
├── dist/                   # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

For production deployment with Docker, see `docker-compose.prod.yml`.

## Contributing

1. Follow TypeScript strict mode rules
2. Write tests for new features
3. Use meaningful commit messages
4. Ensure linting passes: `npm run lint`

## License

MIT

## Support

For issues and feature requests, please create an issue on the GitHub repository.
