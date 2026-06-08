import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import PartnersPage from './components/pages/PartnersPage'
import ResourcesPage from './components/pages/ResourcesPage'
import {
  MaterialsPage,
  ServicesPage,
  ServiceDetailPage,
  QuotePage,
  AuthPage,
  DashboardPage,
  ContactPage,
} from './components/pages/SharedPages'
import './components/pages/HomePage.css'
import './components/pages/PartnersPage.css'
import './components/pages/ResourcesPage.css'

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />

          {/* Materials */}
          <Route path="/materials" element={<Layout><MaterialsPage /></Layout>} />

          {/* Services */}
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/services/:slug" element={<Layout><ServiceDetailPage /></Layout>} />

          {/* Resources */}
          <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
          <Route path="/resources/:type" element={<Layout><ResourcesPage /></Layout>} />

          {/* Partners */}
          <Route path="/partners" element={<Layout><PartnersPage /></Layout>} />
          <Route path="/partners/:type" element={<Layout><PartnersPage /></Layout>} />

          {/* Quote */}
          <Route path="/quote" element={<Layout><QuotePage /></Layout>} />

          {/* Auth */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />

          {/* Contact */}
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div style={{textAlign:'center',padding:'160px 24px'}}>
                <div style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'8rem',color:'var(--border)'}}>404</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'1.5rem',marginBottom:24}}>Page not found</div>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
