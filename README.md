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
- **Database**: Supabase (PostgreSQL) for cloud storage
- **Styling**: CSS with modern features
- **Build Tool**: Vite

## Database Setup

### Supabase Configuration

1. Create a new project on [Supabase](https://supabase.com/)
2. Copy your project URL and anon key
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Database Schema

Create the following table in your Supabase database:

```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public access for this demo
CREATE POLICY "Allow public access" ON registrations
FOR ALL USING (true);
```

### Registrations Table
- `id`: Auto-incrementing primary key
- `name`: User's name (string)
- `email`: User's email (string)
- `timestamp`: Registration timestamp (timestamptz)
