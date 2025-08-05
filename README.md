# Countdown App

A modern countdown timer application with user registration functionality, built with Vite and Supabase.

## Features

- ⏰ Interactive countdown timer with customizable target date/time
- 📝 User registration system to store interested users
- 💾 Database storage for registrations using Supabase
- 🎨 Modern, responsive design with dark/light mode support
- ⚡ Fast development with Vite

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`
3. Fill in your Supabase project URL and anon key in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database migration in your Supabase SQL editor:
   - Copy the contents of `supabase/migrations/001_create_registrations_table.sql`
   - Paste and execute in your Supabase project's SQL editor

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Build for Production

```bash
npm run build
```

## Database Schema

The app uses a single `registrations` table with the following structure:

- `id`: UUID primary key
- `name`: User's name (VARCHAR 255)
- `email`: User's email (VARCHAR 255)
- `created_at`: Registration timestamp
- `updated_at`: Last update timestamp

## Security

The app includes Row Level Security (RLS) policies that allow:
- Public read access to registrations
- Public insert access for new registrations

Adjust these policies in your Supabase dashboard based on your security requirements.

## Demo Mode

If Supabase is not configured, the app will run in demo mode with mock data to showcase the functionality.

## Technologies Used

- **Vite**: Fast build tool and development server
- **Supabase**: Backend as a Service for database and authentication
- **Vanilla JavaScript**: No framework dependencies for lightweight performance
- **CSS3**: Modern styling with CSS custom properties and responsive design