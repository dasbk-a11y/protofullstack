import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Check, DollarSign, GraduationCap, Star, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { contactAPI } from '../../utils/api'
import './PartnersPage.css'

/* ─────────── REFERRAL PAGE ─────────── */
function ReferralPage() {
  const [form, setForm] = useState({ name: '', email: '', website: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    { q: 'Do I have to be a Protozap customer to apply?', a: 'You must register for a customer account to be linked to rewards, but there are no preset purchasing requirements. You\'re encouraged to experience the platform yourself for authentic endorsements.' },
    { q: 'How are rewards totals calculated?', a: 'Points accrue based on the net revenue from your referrals during their first three years. Net revenue excludes discounts, tax, and shipping. Year 1: 15%, Year 2: 10%, Year 3: 5%.' },
    { q: 'What are the redemption options?', a: 'Points can be redeemed as cash at 1 cent per point, or as Protozap account credit at double the value (2 cents per point). Points never expire.' },
    { q: 'Are there quotas to meet?', a: 'No quotas. Just maintain your customer account and follow our Terms of Service.' },
    { q: 'Can I be an affiliate outside of the US?', a: 'Due to international tax law constraints, we currently only accept US-based affiliates.' },
    { q: 'Do referrals also get rewarded?', a: 'Yes! Each referred customer receives a discount code for 50% OFF (up to $200) their first order.' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await contactAPI.affiliate({
        name: form.name, email: form.email,
        website: form.website, description: form.description
      })
      setSubmitted(true)
    } catch { setError('Submission failed. Please email partnership@protozap.com directly.') }
    finally { setLoading(false) }
  }

  return (
    <div className="partners-page page-top">
      {/* Hero */}
      <section className="partners-hero">
        <div className="container">
          <div className="label-red">Revenue Sharing</div>
          <h1 className="display-xl" style={{marginTop:12}}>Let's Do Something<br />Great. Together.</h1>
          <p>Earn exceptional rewards for referring new customers to Protozap. Whether you're an influencer, engineer, or educator — if your network needs metal fabrication, we'll reward you handsomely.</p>
          <a href="#apply" className="btn btn-primary btn-lg" style={{marginTop:16}}>
            Apply Now <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <div className="label-red">Commission Structure</div>
            <h2 className="display-lg">A Win-Win That's Simple and Rewarding</h2>
            <p>For each new account you refer, earn a percentage of that customer's net revenue for their first 3 years.</p>
          </div>
          <div className="commission-grid">
            {[
              { year: 'Year 1', pct: '15%', desc: 'of referred customer\'s net revenue' },
              { year: 'Year 2', pct: '10%', desc: 'of referred customer\'s net revenue' },
              { year: 'Year 3', pct: '5%', desc: 'of referred customer\'s net revenue' },
            ].map(c => (
              <div key={c.year} className="commission-card card">
                <div className="commission-year label">{c.year}</div>
                <div className="commission-pct">{c.pct}</div>
                <div className="commission-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="referral-perks grid-2" style={{marginTop:48}}>
            <div className="perk-card card">
              <DollarSign size={32} style={{color:'var(--red)'}} />
              <h3 className="display-sm">Flexible Redemption</h3>
              <p>Redeem points as <strong>cash (1¢/pt)</strong> or double-value <strong>Protozap credit (2¢/pt)</strong>. Points never expire.</p>
            </div>
            <div className="perk-card card">
              <Star size={32} style={{color:'var(--red)'}} />
              <h3 className="display-sm">Referral Bonus for Your Network</h3>
              <p>Every customer you refer gets a <strong>50% OFF coupon (up to $200)</strong> on their first order — making your referrals more compelling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Good fit */}
      <section className="section" style={{background:'var(--bg-1)'}}>
        <div className="container">
          <div className="section-header center">
            <h2 className="display-lg">Are You a Good Fit?</h2>
            <p>If you answer YES to two or more of these, chances are this will be a great partnership.</p>
          </div>
          <div className="fit-list">
            {[
              'You\'ve personally experienced a positive difference from using Protozap.',
              'You\'re a collaborator by nature — you share knowledge and like seeing others succeed.',
              'You\'re an educator or influencer who enlightens your audience with forward-thinking solutions.',
              'You network with engineers, makers, or mechanically-minded folks who move projects forward.',
            ].map((item, i) => (
              <div key={i} className="fit-item">
                <div className="fit-check"><Check size={16} /></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="display-lg">How to Get Started</h2>
          </div>
          <div className="steps-list">
            {[
              { n: '1', title: 'Agree to be a wholesome promoter', desc: 'Our brand should not be used with vulgar, derogatory, or politically charged content. We\'re compatible with problem-solving, education, and professional work.' },
              { n: '2', title: 'Apply via the form below', desc: 'Fill out the application and we\'ll set up your unique affiliate link and rewards dashboard within 1–3 business days.' },
              { n: '3', title: 'Share your unique referral link', desc: 'Direct your network to protozap.com with your link. Each new account that registers is tracked to you.' },
              { n: '4', title: 'Track your referrals', desc: 'Log in anytime to monitor referral activity, accumulated points, and redemption options in your dashboard.' },
            ].map(s => (
              <div key={s.n} className="step-row">
                <div className="step-num">{s.n}</div>
                <div>
                  <h3 className="display-sm">{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className="section" id="apply" style={{background:'var(--bg-1)'}}>
        <div className="container" style={{maxWidth:640}}>
          <div className="section-header center">
            <div className="label-red">Apply Now</div>
            <h2 className="display-lg">Start the Conversation</h2>
          </div>
          {submitted ? (
            <div className="alert alert-success">
              <Check size={18} />
              <div><strong>Application submitted!</strong> Our team will be in touch within 1–3 business days.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partners-form">
              {error && <div className="alert alert-error" style={{marginBottom:16}}>{error}</div>}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Website / Social Profile</label>
                <input className="form-input" placeholder="https://..." value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Tell us about yourself and your audience</label>
                <textarea className="form-textarea" rows={5} placeholder="How do you connect with engineers, makers, or fabricators?" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={loading}>
                {loading ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Submitting…</> : <>Submit Application <ArrowRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{maxWidth:720}}>
          <div className="section-header center">
            <h2 className="display-lg">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                {faq.q}
                {openFAQ === i ? <ChevronUp size={18} style={{color:'var(--red)',flexShrink:0}} /> : <ChevronDown size={18} style={{flexShrink:0}} />}
              </button>
              {openFAQ === i && (
                <div className="faq-answer-inner">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─────────── SPONSORSHIP PAGE ─────────── */
function SponsorshipPage() {
  const [form, setForm] = useState({ school: '', contact: '', email: '', phone: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    { q: 'How do schools administer the program?', a: 'Upon approval, we create a unique coupon code sent to the Primary Contact. They distribute it internally. Every 4 months (Jan 1, May 1, Sept 1), a new code is issued.' },
    { q: 'Is there a dollar limit on savings?', a: 'No! As long as the code is used by students or faculty, leverage the program as much as you can.' },
    { q: 'What does Protozap expect in return?', a: 'Mentioning Protozap in video presentations, displaying our logo in project docs, and linking to our site from your website or team page.' },
    { q: 'What file formats do you support?', a: 'DXF, SVG, AI, STEP, SLDPRT, CATPART, IPT, PAR, NX, SolidEdge, JT, Rhino 3DM, Parasolid x_t, ACIS (SAT, SAB), and IGES.' },
    { q: 'What is the age requirement?', a: 'Per our privacy policy, participants must be at least 16 years old to create their own account. Younger students must order through a faculty-managed account.' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await contactAPI.sponsorship({
        school_name: form.school, contact_name: form.contact,
        email: form.email, phone: form.phone, program_description: form.description
      })
      setSubmitted(true)
    } catch { setError('Submission failed. Please email sponsorships@protozap.com directly.') }
    finally { setLoading(false) }
  }

  return (
    <div className="partners-page page-top">
      <section className="partners-hero sponsorship-hero">
        <div className="container">
          <div className="label-red">Academic Program</div>
          <h1 className="display-xl" style={{marginTop:12}}>Empowering Tomorrow's<br />Innovators</h1>
          <p>We actively partner with universities, engineering schools, and STEM programs to subsidize parts for class projects and competitions. Thousands of students use Protozap to master real-world fabrication skills.</p>
          <a href="#apply-sponsorship" className="btn btn-primary btn-lg" style={{marginTop:16}}>
            Apply Today <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="display-lg">What Your Program Gets</h2>
          </div>
          <div className="sponsor-benefits grid-3">
            <div className="benefit-card card">
              <div className="benefit-stat">50%</div>
              <div className="benefit-label label">Off All Online Part Orders</div>
              <p>No dollar cap. Deep discounts on every order placed with your coupon code.</p>
            </div>
            <div className="benefit-card card">
              <div className="benefit-stat">0–3</div>
              <div className="benefit-label label">Day Lead Times</div>
              <p>Fast turnaround keeps project timelines on track, even late in the semester.</p>
            </div>
            <div className="benefit-card card">
              <div className="benefit-stat">3×</div>
              <div className="benefit-label label">Coupon Renewals / Year</div>
              <p>New codes issued every 4 months — aligning with semester and term schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills students gain */}
      <section className="section" style={{background:'var(--bg-1)'}}>
        <div className="container">
          <div className="section-header center">
            <h2 className="display-lg">Build to Amaze</h2>
            <p>Students not only get access to a cutting-edge metal factory — they graduate ready to make an impact on Day 1.</p>
          </div>
          <div className="skills-grid grid-2">
            {[
              'Design structures that are stronger and more economical',
              'Instantly check and adjust the DFM of part designs',
              'Iterate with virtually zero delays',
              'Reduce the workload of co-workers and teammates',
            ].map((skill, i) => (
              <div key={i} className="skill-item card">
                <div className="skill-check"><Check size={18} /></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section className="section" id="apply-sponsorship">
        <div className="container" style={{maxWidth:640}}>
          <div className="section-header center">
            <div className="label-red">Apply in Minutes</div>
            <h2 className="display-lg">Get Your Program Approved</h2>
            <p>Eligible programs receive an onboarding invitation within 1–3 business days.</p>
          </div>
          {submitted ? (
            <div className="alert alert-success">
              <Check size={18} />
              <div><strong>Application submitted!</strong> We'll review it and reach out within 1–3 business days.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partners-form">
              <div className="form-group">
                <label className="form-label">School / Institution Name</label>
                <input className="form-input" placeholder="University of..." value={form.school} onChange={e => setForm({...form, school: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Contact Name</label>
                <input className="form-input" placeholder="Professor / Team Lead" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Email</label>
                <input type="email" className="form-input" placeholder="name@university.edu" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-input" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">General Description of Project Types</label>
                <textarea className="form-textarea" rows={5} placeholder="FRC robotics team, ME senior capstone, design-build competition..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={loading}>
                {loading ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Submitting…</> : <>Submit Application <ArrowRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{background:'var(--bg-1)'}}>
        <div className="container" style={{maxWidth:720}}>
          <div className="section-header center">
            <h2 className="display-lg">Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                {faq.q}
                {openFAQ === i ? <ChevronUp size={18} style={{color:'var(--red)',flexShrink:0}} /> : <ChevronDown size={18} style={{flexShrink:0}} />}
              </button>
              {openFAQ === i && <div className="faq-answer-inner">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─────────── SPOTLIGHTS PAGE ─────────── */
function SpotlightsPage() {
  const [form, setForm] = useState({ org: '', contact: '', phone: '', email: '', interviewee: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const spotlights = [
    { name: 'Marco King Dream Desk', tag: 'Custom Fabrication', desc: 'Marco and Mattias King give an inside look at their well-engineered bus conversion, including a mind-bending custom metal desk for video editing and music production.' },
    { name: 'Peter Hoderith', tag: 'Automotive', desc: 'Go-kart enthusiast and Motor1 contributor shares the eye-opening education and access he gets from Protozap\'s instant quoting and DFM checks.' },
    { name: 'Mad Max Hobbyist Anthony Eiting', tag: 'Entertainment', desc: 'By day an engineer for a large agricultural contractor, by night he\'s grabbed Hollywood\'s attention with authentic Mad Max car builds.' },
    { name: 'White Gorge Designs', tag: 'Furniture', desc: 'Sam Tresco disrupts the throwaway culture, creating tangible heritage furniture using custom metal parts from Protozap.' },
    { name: 'Liquidhaus', tag: 'PC Building', desc: 'A one-stop shop for high-performance, custom PC builds — blending eye-popping aesthetics with expert functionality.' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await contactAPI.spotlight({
        org_name: form.org, contact_name: form.contact,
        email: form.email, phone: form.phone, description: form.description
      })
      setSubmitted(true)
    } catch { setError('Submission failed. Please email spotlights@protozap.com directly.') }
    finally { setLoading(false) }
  }

  return (
    <div className="partners-page page-top">
      <section className="partners-hero spotlight-hero">
        <div className="container">
          <div className="label-red">Client Spotlights</div>
          <h1 className="display-xl" style={{marginTop:12}}>Share Your Story<br />With the World</h1>
          <p>We love enabling business, expediting genius, and spreading the word about our awesome customers. If you're building incredible things with Protozap parts, let's connect.</p>
          <a href="#apply-spotlight" className="btn btn-primary btn-lg" style={{marginTop:16}}>
            Get Featured <Star size={18} />
          </a>
        </div>
      </section>

      {/* What you get */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <h2 className="display-lg">What Selected Participants Receive</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🌐', title: 'Website Feature', desc: 'Prominently featured on the Protozap website with your story and project photos.' },
              { icon: '📣', title: 'Social & Newsletter', desc: 'Shared across our social channels and included in our quarterly customer newsletter.' },
              { icon: '🎁', title: 'Exclusive Discount', desc: 'A special discount code as a thank-you for participating in the interview.' },
            ].map(item => (
              <div key={item.title} className="card" style={{textAlign:'center'}}>
                <div style={{fontSize:'2.5rem', marginBottom:'16px'}}>{item.icon}</div>
                <h3 className="display-sm" style={{marginBottom:'12px'}}>{item.title}</h3>
                <p style={{color:'var(--text-2)', fontSize:'0.9rem'}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured spotlights */}
      <section className="section" style={{background:'var(--bg-1)'}}>
        <div className="container">
          <div className="section-header">
            <div className="label-red">Featured Stories</div>
            <h2 className="display-lg">Proudly Supporting Makers and Brands</h2>
          </div>
          <div className="spotlights-grid">
            {spotlights.map(s => (
              <div key={s.name} className="spotlight-card card">
                <div className="chip" style={{marginBottom:16}}>{s.tag}</div>
                <h3 className="display-sm" style={{marginBottom:10}}>{s.name}</h3>
                <p style={{color:'var(--text-2)', fontSize:'0.9rem', lineHeight:1.65}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section className="section" id="apply-spotlight">
        <div className="container" style={{maxWidth:640}}>
          <div className="section-header center">
            <div className="label-red">Let's Talk About You</div>
            <h2 className="display-lg">Apply for a Spotlight</h2>
            <p>Complete this brief form and our team will reach out with details.</p>
          </div>
          {submitted ? (
            <div className="alert alert-success">
              <Check size={18} />
              <div><strong>Thanks for applying!</strong> We'll be in touch soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="partners-form">
              <div className="form-group">
                <label className="form-label">Organization Name</label>
                <input className="form-input" placeholder="Your company or handle" value={form.org} onChange={e => setForm({...form, org: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Contact Name</label>
                <input className="form-input" placeholder="Your name" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-input" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Recommended Interviewee (if different from primary)</label>
                <input className="form-input" placeholder="Name and role" value={form.interviewee} onChange={e => setForm({...form, interviewee: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Tell us about your work</label>
                <textarea className="form-textarea" rows={5} placeholder="What are you building? What makes it interesting to the public?" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} disabled={loading}>
                {loading ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Submitting…</> : <>Submit Application <ArrowRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

/* ─────────── ROUTER ─────────── */
export default function PartnersPage() {
  const { type } = useParams()
  if (type === 'referral') return <ReferralPage />
  if (type === 'sponsorships') return <SponsorshipPage />
  if (type === 'spotlights') return <SpotlightsPage />

  // Overview
  return (
    <div className="partners-page page-top">
      <section className="partners-hero">
        <div className="container">
          <div className="label-red">Partner Programs</div>
          <h1 className="display-xl" style={{marginTop:12}}>Partner With Protozap</h1>
          <p>Three ways to grow together — earn revenue, support students, or share your story with the world.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {[
              { icon: <DollarSign size={28}/>, title:'Referral Program', desc:'Earn 15/10/5% commission on your referrals over 3 years. Plus they get 50% off their first order.', path:'/partners/referral', cta:'Learn More' },
              { icon: <GraduationCap size={28}/>, title:'Academic Sponsorships', desc:'50% off for students and educators. Applied every semester. Build real-world skills that employers love.', path:'/partners/sponsorships', cta:'Apply for Sponsorship' },
              { icon: <Star size={28}/>, title:'Client Spotlights', desc:'Get featured on our website, social channels, and newsletter. Plus an exclusive discount.', path:'/partners/spotlights', cta:'Get Featured' },
            ].map(p => (
              <div key={p.title} className="card" style={{display:'flex',flexDirection:'column',gap:16}}>
                <div style={{color:'var(--red)'}}>{p.icon}</div>
                <h3 className="display-sm">{p.title}</h3>
                <p style={{color:'var(--text-2)',fontSize:'0.9rem',flex:1}}>{p.desc}</p>
                <Link to={p.path} className="btn btn-outline btn-sm">{p.cta} <ArrowRight size={14}/></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
