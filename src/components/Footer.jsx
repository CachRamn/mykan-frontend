import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/services', label: 'Servicios' },
  { to: '/gallery', label: 'Galería' },
  { to: '/contact', label: 'Contacto' },
]

const eyebrow = { fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7FB0E6', margin: '0 0 16px' }
const linkStyle = { color: '#C5DBF5', textDecoration: 'none', fontSize: 14.5, transition: 'color .2s' }
const contactLink = { ...linkStyle, display: 'flex', alignItems: 'center', gap: 10 }

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg,#0A2A47,#082139)', color: '#fff' }}>
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 28px 40px', gap: 48 }}>
        {/* Marca */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18, textDecoration: 'none' }}>
            <span style={{ width: 42, height: 42, borderRadius: 13, background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="23" height="23" viewBox="0 0 100 100" fill="#fff" aria-hidden="true">
                <ellipse cx="50" cy="67" rx="20" ry="16" />
                <ellipse cx="26" cy="48" rx="9" ry="12" />
                <ellipse cx="74" cy="48" rx="9" ry="12" />
                <ellipse cx="38" cy="31" rx="8" ry="11" />
                <ellipse cx="62" cy="31" rx="8" ry="11" />
              </svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 21, letterSpacing: '-.5px' }}>MyKan</span>
              <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '2.5px', color: '#7FB0E6', textTransform: 'uppercase', marginTop: 3 }}>Veterinaria</span>
            </span>
          </Link>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#9FC1E8', maxWidth: 280, margin: 0 }}>
            Cuidamos a tu mascota con amor y profesionalismo en Santiago de Querétaro.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <a href="https://www.instagram.com/vet.mykan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de MyKan" className="mk-social" style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5DBF5', transition: 'background .2s' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/@vetmykan" target="_blank" rel="noopener noreferrer" aria-label="Facebook de MyKan" className="mk-social" style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5DBF5', transition: 'background .2s' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Secciones */}
        <nav aria-label="Secciones">
          <p style={eyebrow}>Secciones</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {quickLinks.map((l) => (
              <Link key={l.to} to={l.to} className="mk-footlink" style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Contacto */}
        <div>
          <p style={eyebrow}>Contacto</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            <a href="https://wa.me/524425443090" target="_blank" rel="noopener noreferrer" className="mk-footlink" style={contactLink} aria-label="WhatsApp MyKan: (442) 544 30 90">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              WhatsApp: (442) 544 30 90
            </a>
            <a href="tel:+524422179078" className="mk-footlink" style={contactLink} aria-label="Urgencias: (442) 217 90 78">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
              Urgencias: (442) 217 90 78
            </a>
            <div style={{ ...contactLink, alignItems: 'flex-start', lineHeight: 1.5 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
              C. Arquitectura 9, Industrial, Querétaro
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <p style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 28px', fontSize: 12.5, color: '#6E91BB', textAlign: 'center' }}>
          © {currentYear} MyKan Veterinaria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
