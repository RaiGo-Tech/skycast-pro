import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'

const MainLayout = () => (
  <div className="app-bg">
    <div className="app-shell">
      <div className="dashboard-grid">
        <Navbar />
        <main className="min-w-0">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  </div>
)

export default MainLayout
