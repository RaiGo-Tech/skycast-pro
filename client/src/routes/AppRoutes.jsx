import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../components/common/Loader'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('../pages/Home'))
const Weather = lazy(() => import('../pages/Weather'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Terms = lazy(() => import('../pages/Terms'))
const NotFound = lazy(() => import('../pages/NotFound'))

const AppRoutes = () => (
  <Suspense fallback={<div className="app-bg"><Loader /></div>}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="weather" element={<Weather />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
