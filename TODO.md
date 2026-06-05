# SkyCast Pro — Implementation TODO

## Phase 1: Premium Landing + Routing
- [x] Redesign `client/src/pages/Home.jsx` into a real landing page (hero, animated background, CTA).
- [x] Update routing in `client/src/routes/AppRoutes.jsx` so `/` is landing and `/weather` is forecast dashboard.




## Phase 2: Backend-backed Search Suggestions
- [ ] Update `client/src/components/common/SearchBar.jsx` to fetch suggestions from `GET /api/weather/suggestions` using debouncing.
- [ ] Ensure search can handle city + country + ZIP input with basic parsing.

## Phase 3: Auth Consistency + Protected Flows
- [ ] Fix axios credentials strategy (`withCredentials`) to align with backend httpOnly cookie auth.
- [ ] Validate `ProtectedRoute` behavior with backend `protect` middleware.

## Phase 4: Favorites + History Persistence
- [ ] Verify/implement backend endpoints for favorites & search history under `/api/user`.
- [ ] Update `client/src/context/WeatherContext.jsx` to sync favorites/history to backend when authenticated.

## Phase 5: Admin Dashboard UI
- [ ] Add admin dashboard page and wire to `/api/admin/*`.
- [ ] Ensure admin-only access on frontend.

## Phase 6: Map, Alerts, Charts Polish
- [ ] Validate `WeatherMap`, wind visualization, and alerts rendering.
- [ ] Verify charts responsiveness & tooltips.

## Phase 7: PWA/SEO/Perf + Deployment Docs
- [ ] Ensure PWA manifest/service worker is correct.
- [ ] Improve SEO meta tags.
- [ ] Add code-splitting (lazy loading) for routes.
- [ ] Create/verify `.env.example` and deployment steps in README.

## Phase 8: Final polish
- [ ] Skeleton loaders in all key loading states.
- [ ] Premium 404 page.
- [ ] Run full app smoke test and address errors.

