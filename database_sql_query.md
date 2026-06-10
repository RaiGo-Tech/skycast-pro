Bhai jo schema tune diya hai wo basic se advanced level tak kaafi achha hai, lekin agar SkyCast-Pro ko premium weather platform banana hai to aur bahut saara weather-related data store karna chahiye. Abhi tere schema me mainly users, favorites, alerts aur search history hai. Weather data khud bahut kam store ho raha hai. 


Main tujhe kuch additional tables de raha hu jo professional weather apps use karti hain:

1. CURRENT WEATHER DATA
CREATE TABLE public.current_weather (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT NOT NULL,
    country TEXT,

    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),

    temperature DECIMAL(5,2),
    feels_like DECIMAL(5,2),

    humidity INTEGER,
    pressure INTEGER,

    visibility INTEGER,
    uv_index DECIMAL(4,2),

    dew_point DECIMAL(5,2),

    wind_speed DECIMAL(6,2),
    wind_gust DECIMAL(6,2),
    wind_direction INTEGER,

    cloud_cover INTEGER,

    weather_main TEXT,
    weather_description TEXT,
    weather_icon TEXT,

    sunrise TIMESTAMPTZ,
    sunset TIMESTAMPTZ,

    fetched_at TIMESTAMPTZ DEFAULT now()
);
2. HOURLY FORECAST
CREATE TABLE public.hourly_forecast (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT NOT NULL,

    forecast_time TIMESTAMPTZ NOT NULL,

    temperature DECIMAL(5,2),
    feels_like DECIMAL(5,2),

    humidity INTEGER,

    precipitation_probability DECIMAL(5,2),

    rain_mm DECIMAL(6,2),
    snow_mm DECIMAL(6,2),

    wind_speed DECIMAL(6,2),

    weather_description TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);
3. 15-DAY FORECAST
CREATE TABLE public.daily_forecast (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT NOT NULL,

    forecast_date DATE NOT NULL,

    min_temp DECIMAL(5,2),
    max_temp DECIMAL(5,2),

    morning_temp DECIMAL(5,2),
    day_temp DECIMAL(5,2),
    evening_temp DECIMAL(5,2),
    night_temp DECIMAL(5,2),

    humidity INTEGER,

    rain_probability DECIMAL(5,2),

    wind_speed DECIMAL(6,2),

    uv_index DECIMAL(4,2),

    sunrise TIMESTAMPTZ,
    sunset TIMESTAMPTZ,

    weather_description TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);
4. AIR QUALITY INDEX (AQI)
CREATE TABLE public.air_quality (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT NOT NULL,

    aqi INTEGER,

    pm2_5 DECIMAL(8,2),
    pm10 DECIMAL(8,2),

    co DECIMAL(8,2),
    no2 DECIMAL(8,2),

    so2 DECIMAL(8,2),
    o3 DECIMAL(8,2),

    nh3 DECIMAL(8,2),

    recorded_at TIMESTAMPTZ DEFAULT now()
);
5. WEATHER STATIONS
CREATE TABLE public.weather_stations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    station_code TEXT UNIQUE,

    station_name TEXT,

    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),

    elevation DECIMAL(8,2),

    country TEXT,
    state TEXT,

    is_active BOOLEAN DEFAULT true
);
6. SEVERE WEATHER EVENTS
CREATE TABLE public.severe_weather_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT,

    event_type TEXT,

    severity TEXT,

    title TEXT,

    description TEXT,

    start_time TIMESTAMPTZ,

    end_time TIMESTAMPTZ,

    source TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);
Examples:

Thunderstorm

Cyclone

Tornado

Heatwave

Flood

Heavy Rain

Dust Storm

7. LIGHTNING TRACKING
CREATE TABLE public.lightning_strikes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    latitude DECIMAL(10,8),

    longitude DECIMAL(11,8),

    intensity DECIMAL(8,2),

    strike_time TIMESTAMPTZ
);
8. WEATHER MAP LAYERS
CREATE TABLE public.weather_map_layers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    layer_name TEXT,

    tile_url TEXT,

    provider TEXT,

    is_active BOOLEAN DEFAULT true,

    updated_at TIMESTAMPTZ DEFAULT now()
);
Store:

