import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Clock, ChevronRight } from 'lucide-react'
import { ServiceIcon } from '../icons/ServiceIcons'
import './HomePage.css'

const STATS = [
  { value: '500+', label: 'Material Variations' },
  { value: '11', label: 'Fabrication Services' },
  { value: '±0.005"', label: 'Cutting Tolerance' },
  { value: '1–2 Day', label: 'Standard Lead Time' },
]

const SERVICES_FEATURED = [
  { title: 'Sheet Laser Cutting', desc: '8–10 kW fiber lasers. Up to 119″×59″. Carbon steel, stainless, aluminum, copper, brass.', slug: 'laser-cutting' },
  { title: 'Brake Bending', desc: 'Up to 119″ bend length. ±1° tolerance. Auto-unfolds 3D models.', slug: 'bending' },
  { title: 'CNC Tube Bending', desc: 'World\'s first in-browser DFM for bent tube. 0.75″–1.5″ OD.', slug: 'cnc-tube-bending' },
  { title: 'Hardware Insertion', desc: '400+ PEM fasteners. Auto DFM verification of hole size & edge distance.', slug: 'hardware-insertion' },
  { title: 'Powder Coating', desc: '17 Prismatic Powder colors. 50 lbs / 60″ max. +4 day lead time.', slug: 'powder-coating' },
  { title: 'Countersinking', desc: '82° Imperial & 90° Metric. Auto-detected from 3D. Works on steel, SS, and aluminum.', slug: 'countersinking' },
]

const HOW_IT_WORKS = [
  { n: '01', title: 'Upload Your File', desc: 'DXF, SVG, STEP, SLDPRT, and 14 other formats. Our DFM engine instantly analyzes your design.' },
  { n: '02', title: 'Configure & Price', desc: 'Select material, thickness, quantity, and add-on services. Get an instant price with live nesting.' },
  { n: '03', title: 'Review DFM Warnings', desc: 'Fix design issues before they cost you. Our software catches bend collisions, tool conflicts, and edge violations.' },
  { n: '04', title: 'Receive Precision Parts', desc: 'Same-day to 2-day delivery. Every part quality-inspected, labeled, and boxed with a packing list.' },
]

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-bg-glow" />
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="chip chip-red" style={{marginBottom: '24px'}}>
              <Zap size={12} /> ISO 9001:2015 Certified
            </div>
            <h1 className="display-hero hero-headline">
              Metal Parts.<br />
              <span className="text-red">Instant</span> Price.
            </h1>
            <p className="hero-sub">
              Upload your file. Get an instant quote. Receive precision-cut metal parts in 1–2 days.
              500+ material variations. 11 services. In-browser DFM checks.
            </p>
            <div className="hero-ctas">
              <Link to="/quote" className="btn btn-primary btn-lg">
                Get Instant Quote <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg">
                View Services
              </Link>
            </div>
            <div className="hero-trust">
              <Shield size={14} /> <span>No setup fees. No minimums. Guaranteed lead times.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-terminal">
              <div className="terminal-header">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="terminal-title">DFM Analysis</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-key">File:</span> <span className="t-val">bracket_v3.step</span></div>
                <div className="t-line"><span className="t-key">Material:</span> <span className="t-val">Steel A36 0.125"</span></div>
                <div className="t-line"><span className="t-key">Services:</span> <span className="t-val">Laser Cut + Bend × 3</span></div>
                <div className="t-divider" />
                <div className="t-line success"><span>✓</span> <span>Min hole diameter — PASS</span></div>
                <div className="t-line success"><span>✓</span> <span>Bend radius — PASS</span></div>
                <div className="t-line success"><span>✓</span> <span>Edge clearance — PASS</span></div>
                <div className="t-line success"><span>✓</span> <span>No collision errors</span></div>
                <div className="t-divider" />
                <div className="t-price-row">
                  <div>
                    <div className="t-label">Unit Price (qty 10)</div>
                    <div className="t-price">$24.80</div>
                  </div>
                  <div>
                    <div className="t-label">Lead Time</div>
                    <div className="t-lead">2 Business Days</div>
                  </div>
                </div>
                <div className="t-btn">Proceed to Checkout →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="label-red">Process</div>
            <h2 className="display-xl">How It Works</h2>
            <p>From file upload to shipped parts in four automated steps. No back-and-forth quoting. No surprises.</p>
          </div>
          <div className="how-grid">
            {HOW_IT_WORKS.map(step => (
              <div key={step.n} className="how-card">
                <div className="how-number">{step.n}</div>
                <h3 className="display-sm how-title">{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{background: 'var(--bg-1)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label-red">Capabilities</div>
            <h2 className="display-xl">11 Fabrication Services</h2>
            <p>Every service is automated, DFM-checked, and available for instant online ordering.</p>
          </div>
          <div className="grid-3">
            {SERVICES_FEATURED.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="service-card card">
                <div className="service-icon"><ServiceIcon slug={s.slug} size={32} /></div>
                <h3 className="display-sm">{s.title}</h3>
                <p>{s.desc}</p>
                <div className="service-link">
                  Learn more <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'40px'}}>
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* DFM CTA */}
      <section className="dfm-section section">
        <div className="container dfm-inner">
          <div className="dfm-content">
            <div className="label-red">AI-Powered DFM</div>
            <h2 className="display-xl">Catch Problems<br />Before They Ship</h2>
            <p>Our automated Design for Manufacturability engine catches bend collisions, thin features, tool conflicts, and hardware violations instantly — before your order reaches production.</p>
            <Link to="/quote" className="btn btn-primary btn-lg" style={{marginTop:'8px'}}>
              Try It Free <ArrowRight size={18} />
            </Link>
          </div>
          <div className="dfm-visual">
            {['Min hole too small → Auto-flagged', 'Bend collision detected → Visual preview', 'Hardware clearance → Auto-adjusted', 'Material limits → Instant feedback'].map((item, i) => (
              <div key={i} className="dfm-item">
                <div className="dfm-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2 className="display-lg">Ready to build something?</h2>
            <p>Upload your file and get an instant quote in under 60 seconds.</p>
          </div>
          <Link to="/quote" className="btn btn-primary btn-lg">
            Start Your Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
