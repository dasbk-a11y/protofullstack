import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ChevronDown, Menu, X, Zap, User, LogOut, Package } from 'lucide-react'
import './Navbar.css'

const SERVICES = [
  { label: 'Sheet Laser Cutting', slug: 'laser-cutting' },
  { label: 'Laser Tube Cutting', slug: 'laser-tube-cutting' },
  { label: 'Brake Bending', slug: 'bending' },
  { label: 'CNC Tube Bending', slug: 'cnc-tube-bending' },
  { label: 'Hardware Insertion', slug: 'hardware-insertion' },
  { label: 'Tapping', slug: 'tapping' },
  { label: 'Countersinking', slug: 'countersinking' },
  { label: 'Deburring & Grain', slug: 'deburring' },
  { label: 'Bead Blasting', slug: 'bead-blasting' },
  { label: 'Centrifugal Tumbling', slug: 'centrifugal-tumbling' },
  { label: 'Powder Coating', slug: 'powder-coating' },
]

const RESOURCES = [
  { label: 'Tutorials', path: '/resources/tutorials' },
  { label: 'Design Guide', path: '/resources/design-guide' },
  { label: 'Enterprise Features', path: '/resources/enterprise' },
  { label: 'Min/Max Part Sizes', path: '/resources/sizes' },
  { label: 'FAQ', path: '/resources/faq' },
  { label: 'Quality & Shipping', path: '/resources/shipping' },
]

const PARTNERS = [
  { label: 'Referral Program', path: '/partners/referral' },
  { label: 'Academic Sponsorships', path: '/partners/sponsorships' },
  { label: 'Client Spotlights', path: '/partners/spotlights' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setActiveDropdown(null)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
    setUserMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Zap size={22} className="logo-icon" />
          <span>PROTOZAP</span>
        </Link>

        {/* Desktop nav */}
        <div className="navbar-links">
          <Link to="/materials" className="nav-link">Materials</Link>

          <div className="nav-dropdown" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
            <button className="nav-link nav-drop-trigger">
              Services <ChevronDown size={14} className={activeDropdown === 'services' ? 'rotated' : ''} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'services' ? 'active' : ''}`}>
              <div className="dropdown-header label">11 Services</div>
              {SERVICES.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="dropdown-item">{s.label}</Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown" onMouseEnter={() => setActiveDropdown('resources')} onMouseLeave={() => setActiveDropdown(null)}>
            <button className="nav-link nav-drop-trigger">
              Resources <ChevronDown size={14} className={activeDropdown === 'resources' ? 'rotated' : ''} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'resources' ? 'active' : ''}`}>
              {RESOURCES.map(r => (
                <Link key={r.path} to={r.path} className="dropdown-item">{r.label}</Link>
              ))}
            </div>
          </div>

          <div className="nav-dropdown" onMouseEnter={() => setActiveDropdown('partners')} onMouseLeave={() => setActiveDropdown(null)}>
            <button className="nav-link nav-drop-trigger">
              Partner With Us <ChevronDown size={14} className={activeDropdown === 'partners' ? 'rotated' : ''} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'partners' ? 'active' : ''}`}>
              <div className="dropdown-header label">Partnership Programs</div>
              {PARTNERS.map(p => (
                <Link key={p.path} to={p.path} className="dropdown-item">{p.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu-wrap" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
              <button className="user-btn">
                <User size={16} /> {user.name || user.email}
                <ChevronDown size={12} />
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/dashboard" className="dropdown-item"><Package size={14} /> My Orders</Link>
                  <button onClick={handleLogout} className="dropdown-item danger"><LogOut size={14} /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="nav-link">Sign In</Link>
          )}
          <Link to="/quote" className="btn btn-primary btn-sm">Instant Quote</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/materials" className="mobile-link">Materials</Link>
          <div className="mobile-section-label label">Services</div>
          {SERVICES.map(s => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="mobile-link indent">{s.label}</Link>
          ))}
          <div className="mobile-section-label label">Resources</div>
          {RESOURCES.map(r => (
            <Link key={r.path} to={r.path} className="mobile-link indent">{r.label}</Link>
          ))}
          <div className="mobile-section-label label">Partner With Us</div>
          {PARTNERS.map(p => (
            <Link key={p.path} to={p.path} className="mobile-link indent">{p.label}</Link>
          ))}
          <div className="mobile-actions">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}>My Orders</Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{width:'100%',justifyContent:'center'}}>Sign Out</button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}>Sign In</Link>
            )}
            <Link to="/quote" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Instant Quote</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