Radar

Clouds

Rain

Wind

Temperature

Pressure

AQI

9. ASTRONOMY DATA
CREATE TABLE public.astronomy_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT,

    moon_phase TEXT,

    moonrise TIMESTAMPTZ,

    moonset TIMESTAMPTZ,

    sunrise TIMESTAMPTZ,

    sunset TIMESTAMPTZ,

    date DATE
);
10. USER WEATHER REPORTS
CREATE TABLE public.user_weather_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    user_id UUID REFERENCES public.profiles(id),

    city_name TEXT,

    report_type TEXT,

    description TEXT,

    image_url TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);
Users report kar sakte hain:

Rain

Fog

Hail

Storm

Flood

11. GLOBAL CITIES DATABASE
CREATE TABLE public.cities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    city_name TEXT,

    state_name TEXT,

    country_name TEXT,

    country_code TEXT,

    latitude DECIMAL(10,8),

    longitude DECIMAL(11,8),

    population BIGINT,

    timezone TEXT
);
12. WEATHER NEWS
CREATE TABLE public.weather_news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    title TEXT,

    description TEXT,

    source TEXT,

    image_url TEXT,

    article_url TEXT,

    published_at TIMESTAMPTZ
);
Final Production Structure
SkyCast-Pro ke liye minimum tables:

profiles

favorite_cities

weather_search_history

weather_alerts

current_weather

hourly_forecast

daily_forecast

air_quality

astronomy_data

cities

weather_stations

severe_weather_events

user_weather_reports

weather_news

api_usage_logs

user_sessions

Ye structure kisi bhi professional weather platform jaise ,  ya  ke level ke project ka strong backend base provide karega.


or bhai sath me email rate exteed aa rha han registration ke time par ab ise bhi set kro 

Bhai agar "Email Rate Exceeded" registration ke time aa raha hai to problem SQL schema me nahi hai. Ye generally Supabase Auth ya SMTP email limits ki wajah se aata hai.

1. Development Mode me ho to Email Confirmation Band Kar Do
Supabase Dashboard → Authentication → Providers → Email

Disable Email Confirmations

Isse user signup hote hi login kar paayega.

2. OTP Cooldown Bada Do
Authentication → Rate Limits

Email OTP requests: 2-3 per minute
Email sends: 10 per hour
Agar testing me baar-baar signup kar rahe ho to limit hit ho jaati hai.

3. Temporary Signup Bypass
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: undefined
  }
});
4. Production SMTP Setup
Default Supabase email service ki jagah:

Resend

Brevo

Mailgun

Use karo.

Resend sabse easy hai.

5. Extra User Registration Table
Agar future me analytics aur anti-spam lagana hai to ye table add kar sakte ho:

CREATE TABLE public.registration_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    email TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,

    status TEXT DEFAULT 'pending',

    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_registration_logs_email
ON public.registration_logs(email);

CREATE INDEX idx_registration_logs_created
ON public.registration_logs(created_at DESC);
6. Anti-Spam Protection
CREATE TABLE public.blocked_ips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    ip_address TEXT UNIQUE,
    reason TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);
Sabse Important
Mujhe ye bata:

Tum Supabase Auth use kar rahe ho ya custom Node.js auth?

Exact error kya aa raha hai?

Email rate limit exceeded

For security purposes you can only request this after xx seconds

429 Too Many Requests

Agar exact error bhej de aur signup code bhi bhej de to main uska direct fix bata dunga.


-- ============================================================================
-- SKYCAST PRO - PRODUCTION SUPABASE SCHEMA
-- Professional database schema for weather forecast platform
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- PROFILES TABLE (Extended user profiles linked to Supabase Auth)
-- ============================================================================
CREATE TABLE public.profiles (
id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
email TEXT,
full_name TEXT,
avatar_url TEXT,
role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'premium')),
preferences JSONB DEFAULT '{
"units": "metric",
"theme": "dark",
"alerts": true,
"language": "en",
"notifications": true,
"defaultCity": null
}'::jsonb,
metadata JSONB DEFAULT '{}'::jsonb,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);

