# Job Application Tracker

A full-stack application for tracking job applications built with React, Node.js, Express, and MongoDB.

## Features

- Add, edit, and delete applications
- Search applications
- Filter by status
- View application statistics

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

Install dependencies:

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

## Run the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

## API Endpoints

```http
GET    /api/applications
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id
```

## Demo

- Demo video link: "https://player.cloudinary.com/embed/?cloud_name=dh8vmxbf4&public_id=Screen_Recording_2026-06-19_at_17.03.44_fiuzgy"

Live demo link: "https://job-tracker-sigma-flax.vercel.app"
