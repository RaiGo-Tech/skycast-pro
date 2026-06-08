# SkyCast Pro Website Prototype

## 1. Project Overview

SkyCast Pro is a premium MERN weather forecast platform designed for college project demos, portfolio presentations, and practical weather planning. The website combines a glassmorphism dashboard UI with live or demo weather data, city search, forecasts, AQI, alerts, maps, charts, authentication, and a profile dashboard.

## 2. Product Goal

The goal of SkyCast Pro is to give users a modern weather dashboard where they can:

- Search weather by city, country, or ZIP code.
- View current weather, hourly forecast, and 7-day forecast.
- Check air quality, UV index, wind, sunrise/sunset, and weather alerts.
- Save favorite cities.
- Track recent searches.
- Login/register for a personalized dashboard.
- Use a responsive interface on desktop, tablet, and mobile.

## 3. Target Users

- Students presenting a MERN stack project.
- Users who want quick city weather updates.
- Portfolio reviewers checking full-stack project quality.
- Teachers or evaluators reviewing API, authentication, UI, and database integration.

## 4. Brand Direction

Brand name: `SkyCast Pro`

Visual style:

- Premium glass dashboard
- Dark weather background
- Cyan and sky-blue highlights
- Soft purple/blue atmospheric gradients
- Rounded but compact UI panels
- Smooth Framer Motion animations
- Responsive dashboard layout

Tone:

- Modern
- Professional
- Clean
- Practical
- Presentation-ready

## 5. Sitemap

```text
SkyCast Pro
├── /                  Overview / Home
├── /weather           Forecast Dashboard
├── /dashboard         Protected Profile Dashboard
├── /about             About Project
├── /contact           Contact
├── /terms             Terms
├── /login             Login
├── /register          Create Account
└── /*                 404 Not Found
```

## 6. Navigation Prototype

Desktop navigation:

```text
┌────────────────────┐
│ SkyCast Pro        │
│                    │
│ Overview           │
│ Forecast           │
│ Dashboard          │
│ About              │
│                    │
│ Favorites          │
│ Mumbai      32°    │
│ Delhi       38°    │
│ Bengaluru   28°    │
│ Pune        30°    │
│                    │
│ Theme  Settings    │
│ Login / Logout     │
└────────────────────┘
```

Mobile navigation:

```text
┌──────────────────────────────┐
│ SkyCast Pro        Theme Menu│
└──────────────────────────────┘

Menu opens as a slide-in drawer:

┌────────────────────┐
│ SkyCast Pro        │
│ Overview           │
│ Forecast           │
│ Dashboard          │
│ About              │
│ Favorites          │
│ Login / Logout     │
└────────────────────┘
```

## 7. Page Prototype: Home / Overview

Route: `/`

Purpose:

The Home page introduces SkyCast Pro and gives users a quick way to search weather or open the full forecast dashboard.

Main sections:

1. Hero introduction
2. Search and preview card
3. Live weather preview panel
4. Feature cards
5. Footer CTA

Desktop wireframe:

```text
┌─────────────┬───────────────────────────────────────────────────────────────┐
│ Sidebar     │ Hero intro                          Weather preview          │
│             │ SkyCast Pro                         Today in Mumbai          │
│             │ Precision forecasts...              Temperature / Condition  │
│             │ [Try dashboard] [See how it works]  What you get             │
│             │ Search & preview instantly          Feature rows             │
│             │ [ Search city input              ]  [Open Forecast Dashboard]│
│             │                                                               │
│             │ Feature cards: Search | Forecast | AQI | Premium UX          │
│             │ Footer CTA: Login / Create account                           │
└─────────────┴───────────────────────────────────────────────────────────────┘
```

Mobile wireframe:

```text
┌──────────────────────────────┐
│ Mobile header                │
├──────────────────────────────┤
│ SkyCast Pro                  │
│ Precision forecasts...       │
│ [Try dashboard]              │
│ [See how it works]           │
│ Search card                  │
│ Weather preview card         │
│ What you get                 │
│ Feature cards stacked        │
│ Footer CTA                   │
└──────────────────────────────┘
```

