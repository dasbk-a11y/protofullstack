import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, ChevronDown, ChevronUp, ChevronRight, BookOpen, Video, Building2, HelpCircle, Truck, Ruler, Loader2, AlertTriangle } from 'lucide-react'
import { tutorialsAPI, resourcesAPI } from '../../utils/api'
import './ResourcesPage.css'

function Spinner() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'80px 0'}}>
      <Loader2 size={32} style={{color:'var(--red)',animation:'spin 1s linear infinite'}}/>
    </div>
  )
}
function ApiError({ msg }) {
  return (
    <div className="alert alert-error" style={{margin:'32px 0'}}>
      <AlertTriangle size={18}/><span>{msg||'Failed to load. Is the backend running on :8000?'}</span>
    </div>
  )
}

/* ─────────── TUTORIALS  — live API ─────────── */
function TutorialsPage() {
  const [tutorials, setTutorials] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([tutorialsAPI.list(), tutorialsAPI.categories()])
      .then(([tRes, cRes]) => {
        setTutorials(tRes.data.tutorials)
        setCategories(['All', ...cRes.data.categories])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCat === 'All' ? tutorials : tutorials.filter(t => t.category === activeCat)

  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Video Library</div>
          <h1 className="display-xl">Tutorials</h1>
          <p>Become an expert on Protozap's instant pricing app.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && <>
            <div className="tutorial-filters">
              {categories.map(c => (
                <button key={c} className={`tab ${activeCat===c?'active':''}`} onClick={() => setActiveCat(c)}>{c}</button>
              ))}
            </div>
            <div className="tutorials-grid">
              {filtered.map(t => (
                <div key={t.id} className="tutorial-card card">
                  <div className="tutorial-thumb">
                    <div className="play-btn"><Play size={24} fill="white"/></div>
                    <div className="thumb-cat chip">{t.category}</div>
                  </div>
                  <div className="tutorial-body">
                    <h3 className="display-sm">{t.title}</h3>
                    <p>{t.description}</p>
                    {t.duration_minutes && (
                      <div style={{color:'var(--text-3)',fontSize:'0.8rem',marginTop:6}}>
                        {t.duration_minutes} min
                      </div>
                    )}
                    <button className="btn btn-ghost btn-sm" style={{paddingLeft:0,color:'var(--red-light)',marginTop:8}}>
                      Watch Tutorial <ChevronRight size={14}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>}
        </div>
      </section>
    </div>
  )
}

/* ─────────── DESIGN GUIDE  — live API ─────────── */
function DesignGuidePage() {
  const [sections, setSections] = useState([])
  const [openSection, setOpenSection] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    resourcesAPI.designGuide()
      .then(r => {
        setSections(r.data.sections)
        if (r.data.sections.length) setOpenSection(r.data.sections[0].title)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const activeSection = sections.find(s => s.title === openSection)

  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Design Reference</div>
          <h1 className="display-xl">Design Guide</h1>
          <p>Everything you need to design parts correctly — from file prep to bending and powder coating rules.</p>
        </div>
      </section>
      <section className="section">
        <div className="container guide-layout">
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && <>
            <div className="guide-nav">
              {sections.map(s => (
                <div key={s.title}>
                  <button className={`guide-nav-section ${openSection===s.title?'active':''}`}
                    onClick={() => setOpenSection(s.title)}>
                    {s.title} <ChevronRight size={14} className={openSection===s.title?'rotated':''}/>
                  </button>
                  {openSection===s.title && (
                    <div className="guide-nav-items">
                      {s.articles?.map(a => (
                        <div key={a.slug} className="guide-nav-item">{a.title}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="guide-content">
              {activeSection && (
                <div>
                  <div className="label-red" style={{marginBottom:8}}>{activeSection.title}</div>
                  <h2 className="display-lg" style={{marginBottom:40}}>{activeSection.title} Guide</h2>
                  {activeSection.articles?.map(a => (
                    <div key={a.slug} className="guide-article card" style={{marginBottom:16}}>
                      <h3 className="display-sm" style={{marginBottom:10}}>{a.title}</h3>
                      <button className="btn btn-ghost btn-sm" style={{color:'var(--red-light)',paddingLeft:0,marginTop:12}}>
                        Read Full Article <ChevronRight size={14}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>}
        </div>
      </section>
    </div>
  )
}

/* ─────────── ENTERPRISE  — live API ─────────── */
function EnterprisePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    resourcesAPI.enterprise()
      .then(r => setData(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="resources-page page-top">
      <section className="resources-hero enterprise-hero">
        <div className="container">
          <div className="label-red">Enterprise</div>
          <h1 className="display-xl">Enterprise Features</h1>
          <p>Purchasing and order management tools for engineering teams, procurement departments, and government contractors.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && data && <>
            <div className="enterprise-section">
              <div className="label-red" style={{marginBottom:8}}>Purchasing</div>
              <h2 className="display-lg" style={{marginBottom:36}}>Tools for Your Procurement Team</h2>
              <div className="grid-2">
                {data.purchasing?.map((f, i) => (
                  <div key={f.name} className="enterprise-card card">
                    <div className="enterprise-num">{i+1}</div>
                    <div>
                      <h3 className="display-sm" style={{marginBottom:10}}>{f.name}</h3>
                      <p style={{color:'var(--text-2)',fontSize:'0.92rem',lineHeight:1.7}}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="enterprise-section" style={{marginTop:80}}>
              <div className="label-red" style={{marginBottom:8}}>Order Management</div>
              <h2 className="display-lg" style={{marginBottom:36}}>Track Every Part, Every Step</h2>
              <div className="grid-3">
                {data.order_management?.map(f => (
                  <div key={f.name} className="card" style={{display:'flex',flexDirection:'column',gap:12}}>
                    <h3 className="display-sm">{f.name}</h3>
                    <p style={{color:'var(--text-2)',fontSize:'0.9rem',lineHeight:1.65}}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="enterprise-cta">
              <h3 className="display-md">Need to set up a company account?</h3>
              <p>Contact our support team and we'll help configure your organization's shared access and billing settings.</p>
              <Link to="/contact" className="btn btn-primary">Contact Support</Link>
            </div>
          </>}
        </div>
      </section>
    </div>
  )
}

/* ─────────── FAQ  — live API ─────────── */
function FAQPage() {
  const [faqs, setFaqs] = useState([])
  const [openFAQ, setOpenFAQ] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    resourcesAPI.faq()
      .then(r => setFaqs(r.data.faq))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Help Center</div>
          <h1 className="display-xl">Frequently Asked<br/>Questions</h1>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{maxWidth:760}}>
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && <>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFAQ(openFAQ===i?null:i)}>
                  {faq.q}
                  {openFAQ===i
                    ? <ChevronUp size={18} style={{color:'var(--red)',flexShrink:0}}/>
                    : <ChevronDown size={18} style={{flexShrink:0}}/>}
                </button>
                {openFAQ===i && <div className="faq-answer-inner">{faq.a}</div>}
              </div>
            ))}
            <div style={{marginTop:56,padding:32,background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',textAlign:'center'}}>
              <h3 className="display-sm" style={{marginBottom:10}}>Didn't find your answer?</h3>
              <p style={{color:'var(--text-2)',marginBottom:20,fontSize:'0.92rem'}}>Contact our team and we'll help you out.</p>
              <Link to="/contact" className="btn btn-primary">Contact Support</Link>
            </div>
          </>}
        </div>
      </section>
    </div>
  )
}

/* ─────────── SHIPPING  — static (no API endpoint) ─────────── */
function ShippingPage() {
  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Quality & Shipping</div>
          <h1 className="display-xl">Quality Control<br/>& Delivery</h1>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{maxWidth:840}}>
          <div className="quality-block card" style={{marginBottom:32}}>
            <h2 className="display-md" style={{marginBottom:16}}>Quality Inspection</h2>
            <p style={{color:'var(--text-2)',lineHeight:1.75,marginBottom:16}}>Our quality department has final say on whether parts ship. Every order is inspected against the uploaded design file before leaving the facility. Parts that don't pass are scrapped and recut at no charge.</p>
            <p style={{color:'var(--text-2)',lineHeight:1.75}}>When your parts pass inspection, they are wrapped, labeled, and boxed. Each shipment includes a <strong style={{color:'var(--text)'}}>packing list</strong>. Enterprise customers receive <strong style={{color:'var(--text)'}}>Traceable Mill Certs</strong> attached to their orders.</p>
          </div>
          <h2 className="display-md" style={{marginBottom:24}}>Freight Shipping Policy</h2>
          <p style={{color:'var(--text-2)',marginBottom:32}}>We ship via freight carrier (instead of standard parcel) in the following scenarios:</p>
          <div className="freight-grid">
            {[
              { condition:'≥ 40 lbs', desc:'Single parts weighing 40 pounds or more ship freight automatically.' },
              { condition:'≥ 200 lbs', desc:'Orders totaling 200 lbs or more across all parts.' },
              { condition:'> 94" long', desc:'Parts longer than 94", or parcels where length + girth* exceeds 100".' },
            ].map(f => (
              <div key={f.condition} className="freight-card card">
                <div className="freight-condition">{f.condition}</div>
                <p style={{color:'var(--text-2)',fontSize:'0.9rem'}}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p style={{color:'var(--text-3)',fontSize:'0.82rem',marginTop:16}}>*Girth = double the sum of the two smallest dimensions.</p>
        </div>
      </section>
    </div>
  )
}

/* ─────────── SIZES  — static reference ─────────── */
const SIZE_DATA = [
  { material:'Carbon Steel (thin, ≤10 Ga.)', minSize:'0.1"', maxSize:'119" × 59"' },
  { material:'Carbon Steel (thick, 1.0")', minSize:'0.5"', maxSize:'119" × 59"' },
  { material:'Armor Plate (AR500)', minSize:'0.1"', maxSize:'95" × 47"' },
  { material:'Spring Steel (blue, 0.005")', minSize:'0.1"', maxSize:'23" × 5"' },
  { material:'Stainless Steel 304', minSize:'0.1"', maxSize:'119" × 59"' },
  { material:'Stainless Steel 316', minSize:'0.1"', maxSize:'119" × 59"' },
  { material:'Aluminum 5052/6061', minSize:'0.1"', maxSize:'119" × 59"' },
  { material:'Aluminum 7075', minSize:'0.1"', maxSize:'119" × 59"' },
  { material:'Copper 110', minSize:'0.1"', maxSize:'23" – 119" (grade-dependent)' },
  { material:'Brass 260', minSize:'0.07"', maxSize:'23" – 95"' },
  { material:'Bronze 510 (spring)', minSize:'0.1"', maxSize:'47" × 11"' },
  { material:'Nickel 625', minSize:'0.1"', maxSize:'23" × 11"' },
  { material:'Tube / Pipe (all materials)', minSize:'235mm (length)', maxSize:'Per profile OD' },
]

function SizesPage() {
  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Reference</div>
          <h1 className="display-xl">Min / Max<br/>Part Sizes</h1>
          <p>Limits for how small and large custom parts can be across every material and thickness.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{maxWidth:900}}>
          <p style={{color:'var(--text-2)',marginBottom:32,fontSize:'0.95rem',lineHeight:1.7}}>
            The table below summarizes general min/max limits per material family. For exact lookup by grade, thickness, and tube profile, browse the <strong style={{color:'var(--text)'}}>Materials Catalog</strong>.
          </p>
          <div className="sizes-table">
            <div className="sizes-header"><div>Material</div><div>Min Part Size</div><div>Max Sheet / Part Size</div></div>
            {SIZE_DATA.map((row,i) => (
              <div key={i} className={`sizes-row ${i%2===0?'even':''}`}>
                <div>{row.material}</div>
                <div className="size-chip">{row.minSize}</div>
                <div>{row.maxSize}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:48,padding:28,background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'var(--r-lg)'}}>
            <h3 className="display-sm" style={{marginBottom:8}}>Need the full lookup table?</h3>
            <p style={{color:'var(--text-2)',fontSize:'0.9rem',marginBottom:16}}>Our full materials catalog has every combination of material, thickness, and tube/pipe profile with exact min/max sizes.</p>
            <Link to="/materials" className="btn btn-outline btn-sm">Browse Full Catalog <ChevronRight size={14}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─────────── OVERVIEW ─────────── */
function ResourcesOverview() {
  const resources = [
    { icon:<Video size={28}/>, title:'Tutorials', desc:'Video tutorials covering every feature of the Protozap quoting app.', path:'/resources/tutorials', cta:'Browse Tutorials' },
    { icon:<BookOpen size={28}/>, title:'Design Guide', desc:'Comprehensive design rules for bending, tube cutting, and powder coating.', path:'/resources/design-guide', cta:'Read Guide' },
    { icon:<Building2 size={28}/>, title:'Enterprise Features', desc:'Net terms, company accounts, blanket POs, part libraries, and live tracking.', path:'/resources/enterprise', cta:'Learn More' },
    { icon:<Ruler size={28}/>, title:'Min/Max Sizes', desc:'Size limits for every material, thickness, and tube profile we stock.', path:'/resources/sizes', cta:'View Sizes' },
    { icon:<HelpCircle size={28}/>, title:'FAQ', desc:'Answers to the most common questions about files, pricing, lead times, and shipping.', path:'/resources/faq', cta:'Read FAQ' },
    { icon:<Truck size={28}/>, title:'Quality & Shipping', desc:'How we inspect parts and our freight vs parcel shipping policy.', path:'/resources/shipping', cta:'Learn More' },
  ]
  return (
    <div className="resources-page page-top">
      <section className="resources-hero">
        <div className="container">
          <div className="label-red">Knowledge Base</div>
          <h1 className="display-xl">Resources</h1>
          <p>Everything you need to design, quote, and order precision metal parts with confidence.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {resources.map(r => (
              <Link key={r.path} to={r.path} className="resource-card card">
                <div style={{color:'var(--red)'}}>{r.icon}</div>
                <h3 className="display-sm">{r.title}</h3>
                <p style={{color:'var(--text-2)',fontSize:'0.9rem',lineHeight:1.65,flex:1}}>{r.desc}</p>
                <span className="resource-cta">{r.cta} <ChevronRight size={14}/></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─────────── ROUTER ─────────── */
export default function ResourcesPage() {
  const { type } = useParams()
  if (type === 'tutorials')    return <TutorialsPage />
  if (type === 'design-guide') return <DesignGuidePage />
  if (type === 'enterprise')   return <EnterprisePage />
  if (type === 'faq')          return <FAQPage />
  if (type === 'shipping')     return <ShippingPage />
  if (type === 'sizes')        return <SizesPage />
  return <ResourcesOverview />
}
