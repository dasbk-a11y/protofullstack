import { Link } from 'react-router-dom'
import { Zap, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Zap size={20} />
              <span>PROTOZAP</span>
            </Link>
            <p>ISO 9001:2015 Certified. On-demand precision metal fabrication with instant online quoting.</p>
            <div className="footer-files">
              <span className="label">Supported Files:</span>
              <span>DXF · SVG · AI · STEP · SLDPRT · CATPART · IPT · IGS · IGES · NX · 3DM · SAT</span>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="X/Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Services</div>
              {[
                ['Sheet Laser Cutting', '/services/laser-cutting'],
                ['Laser Tube Cutting', '/services/laser-tube-cutting'],
                ['Brake Bending', '/services/bending'],
                ['CNC Tube Bending', '/services/cnc-tube-bending'],
                ['Hardware Insertion', '/services/hardware-insertion'],
                ['Tapping', '/services/tapping'],
                ['Countersinking', '/services/countersinking'],
                ['Deburring & Grain', '/services/deburring'],
                ['Bead Blasting', '/services/bead-blasting'],
                ['Centrifugal Tumbling', '/services/centrifugal-tumbling'],
                ['Powder Coating', '/services/powder-coating'],
              ].map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Resources</div>
              {[
                ['Tutorials', '/resources/tutorials'],
                ['Design Guide', '/resources/design-guide'],
                ['Enterprise Features', '/resources/enterprise'],
                ['Min/Max Sizes', '/resources/sizes'],
                ['FAQ', '/resources/faq'],
                ['Quality & Shipping', '/resources/shipping'],
                ['Materials', '/materials'],
              ].map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Partner With Us</div>
              {[
                ['Referral Program', '/partners/referral'],
                ['Academic Sponsorships', '/partners/sponsorships'],
                ['Client Spotlights', '/partners/spotlights'],
              ].map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}

              <div className="footer-col-title" style={{marginTop: '24px'}}>Company</div>
              {[
                ['About Us', '/about'],
                ['Contact', '/contact'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 Protozap, Inc. All rights reserved.</span>
          <Link to="/quote" className="btn btn-primary btn-sm">Get Instant Quote</Link>
        </div>
      </div>
    </footer>
  )
}