Home interactions:

- Clicking `Try dashboard` navigates to `/weather`.
- Clicking `See how it works` navigates to `/about`.
- SearchBar accepts city input and updates weather context.
- `Open Forecast Dashboard` navigates to `/weather`.
- Feature cards animate on scroll and hover.

## 8. Page Prototype: Weather Forecast Dashboard

Route: `/weather`

Purpose:

The Forecast page is the main dashboard for weather data.

Main sections:

1. Weather toolbar
2. SearchBar
3. Save favorite button
4. AI weather assistant toggle
5. Current weather card
6. Hourly forecast
7. AQI card
8. Weather alerts
9. 7-day forecast
10. Weather map
11. Wind, sunrise/sunset, UV index
12. Analytics charts
13. Weather metric cards

Desktop wireframe:

```text
┌─────────────┬───────────────────────────────────────────────────────────────┐
│ Sidebar     │ Toolbar: SkyCast Pro | Search | Save | Assistant             │
│             ├───────────────────────┬───────────────────────┬──────────────┤
│             │ Current Weather       │ Hourly Forecast       │ AQI + Alerts │
│             │ City, temp, metrics   │ Scrollable hour cards │ Air quality  │
│             ├───────────────────────┼───────────────────────┼──────────────┤
│             │ 7-Day Forecast        │ Weather Map           │ Wind/UV/Sun  │
│             ├───────────────────────┴───────────────────────┴──────────────┤
│             │ Charts: Humidity | Wind Speed | Rain Probability             │
│             ├───────────────────────────────────────────────────────────────┤
│             │ Metric Cards: Rainfall | Avg Temp | Max Wind | Comfort Score │
└─────────────┴───────────────────────────────────────────────────────────────┘
```

Tablet/mobile wireframe:

```text
┌──────────────────────────────┐
│ Mobile header                │
├──────────────────────────────┤
│ SearchBar                    │
│ SkyCast Pro                  │
│ [Save] [Assistant]           │
│ AI Assistant panel optional  │
│ Current Weather              │
│ Hourly Forecast              │
│ AQI                          │
│ Alerts                       │
│ 7-Day Forecast               │
│ Weather Map                  │
│ Wind                         │
│ Sunrise/Sunset               │
│ UV Index                     │
│ Charts                       │
│ Metric cards                 │
└──────────────────────────────┘
```

Weather interactions:

- Search city updates dashboard weather data.
- Save button stores selected city as favorite.
- Assistant button toggles a recommendation card.
- Hourly forecast scrolls horizontally.
- Map shows city marker.
- Charts respond to weather data.

## 9. Page Prototype: Profile Dashboard

Route: `/dashboard`

Access:

Protected route. User must be logged in.

Purpose:

The dashboard shows user profile information, saved cities, search history, and preferences.

Sections:

1. Dashboard header
2. Profile card
3. Favorite cities
4. Search history
5. Weather preferences

Wireframe:

```text
┌─────────────┬────────────────────────────────────────┐
│ Sidebar     │ Profile Dashboard                      │
│             │ Track favorite cities and preferences. │
│             ├──────────────────┬─────────────────────┤
│             │ User Profile     │ Favorite Cities     │
│             ├──────────────────┼─────────────────────┤
│             │ Search History   │ Weather Preferences │
└─────────────┴────────────────────────────────────────┘
```

Dashboard interactions:

- Favorite city click loads that city's weather.
- Remove favorite deletes saved city.
- Search history buttons reload previous searches.
- Preference toggles show local settings state.

## 10. Page Prototype: Login

Route: `/login`

Purpose:

Allows users to login and access the protected dashboard.

Wireframe:

```text
┌──────────────────────────────┐
│ Back to SkyCast Pro          │
│ Login                        │
│ Use demo account...          │
│ Email input                  │
│ Password input               │
│ [Login]                      │
│ Forgot password              │
└──────────────────────────────┘
```

Demo login:

```text
Email: demo@skycast.dev
Password: demo123
```

## 11. Page Prototype: Register

Route: `/register`

Purpose:

Allows new users to create an account.