-- Add Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (
EXISTS (
SELECT 1 FROM public.profiles
WHERE id = auth.uid() AND role = 'admin'
)
);

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO public.profiles (id, email, full_name, avatar_url)
VALUES (
NEW.id,
NEW.email,
COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
NEW.raw_user_meta_data->>'avatar_url'
);
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = timezone('utc'::text, now());
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- FAVORITE CITIES TABLE
-- ============================================================================
CREATE TABLE public.favorite_cities (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
city_name TEXT NOT NULL,
country TEXT DEFAULT '',
latitude DECIMAL(10, 8),
longitude DECIMAL(11, 8),
timezone TEXT,
weather_summary JSONB DEFAULT '{}'::jsonb,
is_default BOOLEAN DEFAULT false,
display_order INTEGER DEFAULT 0,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
UNIQUE(user_id, city_name)
);

-- Create indexes
CREATE INDEX idx_favorite_cities_user_id ON public.favorite_cities(user_id);
CREATE INDEX idx_favorite_cities_city_name ON public.favorite_cities(city_name);
CREATE INDEX idx_favorite_cities_display_order ON public.favorite_cities(user_id, display_order);

-- RLS for favorite_cities
ALTER TABLE public.favorite_cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
ON public.favorite_cities FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
ON public.favorite_cities FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites"
ON public.favorite_cities FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
ON public.favorite_cities FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_favorite_cities_updated_at
BEFORE UPDATE ON public.favorite_cities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- WEATHER SEARCH HISTORY TABLE
-- ============================================================================
CREATE TABLE public.weather_search_history (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
searched_city TEXT NOT NULL,
country TEXT DEFAULT '',
source_query TEXT NOT NULL,
weather_summary JSONB DEFAULT '{}'::jsonb,
weather_payload JSONB DEFAULT '{}'::jsonb,
search_count INTEGER DEFAULT 1,
last_searched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_weather_search_history_user_id ON public.weather_search_history(user_id);
CREATE INDEX idx_weather_search_history_searched_city ON public.weather_search_history(searched_city);
CREATE INDEX idx_weather_search_history_last_searched ON public.weather_search_history(last_searched_at DESC);
CREATE INDEX idx_weather_search_history_user_searched ON public.weather_search_history(user_id, last_searched_at DESC);

-- RLS for weather_search_history
ALTER TABLE public.weather_search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own search history"
ON public.weather_search_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search history"
ON public.weather_search_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own search history"
ON public.weather_search_history FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own search history"
ON public.weather_search_history FOR DELETE
USING (auth.uid() = user_id);

-- Function to handle upsert of search history
CREATE OR REPLACE FUNCTION public.upsert_search_history()
RETURNS TRIGGER AS $$
BEGIN
-- Check if this city was already searched by this user
IF EXISTS (
SELECT 1 FROM public.weather_search_history
WHERE user_id = NEW.user_id
AND searched_city = NEW.searched_city
LIMIT 1
) THEN
-- Update existing record
UPDATE public.weather_search_history
SET
weather_summary = NEW.weather_summary,
weather_payload = NEW.weather_payload,
search_count = search_count + 1,
last_searched_at = NEW.last_searched_at
WHERE user_id = NEW.user_id AND searched_city = NEW.searched_city;
RETURN NULL;
ELSE
-- Insert new record
RETURN NEW;
END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER handle_search_history_upsert
BEFORE INSERT ON public.weather_search_history
FOR EACH ROW EXECUTE FUNCTION public.upsert_search_history();

-- ============================================================================
-- WEATHER ALERTS TABLE
-- ============================================================================
CREATE TABLE public.weather_alerts (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
city_name TEXT NOT NULL,
country TEXT DEFAULT '',
alert_type TEXT NOT NULL CHECK (alert_type IN ('temperature', 'precipitation', 'wind', 'air_quality', 'severe')),
condition JSONB NOT NULL,
is_active BOOLEAN DEFAULT true,
notification_sent BOOLEAN DEFAULT false,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_weather_alerts_user_id ON public.weather_alerts(user_id);
CREATE INDEX idx_weather_alerts_city_name ON public.weather_alerts(city_name);
CREATE INDEX idx_weather_alerts_is_active ON public.weather_alerts(is_active);
CREATE INDEX idx_weather_alerts_user_active ON public.weather_alerts(user_id, is_active);

-- RLS for weather_alerts
ALTER TABLE public.weather_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
ON public.weather_alerts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts"
ON public.weather_alerts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
ON public.weather_alerts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
ON public.weather_alerts FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_weather_alerts_updated_at
BEFORE UPDATE ON public.weather_alerts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- USER SESSIONS & ANALYTICS TABLE
-- ============================================================================
CREATE TABLE public.user_sessions (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
session_id TEXT,
device_info JSONB DEFAULT '{}'::jsonb,
location_info JSONB DEFAULT '{}'::jsonb,
page_views INTEGER DEFAULT 0,
last_activity TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_last_activity ON public.user_sessions(last_activity DESC);

-- RLS for user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
ON public.user_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
ON public.user_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- API USAGE LOGGING TABLE
-- ============================================================================
CREATE TABLE public.api_usage_logs (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
endpoint TEXT NOT NULL,
method TEXT NOT NULL,
status_code INTEGER,
response_time_ms INTEGER,
ip_address TEXT,
user_agent TEXT,
metadata JSONB DEFAULT '{}'::jsonb,
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_api_usage_logs_user_id ON public.api_usage_logs(user_id);
CREATE INDEX idx_api_usage_logs_endpoint ON public.api_usage_logs(endpoint);
CREATE INDEX idx_api_usage_logs_created_at ON public.api_usage_logs(created_at DESC);

-- RLS for api_usage_logs
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own API logs"
ON public.api_usage_logs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all API logs"
ON public.api_usage_logs FOR SELECT
USING (
EXISTS (
SELECT 1 FROM public.profiles
WHERE id = auth.uid() AND role = 'admin'
)
);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get user's favorite cities with weather
CREATE OR REPLACE FUNCTION public.get_user_favorites_with_weather(p_user_id UUID)
RETURNS TABLE (
id UUID,
city_name TEXT,
country TEXT,
latitude DECIMAL,
longitude DECIMAL,
weather_summary JSONB,
is_default BOOLEAN,
display_order INTEGER
) AS $$
BEGIN
RETURN QUERY
SELECT
fc.id,
fc.city_name,
fc.country,
fc.latitude,
fc.longitude,
fc.weather_summary,
fc.is_default,
fc.display_order
FROM public.favorite_cities fc
WHERE fc.user_id = p_user_id
ORDER BY fc.is_default DESC, fc.display_order ASC, fc.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's recent searches
CREATE OR REPLACE FUNCTION public.get_recent_searches(p_user_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
id UUID,
searched_city TEXT,
country TEXT,
weather_summary JSONB,
last_searched_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
RETURN QUERY
SELECT
wsh.id,
wsh.searched_city,
wsh.country,
wsh.weather_summary,
wsh.last_searched_at
FROM public.weather_search_history wsh
WHERE wsh.user_id = p_user_id
ORDER BY wsh.last_searched_at DESC
LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- INITIAL DATA (Optional - for development/testing)
-- ============================================================================

-- Create a function to insert sample data (commented out for production)
/*
CREATE OR REPLACE FUNCTION public.insert_sample_data()
RETURNS VOID AS $$
BEGIN
-- This function can be used to insert sample data for testing
-- Uncomment and modify as needed for development
END;
$$ LANGUAGE plpgsql;
*/

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant read access to anon users for public data
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'Extended user profiles linked to Supabase Auth';
COMMENT ON TABLE public.favorite_cities IS 'User favorite cities for quick weather access';
COMMENT ON TABLE public.weather_search_history IS 'User weather search history with upsert logic';
COMMENT ON TABLE public.weather_alerts IS 'Custom weather alerts set by users';
COMMENT ON TABLE public.user_sessions IS 'User session tracking for analytics';
COMMENT ON TABLE public.api_usage_logs IS 'API usage monitoring and analytics';


Close
