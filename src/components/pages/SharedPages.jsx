import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, Upload, ArrowRight, Check, X, Package, FileText, Loader2, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { materialsAPI, servicesAPI, quoteAPI, ordersAPI, uploadAPI } from '../../utils/api'
import './SharedPages.css'

/* ── shared helpers ───────────────────────────────────────────── */
function Spinner() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'80px 0'}}>
      <Loader2 size={32} style={{color:'var(--red)',animation:'spin 1s linear infinite'}} />
    </div>
  )
}
function ApiError({ msg }) {
  return (
    <div className="alert alert-error" style={{margin:'32px 0'}}>
      <AlertTriangle size={18}/>
      <span>{msg || 'Failed to load data. Is the backend running on :8000?'}</span>
    </div>
  )
}

const SVC_BADGE = { laser:'⚡ Laser', bend:'🔧 Bending', hardware:'🔩 Hardware', tapping:'🪛 Tapping', countersink:'⭕ Countersink', powder:'🎨 Powder' }
const SVC_ICONS = { 'laser-cutting':'⚡','tube-cutting':'🎯','bending':'🔧','cnc-tube-bending':'🔄','hardware-insertion':'🔩','tapping':'🪛','countersinking':'⭕','deburring':'✨','bead-blasting':'🌫️','tumbling':'🌀','powder-coating':'🎨' }

/* ========================================
   MATERIALS PAGE  — live API
   ======================================== */
