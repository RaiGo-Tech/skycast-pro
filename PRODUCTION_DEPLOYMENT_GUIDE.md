# SkyCast Pro - Production Deployment Guide

Professional deployment guide for transforming SkyCast Pro from development to production environment.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Supabase Setup](#supabase-setup)
- [Environment Configuration](#environment-configuration)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Performance Optimization](#performance-optimization)
- [Security Best Practices](#security-best-practices)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts & Services
- **Supabase Account** (Free tier available)
- **Vercel Account** (for frontend hosting)
- **Weather API Key** (WeatherAPI.com or OpenWeatherMap)
- **Domain Name** (optional but recommended)

### Development Tools
- Node.js 18+ 
- Git
- npm or yarn

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose a region closest to your target audience
4. Set a strong database password
5. Wait for project initialization (2-3 minutes)

### 2. Execute SQL Schema

1. Navigate to your Supabase project dashboard
2. Go to **SQL Editor** → **New Query**
3. Copy the entire content from `supabase/schema.sql`
4. Execute the SQL script
5. Verify all tables were created successfully

### 3. Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (default)
3. Optionally enable OAuth providers (Google, GitHub, etc.)
4. Configure email templates in **Authentication** → **Email Templates**
5. Set up custom email domain (optional, for professional appearance)

### 4. Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **anon/public** key (for `VITE_SUPABASE_ANON_KEY`)
   - **service_role** key (for server-side operations - keep secret!)

### 5. Configure Row Level Security (RLS)

The schema includes RLS policies. Verify:
- All tables have RLS enabled
- Policies allow users to access their own data only
- Admin policies are properly configured

## Environment Configuration

### Frontend Environment Variables

Create `client/.env.production`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key

# API Configuration (if using backend)
VITE_API_URL=https://your-backend-domain.com/api

# Weather API (choose one)
VITE_WEATHER_API_KEY=your-weatherapi-com-key
# OR
VITE_OPENWEATHER_API_KEY=your-openweathermap-api-key
```

### Backend Environment Variables

Create `server/.env.production`:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com

# Supabase (for server-side operations)
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Weather API Keys
WEATHER_API_KEY=your-weatherapi-com-key
OPENWEATHER_API_KEY=your-openweathermap-api-key

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy Frontend**
```bash
cd client
vercel --prod
```

4. **Configure Environment Variables**
   - Go to Vercel dashboard → Project → Settings → Environment Variables
   - Add all frontend environment variables
   - Redeploy after adding variables

5. **Configure Custom Domain** (Optional)
   - Go to Project → Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

### Option 2: Netlify

1. **Build the project**
```bash
cd client
npm run build
```

2. **Deploy to Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: Docker Deployment

1. **Create Dockerfile** (if not exists)
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Build and run**
```bash
docker build -t skycast-pro-frontend .
docker run -p 80:80 skycast-pro-frontend
```

## Backend Deployment

### Option 1: Vercel (Serverless)

1. **Configure vercel.json** (already exists in project)
2. **Deploy backend**
```bash
cd server
vercel --prod
```

### Option 2: Railway/Render

1. **Push code to GitHub**
2. **Connect Railway/Render to your repository**
3. **Configure environment variables**
4. **Deploy**

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

2. **Deploy Application**
```bash
# Clone repository
git clone your-repo-url
cd skycast-pro/server

# Install dependencies
npm ci --production

# Start with PM2
pm2 start src/server.js --name skycast-pro-backend
pm2 save
pm2 startup
```

3. **Configure Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3000; # Frontend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Performance Optimization

### Frontend Optimization

1. **Enable Build Optimizations**
```bash
# In client/vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'recharts'],
        }
      }
    }
  }
})
```

2. **Enable Compression**
```bash
# Add to vercel.json or server config
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

3. **Optimize Images**
- Use WebP format
- Implement lazy loading
- Use responsive images with `srcset`

### Backend Optimization

1. **Enable Response Compression**
```javascript
// In server/src/app.js
const compression = require('compression')
app.use(compression())
```

2. **Implement Caching**
```javascript
// Use Redis for production caching
const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)
```

3. **Database Connection Pooling**
```javascript
// Configure Supabase connection pool
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(url, key, {
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-client-info': 'skycast-pro' },
  },
})
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different keys for development and production
- Rotate secrets regularly
- Use strong, random secrets

### 2. API Security
- Enable rate limiting
- Implement CORS properly
- Validate all inputs
- Use HTTPS only

### 3. Authentication
- Enable 2FA for admin accounts
- Implement session timeout
- Use secure cookies
- Regular security audits

### 4. Database Security
- Use Row Level Security (RLS)
- Limit service role key usage
- Regular backups
- Monitor query performance

## Monitoring & Analytics

### 1. Error Tracking
```javascript
// Integrate Sentry
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

### 2. Performance Monitoring
```javascript
// Use Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### 3. Analytics
- Google Analytics 4
- Supabase Analytics (built-in)
- Custom event tracking

## Troubleshooting

### Common Issues

**1. Supabase Connection Errors**
- Verify API credentials
- Check RLS policies
- Ensure CORS is configured

**2. Build Failures**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify environment variables

**3. Performance Issues**
- Enable caching
- Optimize database queries
- Use CDN for static assets

**4. Authentication Problems**
- Check email templates
- Verify JWT configuration
- Review RLS policies

### Health Checks

```bash
# Frontend health check
curl https://your-domain.com/

# Backend health check
curl https://your-domain.com/api/health

# Database connection check
# Use Supabase dashboard or SQL editor
```

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] Database migrations run
- [ ] RLS policies verified
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Backup schedule set
- [ ] Monitoring alerts configured
- [ ] Performance tests passed
- [ ] Security audit completed
- [ ] Documentation updated

## Support & Maintenance

### Regular Maintenance Tasks
- Weekly: Review error logs
- Monthly: Update dependencies
- Quarterly: Security audit
- Annually: Review architecture

### Scaling Considerations
- Implement CDN for global distribution
- Add load balancing for high traffic
- Consider database read replicas
- Implement caching layers

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)

---

**Last Updated:** June 2024  
**Version:** 1.0.0  
**Maintained by:** SkyCast Pro Team
