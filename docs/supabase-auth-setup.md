# Supabase Auth Setup

1. Add these values to `client/.env` and to your production hosting env:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

2. In Supabase Dashboard, open Authentication > URL Configuration.

3. Add these redirect URLs:

```text
http://localhost:5173/dashboard
https://your-production-domain.com/dashboard
```

4. In Authentication > Providers, enable the providers used by SkyCast Pro:

```text
Email
Google
Facebook
Twitter / X
LinkedIn OIDC
```

5. Run `docs/supabase-schema.sql` in the Supabase SQL editor to enable user-specific weather history.
