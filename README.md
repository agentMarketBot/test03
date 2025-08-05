# Countdown App

A countdown timer application with user registration functionality that stores registrations in a local database.

## Features

- Real-time countdown timer to a target date (December 31, 2025)
- User registration form with name and email
- Local database storage using Dexie (IndexedDB wrapper)
- Display of recent registrations
- Responsive design with dark/light theme support

## Setup and Development

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```
This will start the development server on http://localhost:3000

### Build
Create a production build:
```bash
npm run build
```

### Preview
Preview the production build:
```bash
npm run preview
```

## Technology Stack

- **Frontend**: Vanilla JavaScript with Vite
- **Database**: Dexie (IndexedDB wrapper) for client-side storage
- **Styling**: CSS with modern features
- **Build Tool**: Vite

## Database Schema

The app uses a local IndexedDB database with the following structure:

### Registrations Table
- `id`: Auto-incrementing primary key
- `name`: User's name (string)
- `email`: User's email (string)
- `timestamp`: Registration timestamp (ISO string)