export function MaterialsPage() {
  const [materials, setMaterials] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([materialsAPI.list(), materialsAPI.categories()])
      .then(([mRes, cRes]) => {
        setMaterials(mRes.data.materials)
        setCategories(['all', ...cRes.data.categories])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCat === 'all' ? materials : materials.filter(m => m.category === activeCat)
  const getBadges = m => {
    const b = ['laser']
    if (m.supports_bending) b.push('bend')
    if (m.supports_tapping) b.push('tapping')
    if (m.supports_powder_coating) b.push('powder')
    return b
  }

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container">
          <div className="label-red">500+ Variations</div>
          <h1 className="display-xl">Materials Catalog</h1>
          <p>Steel, stainless, aluminum, copper, brass, bronze, nickel — sheet, plate, tube, and pipe.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && <>
            <div className="cat-filter">
              {categories.map(c => (
                <button key={c} className={`tab ${activeCat===c?'active':''}`} onClick={() => setActiveCat(c)}>
                  {c === 'all' ? 'All' : c.replace(/_/g,' ')}
                </button>
              ))}
            </div>
            <div className="grid-3" style={{marginTop:32}}>
              {filtered.map(m => (
                <div key={m.id} className="material-card card">
                  <div className="material-cat chip">{m.category?.replace(/_/g,' ')}</div>
                  <h3 className="display-sm">{m.name}</h3>
                  <p style={{color:'var(--text-2)',fontSize:'0.85rem',lineHeight:1.6,marginBottom:12}}>{m.description}</p>
                  <div className="material-specs">
                    <div className="spec-row">
                      <span className="label">Thickness</span>
                      <span>{m.thicknesses?.[0]?.label} – {m.thicknesses?.[m.thicknesses.length-1]?.label}</span>
                    </div>
                    <div className="spec-row"><span className="label">Max Size</span><span>{m.max_size}</span></div>
                    <div className="spec-row"><span className="label">Base Rate</span><span>${m.base_price}/in²</span></div>
                  </div>
                  <div className="material-badges">
                    {getBadges(m).map(s => <span key={s} className="chip chip-red" style={{fontSize:'0.7rem'}}>{SVC_BADGE[s]||s}</span>)}
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

/* ========================================
   SERVICES PAGE  — live API
   ======================================== */
export function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    servicesAPI.list()
      .then(r => setServices(r.data.services))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container">
          <div className="label-red">Full Capability</div>
          <h1 className="display-xl">11 Fabrication Services</h1>
          <p>Every service is automated, DFM-checked, and available for instant online ordering.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {loading && <Spinner />}
          {error && <ApiError />}
          {!loading && !error && (
            <div className="grid-3">
              {services.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="service-overview-card card">
                  <div className="service-icon-lg">{SVC_ICONS[s.slug]||'🔩'}</div>
                  <h3 className="display-sm">{s.name}</h3>
                  <p style={{color:'var(--text-2)',fontSize:'0.88rem',lineHeight:1.6,flex:1}}>{s.short_desc}</p>
                  <span className="service-arrow">Details <ChevronRight size={14}/></span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const [svc, setSvc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    servicesAPI.get(slug)
      .then(r => setSvc(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="page-top section container"><Spinner /></div>
  if (error || !svc) return (
    <div className="page-top section container" style={{paddingTop:120}}>
      <ApiError msg="Service not found." />
      <Link to="/services" className="btn btn-outline">← All Services</Link>
    </div>
  )

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container">
          <div className="label-red">Service</div>
          <h1 className="display-xl">{SVC_ICONS[svc.slug]||'🔩'} {svc.name}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container service-detail-layout">
          <div>
            <p style={{color:'var(--text-2)',fontSize:'1.05rem',lineHeight:1.8,marginBottom:32}}>{svc.description}</p>
            {svc.capabilities?.length > 0 && (
              <div style={{marginBottom:32}}>
                <div className="label" style={{marginBottom:14}}>Capabilities</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {svc.capabilities.map((c,i) => (
                    <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                      <Check size={16} style={{color:'var(--red)',flexShrink:0,marginTop:2}}/>
                      <span style={{color:'var(--text-2)',fontSize:'0.95rem'}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="specs-grid">
              <div className="spec-block card">
                <div className="spec-label label">Lead Time</div>
                <div className="spec-val">{svc.lead_time_days} Business Days</div>
              </div>
            </div>
          </div>
          <div className="service-cta-sidebar">
            <div className="card-highlight">
              <div className="display-sm" style={{marginBottom:8}}>Ready to order?</div>
              <p style={{color:'var(--text-2)',fontSize:'0.9rem',marginBottom:20}}>Get an instant price for your {svc.name.toLowerCase()} parts.</p>
              <Link to="/quote" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Get Instant Quote</Link>
              <Link to="/services" className="btn btn-ghost btn-sm" style={{width:'100%',justifyContent:'center',marginTop:8}}>← All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ========================================
   QUOTE PAGE  — live API
   ======================================== */
const ADD_ON_SERVICES = [
  { id:'bending', label:'Brake Bending', req:'supports_bending' },
  { id:'tapping', label:'Metal Tapping', req:null },
  { id:'countersinking', label:'Countersinking', req:null },
  { id:'hardware_insertion', label:'Hardware Insertion', req:null },
  { id:'bead_blasting', label:'Bead Blasting', req:null },
  { id:'tumbling', label:'Centrifugal Tumbling', req:null },
  { id:'powder_coating', label:'Powder Coating', req:'supports_powder_coating' },
]

export function QuotePage() {
  const [step, setStep] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)
  const [dfmDetails, setDfmDetails] = useState(null)
  const [materials, setMaterials] = useState([])
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedThickness, setSelectedThickness] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedServices, setSelectedServices] = useState([])
  const [leadTime, setLeadTime] = useState('standard_2_day')
  const [quote, setQuote] = useState(null)
  const [quoting, setQuoting] = useState(false)
  const [quoteError, setQuoteError] = useState(null)

  useEffect(() => {
    materialsAPI.list().then(r => {
      const mats = r.data.materials
      setMaterials(mats)
      if (mats.length) {
        setSelectedMaterial(mats[0].id)
        setSelectedThickness(mats[0].thicknesses?.[0]?.value ?? '')
      }
    }).catch(() => {})
  }, [])

  const currentMat = materials.find(m => m.id === selectedMaterial)

  const handleMaterialChange = id => {
    setSelectedMaterial(id)
    const m = materials.find(x => x.id === id)
    setSelectedThickness(m?.thicknesses?.[0]?.value ?? '')
    setSelectedServices([])
  }

  const doUpload = async f => {
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', f)
      const { data } = await uploadAPI.upload(fd)
      setUploadResult(data)
      const { data: dfm } = await uploadAPI.dfm(data.file_id)
      setDfmDetails(dfm)
      setStep(2)
    } catch { setUploadResult({ errors:['Upload failed. Please try again.'] }) }
    finally { setUploading(false) }
  }

  const handleDrop = e => { e.preventDefault(); setDragging(false); const f=e.dataTransfer.files[0]; if(f){setFile(f);doUpload(f)} }
  const handleFile = e => { const f=e.target.files[0]; if(f){setFile(f);doUpload(f)} }
  const toggleService = s => setSelectedServices(p => p.includes(s)?p.filter(x=>x!==s):[...p,s])

  const handleGetQuote = async () => {
    setQuoting(true); setQuoteError(null)
    try {
      const { data } = await quoteAPI.create({
        items:[{
          file_name: file?.name || 'part.dxf',
          material_id: selectedMaterial,
          thickness: parseFloat(selectedThickness),
          quantity: parseInt(quantity),
          services: selectedServices,
          width: uploadResult?.dimensions?.width || 4,
          height: uploadResult?.dimensions?.height || 4,
        }],
        lead_time: leadTime
      })
      setQuote(data); setStep(3)
    } catch { setQuoteError('Failed to generate quote. Please try again.') }
    finally { setQuoting(false) }
  }

  const reset = () => { setStep(1);setFile(null);setUploadResult(null);setDfmDetails(null);setQuote(null);setSelectedServices([]) }

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container">
          <div className="label-red">Instant Pricing</div>
          <h1 className="display-xl">Get Your Quote</h1>
          <p>Upload a file and get an instant price in seconds. No back-and-forth.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{maxWidth:720}}>
          <div className="quote-steps">
            {['Upload File','Configure','Review & Order'].map((s,i) => (
              <div key={s} className={`quote-step ${step>=i+1?'active':''}`}>
                <div className="q-step-num">{step>i+1?<Check size={14}/>:i+1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step===1 && (uploading ? (
            <div style={{textAlign:'center',padding:'60px 0'}}>
              <Loader2 size={40} style={{color:'var(--red)',animation:'spin 1s linear infinite',marginBottom:16}}/>
              <p style={{color:'var(--text-2)'}}>Uploading and running DFM analysis…</p>
            </div>
          ) : (
            <div className={`upload-zone ${dragging?'dragging':''}`}
              onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop}>
              <Upload size={48} style={{color:'var(--red)',marginBottom:16}}/>
              <h3 className="display-sm">Drop your file here</h3>
              <p>DXF, SVG, AI, STEP, SLDPRT, CATPART, IPT, IGS, IGES, NX, 3DM, SAT, SAB</p>
              <label className="btn btn-primary" style={{marginTop:20,cursor:'pointer'}}>
                Browse Files
                <input type="file" style={{display:'none'}} onChange={handleFile}
                  accept=".dxf,.svg,.ai,.step,.stp,.sldprt,.catpart,.ipt,.igs,.iges,.3dm,.sat,.sab"/>
              </label>
            </div>
          ))}

          {/* STEP 2 */}
          {step===2 && uploadResult && (
            <div style={{display:'flex',flexDirection:'column',gap:24}}>
              {uploadResult.errors?.length>0
                ? <div className="alert alert-error"><X size={16}/><span>{uploadResult.errors[0]}</span></div>
                : <div className="alert alert-success"><Check size={16}/><span><strong>{uploadResult.filename}</strong> uploaded — DFM analysis complete.</span></div>
              }
              {dfmDetails?.checks?.length>0 && (
                <div className="card" style={{padding:20}}>
                  <div className="label" style={{marginBottom:12}}>DFM Checks</div>
                  {dfmDetails.checks.map((c,i) => (
                    <div key={i} style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
                      {c.status==='pass'
                        ? <Check size={14} style={{color:'#4ade80',flexShrink:0}}/>
                        : <AlertTriangle size={14} style={{color:'#facc15',flexShrink:0}}/>}
                      <span style={{fontSize:'0.88rem',color:'var(--text-2)'}}>{c.message}</span>
                    </div>
                  ))}
                  {dfmDetails.estimated_cut_time && (
                    <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--border)',display:'flex',gap:24}}>
                      <div><div className="label" style={{marginBottom:4}}>Cut Time</div><span>{dfmDetails.estimated_cut_time} min</span></div>
                      <div><div className="label" style={{marginBottom:4}}>Perimeter</div><span>{dfmDetails.perimeter}"</span></div>
                      <div><div className="label" style={{marginBottom:4}}>Area</div><span>{dfmDetails.area} in²</span></div>
                    </div>
                  )}
                </div>
              )}
              {uploadResult.warnings?.map((w,i) => (
                <div key={i} style={{background:'rgba(250,204,21,0.08)',border:'1px solid rgba(250,204,21,0.4)',color:'#facc15',display:'flex',gap:10,alignItems:'center',borderRadius:'var(--r-md)',padding:'12px 16px'}}>
                  <AlertTriangle size={16}/><span style={{fontSize:'0.9rem'}}>{w}</span>
                </div>
              ))}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Material</label>
                  <select className="form-select" value={selectedMaterial} onChange={e=>handleMaterialChange(e.target.value)}>
                    {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Thickness</label>
                  <select className="form-select" value={selectedThickness} onChange={e=>setSelectedThickness(e.target.value)}>
                    {currentMat?.thicknesses?.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input type="number" className="form-input" value={quantity} min={1}
                    onChange={e=>setQuantity(Math.max(1,parseInt(e.target.value)||1))}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Lead Time</label>
                  <select className="form-select" value={leadTime} onChange={e=>setLeadTime(e.target.value)}>
                    <option value="same_day">Same Day</option>
                    <option value="next_day">Next Day</option>
                    <option value="standard_2_day">2 Business Days (Standard)</option>
                    <option value="standard_3_day">3 Business Days</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="label" style={{marginBottom:12}}>Add-on Services</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {ADD_ON_SERVICES.filter(s => !s.req || currentMat?.[s.req]).map(s => (
                    <label key={s.id} style={{display:'flex',alignItems:'center',gap:12,cursor:'pointer',
                      padding:'12px 16px',background:'var(--bg-2)',
                      border:`1px solid ${selectedServices.includes(s.id)?'var(--red)':'var(--border)'}`,
                      borderRadius:'var(--r-md)',transition:'border-color 0.2s'}}>
                      <input type="checkbox" checked={selectedServices.includes(s.id)} onChange={()=>toggleService(s.id)}/>
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {quoteError && <div className="alert alert-error"><X size={16}/><span>{quoteError}</span></div>}
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}
                onClick={handleGetQuote} disabled={quoting}>
                {quoting ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Calculating…</> : <>Calculate Price <ArrowRight size={16}/></>}
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step===3 && quote && (
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div className="alert alert-success">
                <Check size={16}/><span>Quote <strong>{quote.quote_id}</strong> — valid until {quote.valid_until}</span>
              </div>
              {quote.items.map((item,i) => (
                <div key={i} className="card" style={{padding:20}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16}}>
                    <div>
                      <div className="label" style={{marginBottom:4}}>Part</div>
                      <div style={{fontWeight:600}}>{item.file_name}</div>
                      <div style={{color:'var(--text-2)',fontSize:'0.85rem',marginTop:4}}>
                        {item.material_name} · {item.thickness}" · Qty {item.quantity}
                      </div>
                      {item.services?.length>0 && (
                        <div style={{color:'var(--text-3)',fontSize:'0.8rem',marginTop:4}}>
                          + {item.services.map(s=>s.replace(/_/g,' ')).join(', ')}
                        </div>
                      )}
                      {item.dfm_warnings?.map((w,wi) => (
                        <div key={wi} style={{color:'#facc15',fontSize:'0.8rem',marginTop:4}}>⚠ {w}</div>
                      ))}
                    </div>
                    <div style={{textAlign:'right',flexShrink:0}}>
                      <div style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'1.5rem'}}>
                        ${item.total_price.toFixed(2)}
                      </div>
                      <div style={{color:'var(--text-2)',fontSize:'0.82rem'}}>${item.unit_price.toFixed(2)} / ea</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="quote-price-card card-highlight">
                <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
                  {[['Subtotal', `$${quote.subtotal.toFixed(2)}`],
                    ...(quote.nesting_savings>0 ? [['Nesting Savings', `-$${quote.nesting_savings.toFixed(2)}`, '#4ade80']] : []),
                    ['Shipping', quote.shipping===0?'Free':`$${quote.shipping.toFixed(2)}`],
                  ].map(([k,v,color]) => (
                    <div key={k} style={{display:'flex',justifyContent:'space-between',color:color||undefined}}>
                      <span style={{color:color||'var(--text-2)'}}>{k}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--border)',paddingTop:10}}>
                    <strong style={{fontFamily:'var(--font-display)',fontSize:'1.1rem'}}>Total</strong>
                    <strong style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',color:'var(--red)'}}>
                      ${quote.total.toFixed(2)}
                    </strong>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'12px 16px',
                  background:'rgba(255,255,255,0.04)',borderRadius:'var(--r-md)',marginBottom:16}}>
                  <span className="label">Estimated Ship Date</span>
                  <span style={{fontFamily:'var(--font-display)',fontWeight:700,color:'#4ade80'}}>
                    {quote.estimated_ship_date}
                  </span>
                </div>
                <Link to="/auth" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Place Order <ArrowRight size={16}/>
                </Link>
                <button className="btn btn-ghost btn-sm"
                  style={{width:'100%',justifyContent:'center',marginTop:8}} onClick={reset}>
                  Start New Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/* ========================================
   AUTH PAGE
   ======================================== */
export function AuthPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      if (mode==='login') await login(form.email, form.password)
      else await register(form)
      navigate('/dashboard')
    } catch {
      setError(mode==='login' ? 'Invalid email or password.' : 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-top auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="label-red" style={{marginBottom:8}}>{mode==='login'?'Welcome Back':'Get Started'}</div>
          <h1 className="display-md">{mode==='login'?'Sign In':'Create Account'}</h1>
        </div>
        <div className="tabs" style={{marginBottom:24}}>
          <button className={`tab ${mode==='login'?'active':''}`} onClick={()=>setMode('login')}>Sign In</button>
          <button className={`tab ${mode==='register'?'active':''}`} onClick={()=>setMode('register')}>Register</button>
        </div>
        {error && <div className="alert alert-error" style={{marginBottom:20}}><X size={16}/>{error}</div>}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
          {mode==='register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Your name" value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})} required/>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="your@email.com" value={form.email}
              onChange={e=>setForm({...form,email:e.target.value})} required/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})} required/>
          </div>
          <button type="submit" className="btn btn-primary"
            style={{width:'100%',justifyContent:'center',marginTop:8}} disabled={loading}>
            {loading
              ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Processing…</>
              : mode==='login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ========================================
   DASHBOARD PAGE  — live API
   ======================================== */
const STATUS_COLOR = { delivered:'#4ade80', confirmed:'#60a5fa', in_production:'#facc15', processing:'#a78bfa', shipped:'#34d399' }

export function DashboardPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    ordersAPI.list()
      .then(r => setOrders(r.data.orders))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div>
            <div className="label-red">My Account</div>
            <h1 className="display-xl">Dashboard</h1>
            {user && <p style={{color:'var(--text-2)'}}>Welcome back, {user.name||user.email}</p>}
          </div>
          <Link to="/quote" className="btn btn-primary">New Quote <ArrowRight size={16}/></Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-md" style={{marginBottom:24}}>Recent Orders</h2>
          {loading && <Spinner />}
          {error && <ApiError msg="Could not load orders." />}
          {!loading && !error && (orders.length===0 ? (
            <div style={{textAlign:'center',padding:'64px 0',color:'var(--text-2)'}}>
              <Package size={48} style={{opacity:0.3,marginBottom:16}}/>
              <p>No orders yet. Start with a quote!</p>
              <Link to="/quote" className="btn btn-primary" style={{marginTop:16}}>Get Instant Quote</Link>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {orders.map(o => (
                <div key={o.id} className="order-row card">
                  <div className="order-id"><FileText size={16} style={{color:'var(--red)'}}/><span>{o.id}</span></div>
                  <div className="order-info"><span className="label">Date</span><span>{o.created_at?.split('T')[0]}</span></div>
                  <div className="order-info"><span className="label">Parts</span><span>{o.items?.length}</span></div>
                  <div className="order-info"><span className="label">Total</span><strong>${o.total?.toFixed(2)}</strong></div>
                  <div className="order-status" style={{color:STATUS_COLOR[o.status]||'var(--text-2)'}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:'currentColor'}}/>
                    {o.status?.replace(/_/g,' ')}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ========================================
   CONTACT PAGE  — live API
   ======================================== */
export function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch { setError('Failed to send message. Please email us directly at support@protozap.com') }
    finally { setLoading(false) }
  }

  return (
    <div className="page-top">
      <section className="page-hero">
        <div className="container">
          <div className="label-red">Get in Touch</div>
          <h1 className="display-xl">Contact Us</h1>
        </div>
      </section>
      <section className="section">
        <div className="container contact-layout">
          <div>
            <h2 className="display-md" style={{marginBottom:24}}>Send Us a Message</h2>
            {submitted ? (
              <div className="alert alert-success"><Check size={18}/><div><strong>Message sent!</strong> We'll get back to you within 1 business day.</div></div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:20}}>
                {error && <div className="alert alert-error"><X size={16}/><span>{error}</span></div>}
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-input" placeholder="Your name" value={form.name}
                      onChange={e=>setForm({...form,name:e.target.value})} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="your@email.com" value={form.email}
                      onChange={e=>setForm({...form,email:e.target.value})} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="How can we help?" value={form.subject}
                    onChange={e=>setForm({...form,subject:e.target.value})} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows={6} placeholder="Tell us more…" value={form.message}
                    onChange={e=>setForm({...form,message:e.target.value})} required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{alignSelf:'flex-start'}} disabled={loading}>
                  {loading
                    ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Sending…</>
                    : <>Send Message <ArrowRight size={16}/></>}
                </button>
              </form>
            )}
          </div>
          <div className="contact-info">
            <div className="card">
              <h3 className="display-sm" style={{marginBottom:20}}>Contact Info</h3>
              {[{label:'Email',val:'support@protozap.com'},{label:'Phone',val:'(801) 850-7584'},{label:'Office Hours',val:'8 AM – 4 PM, Mon–Fri'}].map(i => (
                <div key={i.label} style={{marginBottom:16}}>
                  <div className="label" style={{marginBottom:4}}>{i.label}</div>
                  <div>{i.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
