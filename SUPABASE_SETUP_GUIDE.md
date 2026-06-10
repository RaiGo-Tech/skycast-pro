# Supabase Setup Guide for SkyCast Pro

Complete guide for setting up Supabase as the backend for SkyCast Pro production deployment.

## Prerequisites

- Supabase account (free tier available at [supabase.com](https://supabase.com))
- Basic understanding of SQL and database concepts
- SkyCast Pro project cloned locally

## Step 1: Create Supabase Project

1. **Sign Up/Login**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign up with GitHub or email

2. **Create New Project**
   - Click "New Project"
   - Choose organization (or create new one)
   - Project name: `skycast-pro-production`
   - Database password: Generate strong password (save securely!)
   - Region: Choose closest to your target audience
   - Pricing plan: Free tier (sufficient for MVP)

3. **Wait for Initialization**
   - Project takes 2-3 minutes to initialize
   - You'll receive email when ready

## Step 2: Execute Database Schema

### Method 1: Using SQL Editor (Recommended)

1. Navigate to your project dashboard
2. Click "SQL Editor" in left sidebar
3. Click "New Query"
4. Copy entire content from `supabase/schema.sql`
5. Paste into SQL editor
6. Click "Run" (or press Ctrl+Enter)
7. Verify success message

### Method 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push schema
supabase db push
```

### Verify Schema Creation

After execution, verify tables were created:

1. Go to "Table Editor" in left sidebar
2. You should see these tables:
   - `profiles`
   - `favorite_cities`
   - `weather_search_history`
   - `weather_alerts`
   - `user_sessions`
   - `api_usage_logs`

## Step 3: Configure Authentication

### Enable Email Authentication

1. Go to "Authentication" → "Providers"
2. Ensure "Email" provider is enabled (default)
3. Click "Email" to configure:

**Email Settings:**
- Confirm email: Enable (recommended for production)
- Secure email change: Enable
- Double opt-in: Enable (prevents fake accounts)

### Configure Email Templates

1. Go to "Authentication" → "Email Templates"
2. Customize templates for professional appearance:

**Confirm Signup Template:**
```html
<h2>Welcome to SkyCast Pro!</h2>
<p>Please confirm your email address by clicking the button below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
<p>If you didn't create an account, please ignore this email.</p>
```

**Reset Password Template:**
```html
<h2>Reset Your Password</h2>
<p>Click the button below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>This link expires in 1 hour.</p>
```

### Enable OAuth Providers (Optional)

1. Go to "Authentication" → "Providers"
2. Enable desired providers:
   - Google
   - GitHub
   - Facebook
   - etc.

3. Configure each provider:
   - Get OAuth credentials from provider
   - Add callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
   - Save configuration

## Step 4: Configure Row Level Security (RLS)

The schema includes RLS policies. Verify they're working:

### Check RLS Status

```sql
-- Run in SQL Editor
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

### Test RLS Policies

```sql
-- Test that users can only access their own data
-- This should fail if RLS is working correctly
SELECT * FROM profiles;
```

If you see data, RLS might not be enabled. Re-run the schema.

## Step 5: Get API Credentials

### Frontend Credentials

1. Go to "Project Settings" → "API"
2. Copy these values:

**Project URL:**
```
https://your-project-ref.supabase.co
```

**anon/public Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend Credentials

**service_role Key** (Keep this secret!):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Never commit service_role key to public repositories!**

## Step 6: Configure Environment Variables

### Frontend (.env)

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Backend (.env)

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 7: Test Connection

### Test Frontend Connection

Create test file `test-supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
    
    if (error) throw error
    console.log('✅ Supabase connection successful!')
    console.log('Profiles count:', data[0].count)
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()
```

Run with: `node test-supabase.js`

### Test Authentication

```javascript
async function testAuth() {
  try {
    // Test signup
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'test123456',
      options: {
        data: { name: 'Test User', role: 'user' }
      }
    })
    
    if (error) throw error
    console.log('✅ Auth test successful!')
    console.log('User created:', data.user?.email)
  } catch (error) {
    console.error('❌ Auth test failed:', error.message)
  }
}

testAuth()
```

## Step 8: Configure Storage (Optional)

If you need file storage (avatars, etc.):

1. Go to "Storage" in left sidebar
2. Create new bucket: `avatars`
3. Configure bucket:
   - Public: No (for security)
   - File size limit: 2MB
   - Allowed MIME types: images/*

4. Add storage policies:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

-- Allow users to view their own avatars
CREATE POLICY "Users can view own avatars"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Step 9: Enable Database Functions

The schema includes helper functions. Verify they work:

```sql
-- Test get_user_favorites_with_weather
SELECT get_user_favorites_with_weather('user-uuid-here');

-- Test get_recent_searches
SELECT get_recent_searches('user-uuid-here', 10);
```

## Step 10: Set Up Backups

### Automatic Backups (Free Tier)

Supabase free tier includes:
- Daily backups (retained 7 days)
- Point-in-time recovery (7 days)

### Manual Backup

1. Go to "Database" → "Backups"
2. Click "Create backup"
3. Choose backup type
4. Download backup file

### Backup Schedule (Paid Tier)

For production, consider:
- Daily automated backups
- Weekly full backups
- Monthly archival backups

## Step 11: Monitoring & Analytics

### Enable Supabase Analytics

1. Go to "Project Settings" → "General"
2. Enable "Analytics"
3. Review dashboard regularly

### Custom Monitoring

```javascript
// Add to your application
supabase
  .from('api_usage_logs')
  .insert({
    endpoint: '/api/weather',
    method: 'GET',
    status_code: 200,
    response_time_ms: 150,
    user_id: user?.id
  })
```

## Step 12: Security Hardening

### Enable Additional Security

1. **IP Restriction** (if needed)
   - Go to "Database" → "Connection Pooling"
   - Add allowed IP addresses

2. **Rate Limiting**
   - Use Supabase Edge Functions
   - Implement custom rate limiting

3. **Audit Logs**
   - Enable audit logging in settings
   - Review regularly

## Troubleshooting

### Common Issues

**1. Connection Refused**
- Verify API URL and keys
- Check network connectivity
- Ensure project is active

**2. RLS Policy Errors**
- Verify policies are enabled
- Check user authentication
- Review policy logic

**3. Authentication Failures**
- Check email templates
- Verify email confirmation settings
- Review OAuth configuration

### Debug Mode

Enable debug mode in development:

```javascript
const supabase = createClient(url, key, {
  auth: {
    debug: true // Enable debug logs
  }
})
```

## Next Steps

After Supabase setup:

1. Update frontend environment variables
2. Test authentication flow
3. Deploy to production
4. Monitor performance
5. Set up alerts

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

For issues:
- Check Supabase status page
- Review community forums
- Contact Supabase support (paid plans)

---

**Last Updated:** June 2024  
**Version:** 1.0.0
