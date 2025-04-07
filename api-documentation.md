# Fitness Buddy API Documentation

## Base URL
`http://localhost:5000`

## Authentication Endpoints

### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "fitnessGoal": "weight loss"
  }
  ```
- **Response**: User object with token

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with token

## Workout Endpoints
All workout endpoints require Authorization header: `Bearer <token>`

### Get All Workouts
- **URL**: `/api/workouts`
- **Method**: `GET`
- **Response**: Array of workout plans

### Get Workout with Progress
- **URL**: `/api/workouts/:id/with-progress`
- **Method**: `GET`
- **Response**: Workout object with array of related progress entries

### Create Workout
- **URL**: `/api/workouts`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Full Body Workout",
    "description": "Complete workout routine",
    "exercises": [
      {
        "name": "Push-ups",
        "sets": 3,
        "reps": 10,
        "rest": "30 seconds"
      },
      {
        "name": "Squats",
        "sets": 3,
        "reps": 15,
        "rest": "45 seconds"
      }
    ],
    "goalType": "weight loss"
  }
  ```
- **Response**: Created workout object

### Update Workout
- **URL**: `/api/workouts/:id`
- **Method**: `PUT`
- **Request Body**: Same as create, with updated fields
- **Response**: Updated workout object

### Delete Workout
- **URL**: `/api/workouts/:id`
- **Method**: `DELETE`
- **Response**: Success message

## Progress Endpoints
All progress endpoints require Authorization header: `Bearer <token>`

### Get All Progress
- **URL**: `/api/progress`
- **Method**: `GET`
- **Response**: Array of progress entries with populated workout information

### Create Progress Entry
- **URL**: `/api/progress`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "note": "Felt good today",
    "completedWorkouts": 1,
    "workout": "60d21b4667d0d01f8c9822a3",  /* Workout ID */
    "completed": true,
    "completionTime": 45  /* Minutes */
  }
  ```
- **Response**: Created progress object

### Update Progress
- **URL**: `/api/progress/:id`
- **Method**: `PUT`
- **Request Body**: Same as create, with updated fields
- **Response**: Updated progress object

### Delete Progress
- **URL**: `/api/progress/:id`
- **Method**: `DELETE`
- **Response**: Success message

## User Matching Endpoint

### Get Users by Fitness Goal
- **URL**: `/api/users/match?goal=weight%20loss`
- **Method**: `GET`
- **Query Params**: `goal` (e.g., "weight loss", "muscle gain")
- **Response**: Array of matching users (without passwords)
