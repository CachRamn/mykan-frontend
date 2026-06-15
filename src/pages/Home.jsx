import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

/* Contador animado que arranca al entrar en pantalla */
function Counter({ to, prefix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const run = () => {
      const dur = 1500
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(to * e).toLocaleString('es-MX')
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    if (!('IntersectionObserver' in window)) { run(); return }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(el) } })
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [to])
  return (
    <span>
      {prefix && <span style={{ color: '#9BC0EA' }}>{prefix}</span>}
      <span ref={ref}>{to.toLocaleString('es-MX')}</span>
    </span>
  )
}

const iconBadge = { display: 'flex', width: 54, height: 54, borderRadius: 15, background: '#E5F0FF', color: '#1B6FD4', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }
const cardBase = { background: '#fff', border: '1px solid #EAF2FD', borderRadius: 20, padding: 28, boxShadow: '0 1px 3px rgba(10,42,71,.04)' }
const h3Style = { fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18, color: '#0A2A47', margin: '0 0 8px' }
const pCard = { fontSize: 14.5, lineHeight: 1.6, color: '#5B7081', margin: 0 }
const arrow = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>
)

const featured = [
  { name: 'Consulta general', desc: 'Evaluación completa del estado de salud con veterinarios certificados.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>) },
  { name: 'Diagnóstico por imagen', desc: 'Radiografía y ultrasonido para una visión interna precisa y rápida.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></svg>) },
  { name: 'Cirugía', desc: 'Procedimientos con los más altos estándares de seguridad y asepsia.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>) },
  { name: 'Vacunación', desc: 'Esquemas personalizados y control de parásitos internos y externos.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /></svg>) },
  { name: 'Estética y grooming', desc: 'Baño, corte y arreglo profesional para que luzca y se sienta increíble.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88" /><path d="M14.47 14.48 20 20" /><path d="M8.12 8.12 12 12" /></svg>) },
  { name: 'Urgencias 24/7', desc: 'Atención de emergencias las 24 horas del día, los 7 días de la semana.', coral: true, icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>) },
]

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', background: 'radial-gradient(1100px 600px at 78% -10%,#1B6FD4 0%,#0E4FA3 38%,#0A2A47 100%)', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -100, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(46,134,240,.55),transparent 65%)', filter: 'blur(10px)', animation: 'mkdrift 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -160, left: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,104,60,.20),transparent 68%)', animation: 'mkdrift 18s ease-in-out infinite reverse' }} />
        <svg style={{ position: 'absolute', top: 60, left: '6%', width: 60, height: 60, opacity: 0.1, animation: 'mkfloat 7s ease-in-out infinite' }} viewBox="0 0 100 100" fill="#fff"><ellipse cx="50" cy="67" rx="20" ry="16" /><ellipse cx="26" cy="48" rx="9" ry="12" /><ellipse cx="74" cy="48" rx="9" ry="12" /><ellipse cx="38" cy="31" rx="8" ry="11" /><ellipse cx="62" cy="31" rx="8" ry="11" /></svg>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]" style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '88px 28px 150px', gap: 56, alignItems: 'center' }}>
          <div>
            <Reveal style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.22)', padding: '8px 15px', borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: '.3px', backdropFilter: 'blur(4px)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5BE0A0', boxShadow: '0 0 0 4px rgba(91,224,160,.25)' }} />
              Santiago de Querétaro · Urgencias 24/7
            </Reveal>
            <Reveal as="h1" delay={90} style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(36px,6vw,56px)', lineHeight: 1.05, letterSpacing: '-1.5px', margin: '22px 0 0', textWrap: 'balance' }}>
              El cuidado que tu mascota merece
            </Reveal>
            <Reveal as="p" delay={180} style={{ fontSize: 19, lineHeight: 1.6, color: '#C5DBF5', margin: '22px 0 0', maxWidth: 480 }}>
              Atención veterinaria integral, cálida y profesional. Un equipo certificado que trata a tu compañero como parte de la familia.
            </Reveal>
            <Reveal delay={270} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
              <Link to="/contact" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: '#0E4FA3', fontWeight: 700, fontSize: 16, padding: '15px 28px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 14px 30px rgba(4,20,40,.28)' }}>
                Agendar consulta {arrow}
              </Link>
              <Link to="/services" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: '1.5px solid rgba(255,255,255,.4)', color: '#fff', fontWeight: 700, fontSize: 16, padding: '15px 26px', borderRadius: 13, textDecoration: 'none' }}>
                Conocer servicios
              </Link>
            </Reveal>
          </div>

          <Reveal delay={200} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: 26, overflow: 'hidden', boxShadow: '0 30px 70px rgba(4,20,40,.4)', border: '1px solid rgba(255,255,255,.18)', aspectRatio: '4 / 5', background: 'repeating-linear-gradient(135deg,#1f5fae,#1f5fae 14px,#235fa6 14px,#235fa6 28px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.82)' }}>
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                <span style={{ fontFamily: "'Sora',monospace", fontSize: 12, letterSpacing: '1px', display: 'block' }}>FOTO · Veterinaria con<br />mascota feliz</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: -26, background: '#fff', color: '#0A2A47', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 16px 34px rgba(4,20,40,.24)', animation: 'mkfloat 6s ease-in-out infinite' }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: '#E5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B6FD4' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /></svg>
              </span>
              <div style={{ lineHeight: 1.2 }}><div style={{ fontWeight: 800, fontSize: 15 }}>+8,000</div><div style={{ fontSize: 12, color: '#5B7081' }}>mascotas felices</div></div>
            </div>
            <div style={{ position: 'absolute', top: 20, right: -22, background: '#F2683C', color: '#fff', borderRadius: 14, padding: '11px 16px', fontWeight: 700, fontSize: 14, boxShadow: '0 14px 30px rgba(242,104,60,.4)', animation: 'mkfloat 7.5s ease-in-out infinite 1s', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'mkpulse 1.6s ease-in-out infinite' }} />
              Urgencias 24/7
            </div>
          </Reveal>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: 'linear-gradient(to top,#F4F9FF,transparent)' }} />
      </section>

      {/* ===== BANDA DE CONFIANZA ===== */}
      <section style={{ maxWidth: 1100, margin: '-86px auto 0', padding: '0 28px', position: 'relative', zIndex: 5 }}>
        <Reveal className="grid grid-cols-2 md:grid-cols-4" style={{ background: '#fff', borderRadius: 22, boxShadow: '0 22px 50px rgba(10,42,71,.10)', border: '1px solid #EAF2FD', overflow: 'hidden' }}>
          {[
            { value: <Counter to={12} prefix="+" />, label: 'Años de experiencia', color: '#1B6FD4' },
            { value: <Counter to={8000} prefix="+" />, label: 'Mascotas atendidas', color: '#1B6FD4' },
            { value: '24/7', label: 'Atención de urgencias', color: '#F2683C' },
            { value: '4.9', label: 'Satisfacción de clientes', color: '#1B6FD4', star: true },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '30px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #EEF4FC' : 'none' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 36, color: s.color, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                {s.value}
                {s.star && <svg width="24" height="24" viewBox="0 0 24 24" fill="#F2683C" style={{ marginTop: -2 }}><path d="m12 2 2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" /></svg>}
              </div>
              <div style={{ fontSize: 13.5, color: '#5B7081', fontWeight: 600, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== SERVICIOS DESTACADOS ===== */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '90px 28px 0' }}>
        <Reveal style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 46px' }}>
          <span style={{ color: '#1B6FD4', fontWeight: 700, fontSize: 13, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Nuestros servicios</span>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(30px,4.5vw,40px)', lineHeight: 1.1, letterSpacing: '-1.2px', color: '#0A2A47', margin: '14px 0 0', textWrap: 'balance' }}>Atención integral en cada etapa de su vida</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B7081', margin: '18px 0 0' }}>Equipo certificado, tecnología de última generación y un trato cercano.</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
          {featured.map((s, i) => (
            <Reveal
              as="article"
              key={s.name}
              delay={(i % 3) * 70}
              className={s.coral ? 'mk-card-coral' : 'mk-card'}
              style={s.coral
                ? { ...cardBase, background: 'linear-gradient(160deg,#FFF3EE,#FFFFFF)', border: '1px solid #F8D6C6' }
                : cardBase}
            >
              <span style={s.coral ? { ...iconBadge, background: '#FDE5DA', color: '#F2683C', position: 'relative' } : iconBadge}>
                {s.coral && <span style={{ position: 'absolute', top: -3, right: -3, width: 11, height: 11, borderRadius: '50%', background: '#F2683C', border: '2px solid #fff', animation: 'mkpulse 1.6s ease-in-out infinite' }} />}
                {s.icon}
              </span>
              <h3 style={h3Style}>{s.name}</h3>
              <p style={pCard}>{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Link to="/services" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', color: '#fff', fontWeight: 700, fontSize: 15.5, padding: '14px 28px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 12px 26px rgba(27,111,212,.30)' }}>
            Ver todos los servicios {arrow}
          </Link>
        </Reveal>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section style={{ background: '#fff', borderTop: '1px solid #EAF2FD', borderBottom: '1px solid #EAF2FD', marginTop: 90 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]" style={{ maxWidth: 1180, margin: '0 auto', padding: '90px 28px', gap: 64, alignItems: 'center' }}>
          <Reveal style={{ position: 'relative' }}>
            <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '5 / 6', background: 'repeating-linear-gradient(135deg,#E5F0FF,#E5F0FF 14px,#DCE9FB 14px,#DCE9FB 28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #DCE9FB' }}>
              <div style={{ textAlign: 'center', color: '#7C9CC0' }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                <span style={{ fontFamily: "'Sora',monospace", fontSize: 12, letterSpacing: '1px' }}>FOTO · Equipo MyKan<br />en la clínica</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: -22, right: -18, background: '#0A2A47', color: '#fff', borderRadius: 18, padding: '18px 22px', boxShadow: '0 18px 36px rgba(10,42,71,.28)', maxWidth: 200 }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>Trato humano y cercano</div>
              <div style={{ fontSize: 12.5, color: '#9FC1E8', marginTop: 5, lineHeight: 1.4 }}>Tu mascota es parte de nuestra familia.</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span style={{ color: '#1B6FD4', fontWeight: 700, fontSize: 13, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Por qué elegirnos</span>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,38px)', lineHeight: 1.12, letterSpacing: '-1px', color: '#0A2A47', margin: '14px 0 0', textWrap: 'balance' }}>Profesionalismo y cariño en cada visita</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: '#5B7081', margin: '18px 0 30px' }}>Combinamos medicina veterinaria de calidad con un trato cálido, para que tú y tu mascota se sientan en confianza desde el primer momento.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { t: 'Veterinarios certificados', d: 'Profesionales con formación continua y verdadera vocación.', coral: false, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></svg>) },
                { t: 'Tecnología de última generación', d: 'Diagnósticos precisos con equipo moderno de imagen y laboratorio.', coral: false, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>) },
                { t: 'Disponibles 24/7', d: 'Urgencias atendidas todos los días del año, a cualquier hora.', coral: true, icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>) },
              ].map((f) => (
                <div key={f.t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, background: f.coral ? '#FDE5DA' : '#E5F0FF', color: f.coral ? '#F2683C' : '#1B6FD4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16.5, color: '#0A2A47' }}>{f.t}</div>
                    <div style={{ fontSize: 14.5, color: '#5B7081', lineHeight: 1.55, marginTop: 3 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 32, background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', color: '#fff', fontWeight: 700, fontSize: 15.5, padding: '14px 26px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 12px 26px rgba(27,111,212,.30)' }}>
              Agenda tu visita {arrow}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA URGENCIAS ===== */}
      <section style={{ maxWidth: 1180, margin: '90px auto 0', padding: '0 28px 100px' }}>
        <Reveal style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', background: 'radial-gradient(800px 400px at 85% 0%,#1B6FD4,#0E4FA3 45%,#0A2A47 100%)', padding: '60px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', boxShadow: '0 24px 56px rgba(10,42,71,.26)' }}>
          <div style={{ position: 'absolute', top: -80, right: -40, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,104,60,.28),transparent 65%)', animation: 'mkdrift 16s ease-in-out infinite' }} />
          <div style={{ position: 'relative', maxWidth: 540 }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.5vw,34px)', lineHeight: 1.15, letterSpacing: '-.8px', color: '#fff', margin: 0 }}>¿Tu mascota necesita atención ahora?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#C5DBF5', margin: '14px 0 0' }}>Escríbenos por WhatsApp. Estamos disponibles las 24 horas, los 7 días de la semana.</p>
          </div>
          <a href="https://wa.me/524425443090" target="_blank" rel="noopener noreferrer" className="mk-lift" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 11, background: '#F2683C', color: '#fff', fontWeight: 700, fontSize: 16.5, padding: '17px 30px', borderRadius: 14, textDecoration: 'none', boxShadow: '0 14px 30px rgba(242,104,60,.4)', whiteSpace: 'nowrap' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Escribir por WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  )
}
