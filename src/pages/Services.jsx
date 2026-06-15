import Reveal from '../components/Reveal.jsx'

const iconBadge = { display: 'flex', width: 54, height: 54, borderRadius: 15, background: '#E5F0FF', color: '#1B6FD4', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }
const cardBase = { background: '#fff', border: '1px solid #EAF2FD', borderRadius: 20, padding: 28, boxShadow: '0 1px 3px rgba(10,42,71,.04)' }
const h3Style = { fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18, color: '#0A2A47', margin: '0 0 8px' }
const pCard = { fontSize: 14.5, lineHeight: 1.6, color: '#5B7081', margin: 0 }

const services = [
  { name: 'Consulta general', desc: 'Evaluación completa del estado de salud con veterinarios certificados.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>) },
  { name: 'Diagnóstico', desc: 'Identificamos la causa de los síntomas con equipos de última generación.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></svg>) },
  { name: 'Cirugía', desc: 'Procedimientos quirúrgicos con los más altos estándares de seguridad.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>) },
  { name: 'Venta de accesorios', desc: 'Collares, correas, juguetes y más para el bienestar y diversión.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>) },
  { name: 'Venta de alimento', desc: 'Alimentos balanceados de las mejores marcas para cada etapa de vida.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0Z" /><path d="M7 11a5 5 0 0 1 10 0" /><path d="M12 3v3" /></svg>) },
  { name: 'Vacunación y desparasitación', desc: 'Esquemas personalizados y control de parásitos internos y externos.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /></svg>) },
  { name: 'Estética y grooming', desc: 'Baño, corte y arreglo profesional para que luzca y se sienta increíble.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88" /><path d="M14.47 14.48 20 20" /><path d="M8.12 8.12 12 12" /></svg>) },
  { name: 'Hospitalización', desc: 'Área equipada para una recuperación segura y monitoreada las 24 horas.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v5" /></svg>) },
  { name: 'Urgencias 24/7', desc: 'Atención de emergencias las 24 horas del día, los 7 días de la semana.', coral: true, icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>) },
  { name: 'Laboratorio clínico', desc: 'Análisis de sangre, orina y más para diagnósticos precisos y rápidos.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2v17.5a2.5 2.5 0 0 1-5 0V2" /><path d="M8.5 2h7" /><path d="M14.5 16h-5" /></svg>) },
  { name: 'Odontología veterinaria', desc: 'Limpieza dental, extracciones y cuidado de la salud bucal.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></svg>) },
  { name: 'Radiología e imagen', desc: 'Radiografías y ultrasonido para una visión interna completa.', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.2" /><path d="M12 18.8V21" /><path d="M3 12h2.2" /><path d="M18.8 12H21" /><path d="m5.6 5.6 1.6 1.6" /><path d="m16.8 16.8 1.6 1.6" /><path d="m18.4 5.6-1.6 1.6" /><path d="m7.2 16.8-1.6 1.6" /></svg>) },
]

export default function Services() {
  return (
    <div style={{ background: '#F4F9FF' }}>
      {/* ===== Cabecera ===== */}
      <section style={{ position: 'relative', background: 'radial-gradient(900px 500px at 80% -20%,#1B6FD4,#0E4FA3 45%,#0A2A47 100%)', color: '#fff', overflow: 'hidden', padding: '64px 28px 76px', textAlign: 'center' }}>
        <svg style={{ position: 'absolute', top: 30, right: '8%', width: 54, height: 54, opacity: 0.1, animation: 'mkfloat 8s ease-in-out infinite' }} viewBox="0 0 100 100" fill="#fff"><ellipse cx="50" cy="67" rx="20" ry="16" /><ellipse cx="26" cy="48" rx="9" ry="12" /><ellipse cx="74" cy="48" rx="9" ry="12" /><ellipse cx="38" cy="31" rx="8" ry="11" /><ellipse cx="62" cy="31" rx="8" ry="11" /></svg>
        <Reveal style={{ position: 'relative' }}>
          <span style={{ color: '#9FC9FF', fontWeight: 700, fontSize: 12.5, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Inicio · Servicios</span>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(34px,5vw,46px)', lineHeight: 1.08, letterSpacing: '-1.3px', margin: '12px 0 0' }}>Nuestros servicios</h1>
          <p style={{ fontSize: 18, color: '#C5DBF5', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.55 }}>Atención veterinaria integral para el bienestar de tu mascota en cada etapa de su vida.</p>
        </Reveal>
      </section>

      {/* ===== Grid de servicios ===== */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 28px 20px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.name}
              delay={(i % 3) * 60}
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
      </section>

      {/* ===== CTA ===== */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 28px 100px' }}>
        <Reveal style={{ background: '#fff', border: '1px solid #EAF2FD', borderRadius: 22, padding: 40, textAlign: 'center', boxShadow: '0 12px 34px rgba(10,42,71,.06)' }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 24, color: '#0A2A47', margin: 0 }}>¿Tienes dudas sobre algún servicio?</h3>
          <p style={{ fontSize: 16, color: '#5B7081', margin: '12px 0 24px' }}>Contáctanos directamente y con gusto te orientamos.</p>
          <a href="https://wa.me/524425443090" target="_blank" rel="noopener noreferrer" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#F2683C', color: '#fff', fontWeight: 700, fontSize: 16, padding: '15px 28px', borderRadius: 13, textDecoration: 'none', boxShadow: '0 12px 26px rgba(242,104,60,.34)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Consultar por WhatsApp
          </a>
        </Reveal>
      </section>
    </div>
  )
}
