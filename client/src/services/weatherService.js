import api from './api'

export const weatherService = {
  current: (params) => api.get('/weather/current', { params }),
  hourly: (params) => api.get('/weather/hourly', { params }),
  weekly: (params) => api.get('/weather/weekly', { params }),
  airQuality: (params) => api.get('/weather/air-quality', { params }),
  alerts: (params) => api.get('/weather/alerts', { params }),
  suggestions: (query) => api.get('/weather/suggestions', { params: { q: query } }),
}
