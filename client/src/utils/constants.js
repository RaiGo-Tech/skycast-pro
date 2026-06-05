export const APP_NAME = 'SkyCast Pro'

export const CITY_SUGGESTIONS = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Pune',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Jaipur',
  'Ahmedabad',
  'London',
  'New York',
  'Tokyo',
  'Dubai',
  'Singapore',
]

export const DEMO_WEATHER = {
  location: {
    city: 'Mumbai',
    country: 'IN',
    lat: 19.076,
    lon: 72.8777,
    localTime: new Date().toISOString(),
  },
  current: {
    temp: 32,
    feelsLike: 35,
    condition: 'Partly cloudy',
    icon: 'partly-cloudy',
    humidity: 72,
    windSpeed: 18,
    windDirection: 'SW',
    pressure: 1008,
    uvIndex: 4,
    visibility: 10,
    sunrise: '05:59',
    sunset: '19:12',
  },
  hourly: [
    { time: 'Now', temp: 32, humidity: 72, windSpeed: 18, rainProbability: 0, icon: 'partly-cloudy' },
    { time: '1 PM', temp: 33, humidity: 67, windSpeed: 20, rainProbability: 10, icon: 'sunny' },
    { time: '2 PM', temp: 34, humidity: 63, windSpeed: 22, rainProbability: 10, icon: 'sunny' },
    { time: '3 PM', temp: 32, humidity: 70, windSpeed: 19, rainProbability: 30, icon: 'rain' },
    { time: '4 PM', temp: 30, humidity: 76, windSpeed: 24, rainProbability: 60, icon: 'rain' },
    { time: '5 PM', temp: 29, humidity: 78, windSpeed: 21, rainProbability: 50, icon: 'cloudy' },
    { time: '6 PM', temp: 29, humidity: 80, windSpeed: 18, rainProbability: 35, icon: 'cloudy' },
    { time: '7 PM', temp: 28, humidity: 82, windSpeed: 16, rainProbability: 20, icon: 'cloudy' },
  ],
  daily: [
    { day: 'Today', date: 'Jun 1', max: 33, min: 27, condition: 'Partly cloudy', rainProbability: 10, icon: 'partly-cloudy' },
    { day: 'Tue', date: 'Jun 2', max: 34, min: 27, condition: 'Sunny', rainProbability: 12, icon: 'sunny' },
    { day: 'Wed', date: 'Jun 3', max: 32, min: 26, condition: 'Rain showers', rainProbability: 60, icon: 'rain' },
    { day: 'Thu', date: 'Jun 4', max: 31, min: 26, condition: 'Rain showers', rainProbability: 66, icon: 'rain' },
    { day: 'Fri', date: 'Jun 5', max: 31, min: 27, condition: 'Cloudy', rainProbability: 40, icon: 'cloudy' },
    { day: 'Sat', date: 'Jun 6', max: 32, min: 27, condition: 'Partly cloudy', rainProbability: 22, icon: 'partly-cloudy' },
    { day: 'Sun', date: 'Jun 7', max: 33, min: 28, condition: 'Sunny', rainProbability: 10, icon: 'sunny' },
  ],
  aqi: {
    index: 68,
    level: 'Moderate',
    value: 2,
    pm25: 22,
    pm10: 46,
    o3: 58,
    no2: 18,
    so2: 12,
    co: 0.4,
    recommendation: 'Air quality is acceptable. Sensitive people should reduce prolonged outdoor exertion.',
  },
  alerts: [
    {
      type: 'rain',
      title: 'Heavy Rain Alert',
      description: 'Heavy rain expected in isolated areas this evening.',
      severity: 'high',
      time: 'Today, 6:00 PM',
    },
    {
      type: 'heat',
      title: 'Heat Index Watch',
      description: 'Feels-like temperature may remain above 35 C during afternoon hours.',
      severity: 'medium',
      time: 'Today, 1:30 PM',
    },
    {
      type: 'storm',
      title: 'Thunderstorm Advisory',
      description: 'Short thunderstorm cells are possible near coastal suburbs.',
      severity: 'low',
      time: 'Tonight',
    },
  ],
  analytics: {
    weeklyRainfall: 48,
    averageTemperature: 30.2,
    maxWind: 31,
    comfort: 82,
  },
}

export const DEFAULT_FAVORITES = [
  { cityName: 'Mumbai', country: 'IN', temp: 32, icon: 'partly-cloudy' },
  { cityName: 'Delhi', country: 'IN', temp: 38, icon: 'sunny' },
  { cityName: 'Bengaluru', country: 'IN', temp: 28, icon: 'rain' },
  { cityName: 'Pune', country: 'IN', temp: 30, icon: 'cloudy' },
]

export const THEME_KEY = 'skycast-theme'
export const TOKEN_KEY = 'skycast-token'
export const USER_KEY = 'skycast-user'
export const RECENT_SEARCHES_KEY = 'skycast-recent-searches'
