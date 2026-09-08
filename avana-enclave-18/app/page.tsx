'use client';

import { useEffect, useMemo, useState } from 'react';
import { content } from '../content/avana';

const plots = Array.from({ length: 18 }, (_, i) => ({
  id: `P${String(i + 1).padStart(2, '0')}`,
  number: i + 1,
  terrace: i < 6 ? 1 : i < 12 ? 2 : 3,
  status: 'available' as const,
}));

function ArtFrame({ variant = 'valley', caption = "Artist's impression" }: { variant?: string; caption?: string }) {
  return (
    <figure className={`art-frame art-${variant}`}>
      <div className="art-scene" aria-hidden="true">
        <div className="mountain mountain-a" />
        <div className="mountain mountain-b" />
        <div className="hill-line" />
        <div className="villa-cluster">
          {[0,1,2,3,4].map((n) => <span key={n} className="mini-villa" style={{ left: `${18 + n * 16}%`, bottom: `${17 + (n % 2) * 5}%` }} />)}
        </div>
        <div className="sun-disc" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Section({ id, label, children, tone = 'mist', className = '' }: any) {
  return (
    <section id={id} className={`section tone-${tone} ${className}`} data-section={id}>
      <div className="section-inner">
        <div className="section-marker">{label}</div>
        {children}
      </div>
    </section>
  );
}

function Compliance({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`compliance ${compact ? 'compact' : ''}`}>
      <div className="compliance-title">MahaRERA</div>
      <div className="compliance-number">Registration details pending verification</div>
      <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noreferrer">maharera.maharashtra.gov.in</a>
    </div>
  );
}

export default function Page() {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [pool, setPool] = useState<(typeof content.pools)[number]>(content.pools[1]);
  const [submitted, setSubmitted] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [active, setActive] = useState('top');
  const [interest, setInterest] = useState('Site visit');

  useEffect(() => {
    const handler = () => {
      setNavScrolled(window.scrollY > window.innerHeight * 0.8);
      const sections = ['top', 'location', 'plan', 'villa', 'pools', 'features', 'amenities', 'developer', 'enquire'];
      let current = 'top';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const selected = useMemo(() => plots.find(p => p.id === selectedPlot) ?? null, [selectedPlot]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`site-header ${navScrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="wordmark">Avana Enclave 18<span /></a>
        <nav aria-label="Primary">
          {[
            ['location', 'Location'], ['plan', 'Master plan'], ['villa', 'The villa'], ['pools', 'Pools'], ['enquire', 'Visit']
          ].map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="header-right">
          <Compliance compact />
          <a className="button ghost" href="#enquire">Book a site visit</a>
        </div>
      </header>

      <main id="main">
        <div id="top" className="hero">
          <div className="hero-scene" aria-hidden="true"><div className="hero-mist" /><div className="hero-ridges" /><div className="hero-villas" /></div>
          <div className="hero-content">
            <div className="section-marker light">Avana Enclave 18</div>
            <h1>Eighteen villas,<br />one hillside in Karjat</h1>
            <p className="hero-lead">Private pools, 3,500 sq ft plots and the Sahyadris on three sides — ninety-five minutes from the new airport.</p>
            <div className="hero-actions"><a className="button primary" href="#enquire">Book a site visit</a><a className="button outline-light" href="#plan">See the master plan</a></div>
          </div>
          <dl className="field-notes">
            {[['Plot','3,500 sq ft'],['Built-up','2,500 sq ft'],['Configuration','G + 1 + terrace'],['Pool','Private, choose one of three']].map(([a,b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}
          </dl>
          <div className="hero-credit">Artist's impression</div>
        </div>

        <div className="measure-band" aria-label="Project facts">
          {[[18,'villas'],[2,'acres'],['3,500','sq ft plot'],['2,500','sq ft built-up'],['G + 1','plus terrace'],[1,'private pool each'],[95,'min from NMIA']].map(([v,l]) => <div key={String(l)}><strong>{v}</strong><span>{l}</span></div>)}
        </div>

        <Section id="location" label="The valley">
          <div className="split wide-gap">
            <div><h2>Karjat, where the plain runs out</h2><p className="lead">The site sits on a slope above Karjat Shindhol, in the Sahyadri foothills of Raigad. Waterfalls through the monsoon, the valley open to the west, and Karjat town's market and temple a few minutes down the road.</p>
            <div className="facts-row"><div><b>95 min</b><span>from Navi Mumbai International Airport</span></div><div><b>Sahyadri</b><span>valley setting</span></div></div></div>
            <ArtFrame variant="valley" />
          </div>
        </Section>

        <Section id="plan" label="The master plan" tone="ink" className="plan-section">
          <div className="center-copy"><h2>Eighteen plots, three terraces</h2><p className="lead">An indicative schematic of the enclave's three stepped levels.</p></div>
          <div className="master-plan-wrap">
            <svg className="master-plan" viewBox="0 0 1200 780" role="img" aria-label="Indicative master plan showing eighteen plots across three terraces">
              <path className="contour contour-1" d="M70 290 C190 230 260 270 390 220 S650 210 790 160 S1020 130 1140 105" />
              <path className="contour contour-2" d="M120 500 C270 430 380 490 540 420 S800 395 950 340 S1080 320 1160 290" />
              {plots.map((p, idx) => {
                const col = idx % 6; const row = Math.floor(idx / 6);
                const x = 100 + col * 175 + row * 35; const y = 130 + row * 210 + ((5 - col) * 4);
                return <g key={p.id} tabIndex={0} className={`plot ${selectedPlot === p.id ? 'selected' : ''}`} onClick={() => setSelectedPlot(p.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPlot(p.id); }}>
                  <rect x={x} y={y} width="150" height="120" rx="0" />
                  <text x={x + 75} y={y + 67}>{p.number}</text>
                </g>;
              })}
            </svg>
            <div className="plan-note">Indicative layout. Final plot boundaries as per the sanctioned plan.</div>
            {selected && <aside className="plot-drawer"><button className="drawer-close" onClick={() => setSelectedPlot(null)} aria-label="Close plot details">×</button><span className="drawer-kicker">Plot</span><h3>{selected.id}</h3><p>3,500 sq ft plot · Terrace {selected.terrace}</p><button className="button primary" onClick={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })}>Enquire about this plot</button></aside>}
          </div>
        </Section>

        <Section id="villa" label="The villa">
          <div className="split villa-split"><div><h2>Two and a half thousand square feet, over three levels</h2><p className="lead">A generous plot, a defined architectural envelope and your own pool — without the scale of a large township.</p><div className="spec-grid">{[['Plot area','3,500 sq ft'],['Built-up area','2,500 sq ft'],['Carpet area','1,950 sq ft'],['Configuration','Ground + first floor + terrace'],['Private pool','Choose from three'],['Parking','Dedicated, in-plot'],['Possession','9 months from booking']].map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div></div><div className="floor-placeholder"><span>Floor plans will be added after approved drawings are supplied.</span></div></div>
        </Section>

        <Section id="pools" label="Choose your pool" tone="mist-hi">
          <div className="split pool-layout"><div><h2>Choose your pool</h2><p className="lead">Every villa includes a private pool; the configuration can be chosen from three options.</p><div className="pool-drawing"><div className="plot-outline"><div className="villa-box" /><div className="pool-rect" style={{ width: `${Math.min(74, pool.ft[0] * 4.8)}px`, height: `${Math.min(150, pool.ft[1] * 5.2)}px` }} /></div></div></div><div className="pool-options" role="radiogroup" aria-label="Pool options">{content.pools.map(p => <button role="radio" aria-checked={pool.id === p.id} className={`pool-option ${pool.id === p.id ? 'chosen' : ''}`} onClick={() => setPool(p)} key={p.id}><span className="radio">{pool.id === p.id ? '●' : '○'}</span><span><b>Pool {p.id} · {p.name}</b><small>{p.ft[0]} × {p.ft[1]} ft · {p.m[0]} × {p.m[1]} m</small></span></button>)}</div></div>
        </Section>

        <Section id="features" label="Inside">
          <div className="feature-layout"><ArtFrame variant="elevation" /><div className="feature-list">{content.features.slice(1,3).map(([title,body]) => <div className="feature-item" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div><div className="wide-feature"><ArtFrame variant="garden" /><div className="wide-feature-copy"><h3>Pool options</h3><p>{content.features[3][1]}</p><a href="#pools">Choose your pool</a></div></div>
        </Section>

        <Section id="amenities" label="What the eighteen share" tone="terrace">
          <h2>What the eighteen share</h2><p className="lead">A clubhouse at the centre of the enclave, a shop you can walk to, and two acres of planting between the houses.</p><div className="amenity-grid">{content.amenities.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div><ArtFrame variant="clubhouse" />
        </Section>

        <section className="evening"><div className="evening-bg" aria-hidden="true" /><div className="evening-copy">After sunset the lamps come on along the pathways, and eighteen houses read as one small town on the hillside.</div><div className="hero-credit">Artist's impression</div></section>

        <Section id="developer" label="The developer">
          <div className="split developer-split"><div><h2>Built by Batra & Sankhe Buildcon</h2><p className="lead">Batra & Sankhe Buildcon — registered as Batra and Sons Infra Realty Developers LLP — builds residential projects across the Mumbai region. Avana Enclave 18 is its flagship hillside development.</p><a className="text-link" href="https://batralifespace.com" target="_blank" rel="noreferrer">batralifespace.com</a></div><div className="principles">{[['Clear agreements','Terms set out in writing from day one.'],['Aligned responsibilities','Defined ownership of every commitment.'],['Shared trust','Revenue upfront, and long-term accountability.']].map(([a,b])=><div key={a}><h3>{a}</h3><p>{b}</p></div>)}</div></div>
        </Section>

        <Section id="enquire" label="Come and see the slope" tone="ink">
          <div className="split enquire-grid"><div>{submitted ? <div className="success-state"><span className="success-mark">✓</span><h2>Thanks — we've got it.</h2><p>Someone from the sales team will call you within a business day.</p><div className="hero-actions"><a className="button primary" href="https://wa.me/917715039883" target="_blank" rel="noreferrer">Message us on WhatsApp</a><a className="button outline-light" href="#top">Back to the page</a></div></div> : <form className="enquiry-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><h2>Come and see the slope</h2><p className="lead">We'll arrange a site visit, walk you through the plots that are still open, and answer the questions properly. Weekends included.</p><label>Name<input required minLength={2} maxLength={60} name="name" /></label><label>Phone<input required name="phone" inputMode="tel" placeholder="+91" /></label><label>Email<input type="email" name="email" /></label><label>I'm interested in<select value={interest} onChange={e => setInterest(e.target.value)} name="interest"><option>Site visit</option><option>Buy a villa</option><option>Investment plan</option><option>Channel partner</option></select></label><label>Message<textarea name="message" maxLength={500} rows={4} /></label><label className="consent"><input type="checkbox" required />I agree that Batra & Sankhe Buildcon may contact me by phone, WhatsApp and email about Avana Enclave 18, and may store my details for that purpose.</label><button className="button primary" type="submit">Send enquiry</button></form>}</div><div className="contact-panel"><div><span className="panel-label">Call</span><a href="tel:+917715039883">+91 77150 39883</a></div><div><span className="panel-label">WhatsApp</span><a href="https://wa.me/917715039883" target="_blank" rel="noreferrer">Message the team</a></div><div><span className="panel-label">Site</span><p>Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201</p></div><Compliance /></div></div>
        </Section>
      </main>

      <footer className="footer"><div className="footer-grid"><div><a className="wordmark" href="#top">Avana Enclave 18<span /></a><p>A hillside enclave of eighteen villas in Karjat.</p></div><div><h3>Explore</h3><a href="#location">Location</a><a href="#plan">Master plan</a><a href="#villa">The villa</a><a href="#pools">Pools</a></div><div><h3>Contact</h3><a href="tel:+917715039883">+91 77150 39883</a><a href="mailto:info@batralifespace.com">info@batralifespace.com</a><a href="https://batralifespace.com" target="_blank" rel="noreferrer">batralifespace.com</a></div><div><h3>Disclosures</h3><p className="disclosure">All images are artist's impressions and do not represent the final product. Plot layouts, areas, specifications, amenities and payment terms are indicative and subject to change and to the sanctioned plans and the agreement for sale. Nothing on this page is an offer or a contract. Registration details are pending verification.</p></div></div><div className="footer-bottom"><span>© 2026 Batra and Sons Infra Realty Developers LLP</span><a href="#">Privacy notice</a><a href="#">Terms</a><Compliance compact /></div></footer>

      <div className="mobile-actions"><a href="tel:+917715039883">Call</a><a href="https://wa.me/917715039883" target="_blank" rel="noreferrer">WhatsApp</a><a href="#enquire">Book a visit</a></div>
    </>
  );
}
