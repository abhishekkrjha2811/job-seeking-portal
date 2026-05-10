# NEXWORK

![NEXWORK Home](project%20image/home%20page.png)

NEXWORK is a campus-focused job and freelancing platform built for students, professors, and administrators. It lets users register, verify their email, post and apply for jobs, manage applications, and chat in real time while keeping the workflow inside a university community.

## Features

- Email-based sign up and login with role-based access control
- Student and professor job posting, editing, and deletion
- Browse all jobs and category-based job discovery
- Job application flow with resume/document upload
- Application tracking for students and job posters
- Admin dashboard for managing users, jobs, applications, and platform stats
- Real-time group chat powered by Socket.IO
- Cloudinary-backed file uploads for job documents
- Responsive React UI with Redux state management and Tailwind styling

## Screenshots

### Home Page

![Home page](project%20image/home%20page.png)

### Job Posting

![Job posting](project%20image/job%20post.png)

### All Jobs

![All jobs](project%20image/all%20jobs%20posted.png)

### Candidate Applications

![Applications view](project%20image/view%20applied%20job%20candidate.png)

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.IO Client
- React Hot Toast

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Socket.IO
- Cloudinary for uploads
- Nodemailer for email verification and notifications

## Project Structure

```text
backend/
  app.js
  server.js
  config/
  controllers/
  database/
  middlewares/
  models/
  nodemailer/
  routes/
  utils/

frontend/
  src/
    components/
    data/
    hooks/
    pages/
    reducer/
    services/
    slices/
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- MongoDB connection string
- Cloudinary account for file uploads

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nexus
```

### 2. Configure the backend

Create or update `backend/config/config.env` with the required variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URI=http://localhost:3000

CLOUDNARY_CLIENT_NAME=your_cloudinary_name
CLOUDNARY_CLIENT_API=your_cloudinary_api_key
CLOUDNARY_CLIENT_SECRET=your_cloudinary_api_secret
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Run the application

You can either run both apps together from the frontend workspace or start them separately.

To run both together:

```bash
cd frontend
npm run dev
```

To run them separately, use one terminal for the backend and one for the frontend:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run start:host
```

The frontend runs on `http://localhost:3000` and the backend starts from the configured `PORT` in `config.env`.

## Available Scripts

### Frontend

- `npm run dev` - run frontend and backend together from the frontend workspace script
- `npm run start:host` - start the Vite dev server on port 3000
- `npm run build` - build the production frontend bundle
- `npm run lint` - run ESLint

### Backend

- `npm run dev` - start the backend with nodemon
- `npm start` - start the backend with Node.js

## Main Routes

- `/` - home
- `/login` - login
- `/signup` - sign up
- `/job` - browse jobs
- `/post-job` - create a job post
- `/my-applications` - student applications
- `/my-posted-jobs` - posted jobs dashboard
- `/dashboard/my-profile` - profile page
- `/messages` - group chat
- `/categories` - all categories
- `/about` - about page
- `/how-it-works` - platform guide

## API Overview

### User

- `POST /api/v1/user/register`
- `POST /api/v1/user/login`
- `POST /api/v1/user/verify-email`
- `GET /api/v1/user/logout`
- `GET /api/v1/user/getuser`

### Jobs

- `GET /api/v1/job/getall`
- `POST /api/v1/job/post`
- `GET /api/v1/job/getmyjobs`
- `PUT /api/v1/job/update/:id`
- `DELETE /api/v1/job/delete/:id`
- `GET /api/v1/job/:id`

### Applications

- `POST /api/v1/application/apply`
- `GET /api/v1/application/professor/applications`
- `GET /api/v1/application/student/applications`
- `DELETE /api/v1/application/student/delete/:id`
- `PUT /api/v1/application/update-status/:id`

### Admin

- `GET /api/v1/admin/stats`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/jobs`
- `GET /api/v1/admin/applications`
- `DELETE /api/v1/admin/user/:id`
- `PUT /api/v1/admin/user/role/:id`
- `DELETE /api/v1/admin/job/:id`
- `DELETE /api/v1/admin/application/:id`

## Notes

- The backend uses cookie-based JWT authentication.
- File uploads are handled through `express-fileupload` and Cloudinary.
- Real-time messaging is powered by Socket.IO.
- The frontend README inside `frontend/README.md` is the default Vite scaffold and can be ignored in favor of this project-level README.
