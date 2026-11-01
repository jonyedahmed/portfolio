import {
  PROFILE, CONTACT, STATS, EXPERIENCE, WORK, SKILL_GROUPS, TOOLS_BUILT, CERTIFICATIONS,
} from "./data.js";

function Section({ id, kicker, title, description, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function contactLinks() {
  const links = [];
  if (CONTACT.email) links.push({ label: "Email me", href: `mailto:${CONTACT.email}` });
  if (CONTACT.linkedin) links.push({ label: "LinkedIn", href: CONTACT.linkedin });
  if (CONTACT.whatsapp) links.push({ label: "WhatsApp", href: CONTACT.whatsapp });
  if (CONTACT.github) links.push({ label: "GitHub", href: CONTACT.github });
  return links;
}

export default function App() {
  const links = contactLinks();
  const primary = links[0];

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Jonayed Ahmed home">
            <span className="brand-mark">JA</span>
            <span>JONAYED<span className="brand-dot">.</span></span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">Selected work</a>
            <a href="#experience">Experience</a>
            <a href="#expertise">Expertise</a>
            <a href="#contact" className="nav-contact">Let's talk <Arrow /></a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="availability"><span className="pulse" /> {PROFILE.availability}</div>
              <p className="hero-kicker">SEO · E-COMMERCE · DIGITAL GROWTH</p>
              <h1>Making search<br /><span>work smarter.</span></h1>
              <p className="hero-name">{PROFILE.name} <span>— {PROFILE.title}</span></p>
              <p className="hero-intro">{PROFILE.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore my work <Arrow /></a>
                <a className="button button-quiet" href="#contact">Get in touch <Arrow /></a>
              </div>
              <div className="hero-location"><span className="location-dot" /> {PROFILE.location}</div>
            </div>

            <div className="hero-visual" aria-label="SEO strategy visual">
              <div className="visual-topline"><span>GROWTH FRAMEWORK</span><span>01 / 04</span></div>
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-inner" />
              <div className="visual-core">
                <span className="core-icon">↗</span>
                <strong>SEO</strong>
                <small>BUILT AROUND INTENT</small>
              </div>
              <div className="float-card card-search"><span className="mini-icon">⌕</span><div><small>DISCOVER</small><b>Search visibility</b></div></div>
              <div className="float-card card-content"><span className="mini-icon">✳</span><div><small>OPTIMIZE</small><b>Useful content</b></div></div>
              <div className="float-card card-growth"><span className="mini-icon">↗</span><div><small>MEASURE</small><b>Organic growth</b></div></div>
              <div className="visual-foot"><span>RESEARCH</span><i /><span>OPTIMIZE</span><i /><span>IMPROVE</span></div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span>FOCUSED ON PRACTICAL SEO</span>
            <span>TECHNICAL · ON-PAGE · CONTENT · ANALYTICS</span>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Professional highlights">
          <div className="container metrics-grid">
            {STATS.map((item, index) => (
              <div className="metric" key={item.label}>
                <span className="metric-index">0{index + 1}</span>
                <div><strong>{item.value}</strong><span>{item.label}</span></div>
              </div>
            ))}
          </div>
        </section>

        <Section id="about" kicker="A little about me" title="Turning search insights into useful action."
          description="I work across the details that help a website become easier to discover, understand and choose.">
          <div className="about-grid">
            <div className="about-statement">
              <span className="big-quote">“</span>
              <p>{PROFILE.headline}</p>
              <div className="about-rule" />
              <span className="about-caption">MY APPROACH</span>
              <p className="about-small">Understand the search intent. Find the opportunity. Improve the experience. Measure what changes.</p>
            </div>
            <div className="about-details">
              <div className="detail-row"><span>01 / RESEARCH</span><p>Keyword research, search intent mapping and competitor gap analysis.</p></div>
              <div className="detail-row"><span>02 / OPTIMIZATION</span><p>Technical checks, on-page improvements and structured e-commerce content.</p></div>
              <div className="detail-row"><span>03 / MEASUREMENT</span><p>Google Search Console, GA4 and clear reporting to guide the next action.</p></div>
            </div>
          </div>
        </Section>

        <Section id="work" kicker="Selected work" title="Work that shows the process."
          description="A selection of SEO, content and reporting projects. Open a case study to explore the supporting work and documentation.">
          <div className="work-grid">
            {WORK.map((item, index) => (
              <article className={`work-card work-card-${index + 1}`} key={item.title}>
                <div className="work-card-top">
                  <span className="work-number">0{index + 1}</span>
                  <span className="work-type">{item.tag}</span>
                </div>
                <div className="work-art" aria-hidden="true">
                  <div className="art-window">
                    <div className="art-window-bar"><i /><i /><i /><span>{item.meta}</span></div>
                    <div className="art-lines"><b /><i /><i /><i /></div>
                    <div className="art-chart"><span /><span /><span /><span /><span /><span /><span /></div>
                  </div>
                  <span className="art-orbit" />
                </div>
                <div className="work-card-content">
                  <p className="work-client">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <p className="work-description">{item.text}</p>
                  <div className="work-footer">
                    <span>{item.deliverable || "SEO case study"}</span>
                    {item.googleDriveUrl ? (
                      <a className="text-link" href={item.googleDriveUrl} target="_blank" rel="noopener noreferrer">View case study <Arrow /></a>
                    ) : (
                      <span className="link-pending">Case study link to be added</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="work-note"><span>↗</span> Project documents can be shared through Google Drive. Links will open in a new tab.</p>
        </Section>

        <Section id="experience" kicker="Career path" title="Experience & contribution">
          <div className="experience-list">
            {EXPERIENCE.map((job, index) => (
              <article className="experience-item" key={job.company}>
                <div className="experience-side"><span>0{index + 1}</span><i /></div>
                <div className="experience-main">
                  <div className="experience-heading">
                    <div><h3>{job.role}</h3><p>{job.company}</p></div>
                    <span className="experience-period">{job.period}</span>
                  </div>
                  <p className="experience-summary">{job.summary}</p>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="expertise" kicker="What I bring" title="A practical SEO toolkit."
          description="A mix of strategy, execution and measurement for e-commerce and service websites.">
          <div className="expertise-grid">
            {SKILL_GROUPS.map((group, index) => (
              <article className="expertise-card" key={group.name}>
                <span className="expertise-index">0{index + 1}</span>
                <h3>{group.name}</h3>
                <div className="chip-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="certification-block">
            <div><p className="eyebrow">LEARNING & CERTIFICATIONS</p><h3>Always improving the craft.</h3></div>
            <div className="certification-list">
              {CERTIFICATIONS.map((cert) => <div className="certification" key={cert.name}><span className="cert-check">✓</span><div><strong>{cert.name}</strong><small>{cert.issuer}</small></div></div>)}
            </div>
          </div>
        </Section>

        <Section id="tools" kicker="Beyond client work" title="Small tools, useful workflows."
          description="Lightweight tools built to make everyday content and SEO tasks more efficient.">
          <div className="tools-grid">
            {TOOLS_BUILT.map((tool, index) => (
              <article className="tool-card" key={tool.title}>
                <span className="tool-index">TOOL / 0{index + 1}</span>
                <div className="tool-symbol">{["✳", "⌘", "⇄", "↳"][index % 4]}</div>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <section id="contact" className="contact-section">
          <div className="container contact-panel">
            <div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let's make your<br /><span>next move count.</span></h2>
              <p>Looking for help with technical SEO, e-commerce content or reporting? Tell me what you are working on.</p>
            </div>
            <div className="contact-actions">
              {links.length > 0 ? links.map((link, index) => (
                <a className={index === 0 ? "button button-primary" : "button button-light"} key={link.label} href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label} <Arrow /></a>
              )) : <a className="button button-primary" href="#home">Back to top <Arrow /></a>}
              <span className="contact-location">{PROFILE.location}</span>
            </div>
            <div className="contact-watermark">JA</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#home" className="footer-brand">JONAYED<span>.</span></a>
          <p>© {new Date().getFullYear()} {PROFILE.name}. Built with purpose.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