Wireframe:

```text
┌──────────────────────────────┐
│ Back to SkyCast Pro          │
│ Create Account               │
│ Save favorite cities...      │
│ Name input                   │
│ Email input                  │
│ Password input               │
│ [Create account]             │
└──────────────────────────────┘
```

## 12. Page Prototype: About

Route: `/about`

Purpose:

Explains the project, technology stack, and college presentation value.

Sections:

- About SkyCast Pro
- React + Vite frontend
- Express + MongoDB backend
- Live weather API ready

Wireframe:

```text
┌────────────────────────────────────┐
│ About SkyCast Pro                  │
│ Project description                │
├────────────┬────────────┬──────────┤
│ React      │ Express    │ Weather  │
│ Frontend   │ Backend    │ API      │
└────────────┴────────────┴──────────┘
```

## 13. Page Prototype: Contact

Route: `/contact`

Purpose:

Shows project contact and repository information.

Wireframe:

```text
┌──────────────────────────────┐
│ Contact                      │
├──────────────┬───────────────┤
│ Project Team │ Repository    │
└──────────────┴───────────────┘
```

## 14. Page Prototype: Terms

Route: `/terms`

Purpose:

Explains educational usage and demo data behavior.

Wireframe:

```text
┌──────────────────────────────┐
│ Terms                        │
│ Educational use notice       │
│ API/demo data note           │
└──────────────────────────────┘
```

## 15. Page Prototype: 404

Route: `/*`

Purpose:

Shows a friendly fallback when users open an unknown route.

Wireframe:

```text
┌──────────────────────────────┐
│ 404                          │
│ This forecast route drifted  │
│ off the map.                 │
│ [Back to dashboard]          │
└──────────────────────────────┘
```

## 16. Core Components

### BrandLogo

Displays the SkyCast Pro identity with icon and text.

### Navbar

Responsive navigation system with:

- Main route links
- Favorite cities
- Theme toggle
- Settings shortcut
- Login/logout action
- Mobile drawer menu

### SearchBar

Weather search input with:

- City/country/ZIP input
- Suggestions
- Recent searches
- Clear button
- Voice search button
- Geolocation button

### Card

Reusable animated glass panel used across the site.

### Button

Reusable motion button with variants:

- Primary
- Secondary
- Ghost
- Danger
- Success
- Warning
- Outline

### Weather Components

- CurrentWeather
- HourlyForecast
- WeeklyForecast
- AQICard
- WeatherAlerts
- WeatherMap
- WindStatus
- SunriseSunset
- UVIndex
- WeatherCard

### Dashboard Components

- UserDashboard
- FavoriteCities
- SearchHistory
- SettingsPanel

## 17. Data Prototype

### Current Weather Object

```json
{
  "location": {
    "city": "Mumbai",
    "country": "IN",
    "lat": 19.076,
    "lon": 72.8777,
    "localTime": "2026-06-08T10:19:00"
  },
  "current": {
    "temp": 32,
    "feelsLike": 35,
    "condition": "Partly cloudy",
    "humidity": 72,
    "windSpeed": 18,
    "pressure": 1008,
    "visibility": 10,
    "uvIndex": 4
  }
}
```

### Favorite City Object

```json
{
  "cityName": "Mumbai",
  "country": "IN",
  "temp": 32,
  "icon": "partly-cloudy"
}
```

### User Object

```json
{
  "name": "SkyCast Student",
  "email": "demo@skycast.dev",
  "role": "student"
}
```

## 18. API Prototype

### Auth API

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Weather API

```text
GET /api/weather/current?city=Mumbai
GET /api/weather/hourly?city=Mumbai
GET /api/weather/weekly?city=Mumbai
GET /api/weather/air-quality?city=Mumbai
GET /api/weather/alerts?city=Mumbai
GET /api/weather/suggestions?q=Mu
```

### User API

```text
GET    /api/user/profile
PATCH  /api/user/profile
GET    /api/user/favorites
POST   /api/user/favorites
DELETE /api/user/favorites/:cityName
GET    /api/user/history
PATCH  /api/user/settings
```

### Admin API

