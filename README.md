# SkyCast Pro

**Professional Weather Forecast Platform** - Production-ready MERN stack application with Supabase backend integration, advanced SEO, and responsive design.

## 🚀 Features

### Core Functionality
- **Real-time Weather Data**: Accurate forecasts from multiple weather APIs
- **User Authentication**: Secure Supabase authentication with OAuth support
- **Personalized Experience**: Save favorite cities, search history, and preferences
- **Advanced Analytics**: Air quality index, weather alerts, and detailed forecasts
- **Responsive Design**: Professional UI optimized for all devices (mobile, tablet, desktop)
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Performance Optimized**: Lazy loading, caching, and image optimization

### Technical Highlights
- **Supabase Backend**: PostgreSQL database with Row Level Security (RLS)
- **Modern Frontend**: React 19 + Vite + TailwindCSS + Framer Motion
- **Professional UI/UX**: Glass morphism design, smooth animations, accessibility
- **Production Ready**: Error handling, loading states, monitoring, and logging
- **Security**: JWT authentication, rate limiting, input validation, CORS
- **PWA Support**: Progressive Web App with offline capabilities

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- Weather API key (WeatherAPI.com or OpenWeatherMap)

## 🛠️ Quick Start

### 1. Clone and Install

```bash
git clone your-repo-url
cd skycast-pro
npm run install:all
```

### 2. Environment Setup

```bash
# Copy environment templates
copy client\.env.example client\.env
copy server\.env.example server\.env
```

### 3. Configure Supabase

Follow the detailed guide in `SUPABASE_SETUP_GUIDE.md`:
- Create Supabase project
- Execute SQL schema from `supabase/schema.sql`
- Configure authentication
- Get API credentials

### 4. Update Environment Variables

**client/.env:**
```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_WEATHER_API_KEY=your-weather-api-key
```

**server/.env:**
```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
WEATHER_API_KEY=your-weather-api-key
```

### 5. Run Development Servers

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

Access:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

## Build Commands

```bash
npm run build
npm run build:vite
npm run vercel-build
npm run preview
```

For direct Vercel import from the repository root, `vercel.json` is already configured to install `client`, build Vite, serve `client/dist`, and support React Router refreshes.

## Demo Login

When MongoDB is not configured, the API includes a demo admin user:

- Email: `demo@skycast.dev`
- Password: `demo123`

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Weather

- `GET /api/weather/current?city=Mumbai`
- `GET /api/weather/hourly?city=Mumbai`
- `GET /api/weather/weekly?city=Mumbai`
- `GET /api/weather/air-quality?city=Mumbai`
- `GET /api/weather/alerts?city=Mumbai`
- `GET /api/weather/suggestions?q=Mu`

### User

- `GET /api/user/profile`
- `PATCH /api/user/profile`
- `GET /api/user/favorites`
- `POST /api/user/favorites`
- `DELETE /api/user/favorites/:cityName`
- `GET /api/user/history`
- `PATCH /api/user/settings`

### Admin

- `GET /api/admin/users`
- `GET /api/admin/stats`
- `GET /api/admin/reports`

## Project Structure

```text
client/
  src/components
  src/context
  src/hooks
  src/pages
  src/routes
  src/services
  src/utils
server/
  src/config
  src/controllers
  src/middleware
  src/models
  src/routes
  src/services
  src/utils
docs/
```

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deployment

### Recommended: Vercel + Supabase

1. **Deploy Frontend to Vercel**
   ```bash
   cd client
   vercel --prod
   ```

2. **Deploy Backend to Vercel/Railway**
   ```bash
   cd server
   vercel --prod
   ```

3. **Configure Environment Variables** in Vercel dashboard

For detailed deployment instructions, see `PRODUCTION_DEPLOYMENT_GUIDE.md`.

## 📁 Project Structure

```text
skycast-pro/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── SEO/          # SEO components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── weather/      # Weather components
│   │   │   └── common/       # Common components
│   │   ├── context/          # React context
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services (Supabase)
│   │   ├── styles/           # CSS modules
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   └── package.json
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/           # Configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Data models (legacy)
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Utility functions
│   └── package.json
├── supabase/                 # Supabase configuration
│   └── schema.sql            # Database schema
├── docs/                     # Documentation
├── PRODUCTION_DEPLOYMENT_GUIDE.md
├── SUPABASE_SETUP_GUIDE.md
└── README.md
```

## 🔌 API Endpoints

### Authentication (Supabase)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/reset-password` - Confirm password reset

### Weather
- `GET /api/weather/current?city=Mumbai` - Current weather
- `GET /api/weather/hourly?city=Mumbai` - Hourly forecast
- `GET /api/weather/weekly?city=Mumbai` - 7-day forecast
- `GET /api/weather/air-quality?city=Mumbai` - Air quality index
- `GET /api/weather/alerts?city=Mumbai` - Weather alerts

### User Data (Supabase)
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile
- `GET /api/user/favorites` - Get favorite cities
- `POST /api/user/favorites` - Add favorite
- `DELETE /api/user/favorites/:cityName` - Remove favorite
- `GET /api/user/history` - Search history

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/reports` - System reports

## 🎨 UI/UX Features

### Design System
- **Glass Morphism**: Modern glass-like UI elements
- **Dark/Light Mode**: Theme persistence
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Smooth Animations**: Framer Motion transitions
- **Accessibility**: WCAG AA compliant, keyboard navigation

### Components
- **Search Bar**: Smart city search with suggestions
- **Weather Cards**: Detailed weather information
- **Charts**: Interactive weather data visualization
- **Maps**: Integrated weather maps
- **Alerts**: Custom weather notifications
- **Dashboard**: Personalized user dashboard

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Sanitized user inputs
- **CORS Configuration**: Cross-origin security
- **Environment Variables**: Sensitive data protection
- **HTTPS Only**: Encrypted connections

## 📊 Performance Optimizations

- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: WebP format, lazy loading
- **Caching Strategy**: API response caching
- **Bundle Optimization**: Tree shaking, minification
- **CDN Integration**: Global content delivery
- **Service Worker**: Offline capabilities

## 🔍 SEO Features

- **Meta Tags**: Comprehensive Open Graph and Twitter cards
- **Structured Data**: Schema.org markup
- **Sitemap**: Dynamic XML sitemap
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Duplicate content prevention
- **Performance**: Core Web Vitals optimization

## 📈 Monitoring & Analytics

- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Behavior insights
- **API Monitoring**: Request/response tracking
- **Database Analytics**: Query performance

## 🆘 Support

- **Documentation**: Check `docs/` directory
- **Deployment Guide**: `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Supabase Setup**: `SUPABASE_SETUP_GUIDE.md`
- **Issues**: GitHub Issues

---

**Version**: 2.0.0 (Professional Edition)  
**Last Updated**: June 2024  
**Status**: Production Ready ✅
