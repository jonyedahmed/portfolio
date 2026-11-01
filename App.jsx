import {
  PROFILE,
  CONTACT,
  STATS,
  EXPERIENCE,
  WORK,
  SKILL_GROUPS,
  TOOLS_BUILT,
  CERTIFICATIONS,
} from "./data.js";

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function contactLinks() {
  const links = [];
  if (CONTACT.email) links.push({ label: "Email", href: `mailto:${CONTACT.email}` });
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
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand">
            Jonayed Ahmed
          </a>
          <nav aria-label="Primary">
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#tools">Tools</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <p className="badge">
              <span className="dot" aria-hidden="true" /> {PROFILE.availability}
            </p>
            <h1>
              {PROFILE.name}
              <span className="h1-sub">{PROFILE.title}</span>
            </h1>
            <p className="headline">{PROFILE.headline}</p>
            <p className="intro">{PROFILE.intro}</p>
            <div className="cta-row">
              <a className="btn primary" href="#work">
                See my work
              </a>
              <a className="btn" href={primary ? primary.href : "#contact"}>
                {primary ? `Contact via ${primary.label}` : "Get in touch"}
              </a>
            </div>
            <p className="loc">{PROFILE.location}</p>
          </div>
        </section>

        <section className="stats" aria-label="Highlights">
          <div className="wrap stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <Section id="experience" kicker="Career" title="Experience">
          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <article key={job.company} className="job">
                <div className="job-head">
                  <h3>
                    {job.role} <span className="at">at {job.company}</span>
                  </h3>
                  <span className="period">{job.period}</span>
                </div>
                <p className="job-summary">{job.summary}</p>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="work" kicker="Selected projects" title="Work">
          <div className="grid two">
            {WORK.map((w) => (
              <article key={w.title} className="card">
                <p className="tag">{w.tag}</p>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <p className="card-meta">{w.meta}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" kicker="What I use" title="Skills and tools">
          <div className="grid four">
            {SKILL_GROUPS.map((g) => (
              <div key={g.name} className="skill-group">
                <h3>{g.name}</h3>
                <ul className="chips">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="sub">Certifications</h3>
          <ul className="certs">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.issuer}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="tools" kicker="Side builds" title="Tools I've built">
          <div className="grid two">
            {TOOLS_BUILT.map((t) => (
              <article key={t.title} className="card">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" kicker="Let's talk" title="Contact">
          <p className="intro">
            Looking for help with technical SEO, e-commerce content or reporting? Reach out and
            tell me about your site.
          </p>
          {links.length > 0 && (
            <div className="cta-row">
              {links.map((l, i) => (
                <a
                  key={l.label}
                  className={i === 0 ? "btn primary" : "btn"}
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </Section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>© 2026 {PROFILE.name}. {PROFILE.location}.</p>
        </div>
      </footer>
    </>
  );
}