```text
GET /api/admin/users
GET /api/admin/stats
GET /api/admin/reports
```

## 19. User Flow Prototype

### Flow 1: Search Weather

```text
Home or Weather page
→ User enters city
→ Suggestions appear
→ User selects/submits city
→ Weather context loads data
→ Current, hourly, weekly, AQI, alerts, and charts update
```

### Flow 2: Save Favorite City

```text
Weather page
→ User searches city
→ User clicks Save
→ City is added to favorites
→ Favorite appears in sidebar/dashboard
```

### Flow 3: Login and Dashboard

```text
Login page
→ User enters credentials
→ API validates user
→ Token/session is stored
→ User opens protected dashboard
→ Profile, favorites, history, and settings appear
```

### Flow 4: Mobile Navigation

```text
Mobile header
→ User taps menu button
→ Drawer opens
→ User selects route
→ Drawer closes
→ Selected page loads with transition animation
```

## 20. Responsive Prototype

Desktop:

- Sidebar is visible from `1280px+`.
- Main content uses available width.
- Dashboard grids show multiple columns.
- Weather cards and charts align in wide rows.

Tablet:

- Sidebar switches to mobile header/drawer.
- Content becomes full width.
- Cards reduce to 1 or 2 columns.
- Search toolbar stacks cleanly.

Mobile:

- Header stays compact.
- Drawer navigation opens from left.
- Cards stack vertically.
- Hourly forecast scrolls horizontally.
- Buttons become touch-friendly.
- No horizontal page overflow.

## 21. Animation Prototype

Motion behavior:

- Page transitions fade and slide smoothly.
- Cards reveal on scroll.
- Sidebar slides in on mobile.
- Weather icons float subtly.
- Hero preview floats softly.
- Buttons lift/press on hover/tap.
- Background light layers drift slowly.

Accessibility:

- Animations respect `prefers-reduced-motion`.
- Reduced-motion users get minimal transitions.

## 22. Theme Prototype

Current theme direction:

- Dark glass UI
- Cyan primary action
- Blue/purple ambient gradients
- White text with muted secondary copy
- Weather imagery background

Theme behavior:

- Theme toggle changes visual mode.
- Preference is saved locally.

## 23. Validation Prototype

Frontend validation:

- City search must be at least 2 characters.
- Login/register fields require valid input.
- Search suggestions filter by typed value.

Backend validation:

- Auth routes validate email/password.
- Weather query validates city input.
- Protected routes require authentication.

## 24. Error and Fallback Prototype

Weather API fallback:

- If live API is unavailable, demo data is shown.
- Toast message informs user that demo data is being used.

Auth fallback:

- Demo admin user works when MongoDB is not configured.

UI fallback:

- Loader appears while data is loading.
- ErrorBoundary catches unexpected UI errors.
- 404 page handles unknown routes.

## 25. Prototype Success Criteria

The prototype is complete when:

- Home page clearly introduces the product.
- Weather dashboard works as the primary experience.
- Search updates weather data.
- Favorite cities and recent searches are visible.
- Login/register/dashboard flow is present.
- UI is responsive on desktop, tablet, and mobile.
- Animations are smooth but accessible.
- App can run with live APIs or demo fallback data.
- Project can be explained clearly in a college presentation.

## 26. Presentation Script

Short demo script:

```text
SkyCast Pro is a MERN stack weather forecast platform.
It has a React + Vite frontend and an Express + MongoDB backend.
Users can search weather by city, view current weather, hourly forecast, 7-day forecast, AQI, alerts, maps, and charts.
The app also supports authentication, favorite cities, recent search history, and a protected profile dashboard.
For deployment, the frontend can run on Vercel and the backend can run on Render or Railway.
If MongoDB or weather API keys are not configured, the app still works in demo mode for presentations.
```

## 27. Future Enhancements

- Real notification alerts for storms/rain.
- Admin analytics dashboard.
- City comparison mode.
- Weather map layers for rain, wind, and clouds.
- More detailed hourly charts.
- Saved user preferences synced to MongoDB.
- Multi-language support.
- Email alerts for favorite cities.
