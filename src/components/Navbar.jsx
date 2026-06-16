import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/services', label: 'Servicios' },
  { to: '/gallery', label: 'Galería' },
  { to: '/contact', label: 'Contacto' },
]

const PawLogo = () => (
  <span
    style={{
      width: 42,
      height: 42,
      borderRadius: 13,
      background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 18px rgba(27,111,212,.32)',
    }}
  >
    <svg width="23" height="23" viewBox="0 0 100 100" fill="#fff" aria-hidden="true">
      <ellipse cx="50" cy="67" rx="20" ry="16" />
      <ellipse cx="26" cy="48" rx="9" ry="12" />
      <ellipse cx="74" cy="48" rx="9" ry="12" />
      <ellipse cx="38" cy="31" rx="8" ry="11" />
      <ellipse cx="62" cy="31" rx="8" ry="11" />
    </svg>
  </span>
)

const Wordmark = () => (
  <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
    <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 21, color: '#0A2A47', letterSpacing: '-.5px' }}>
      MyKan
    </span>
    <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '2.5px', color: '#1B6FD4', textTransform: 'uppercase', marginTop: 3 }}>
      Veterinaria
    </span>
  </span>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: scrolled ? 'rgba(255,255,255,.92)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 6px 26px rgba(10,42,71,.10)' : 'none',
        borderBottom: `1px solid ${scrolled ? '#EAF2FD' : 'transparent'}`,
        transition: 'box-shadow .3s ease, background .3s ease, border-color .3s ease',
      }}
    >
      <nav
        aria-label="Navegación principal"
        style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', height: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
      >
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }} aria-label="MyKan Veterinaria — Inicio">
          <PawLogo />
          <Wordmark />
        </NavLink>

        {/* Links escritorio */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 34 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className="mk-navlink"
              style={({ isActive }) => ({
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                color: isActive ? '#1B6FD4' : '#3A5168',
                transition: 'color .2s',
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="mk-lift"
            style={{ fontSize: 15, fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', padding: '11px 22px', borderRadius: 11, boxShadow: '0 8px 20px rgba(27,111,212,.30)' }}
          >
            Agendar consulta
          </NavLink>
        </div>

        {/* Botón móvil */}
        <button
          type="button"
          className="flex md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ flexDirection: 'column', gap: 5, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', background: '#F2F8FF', border: '1px solid #DBE6F2', borderRadius: 12, cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: 20, height: 2, background: '#0A2A47', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 20, height: 2, background: '#0A2A47', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 20, height: 2, background: '#0A2A47', borderRadius: 2 }} />
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden" style={{ borderTop: '1px solid #E5F0FF', background: '#fff', padding: '10px 20px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: '13px 14px',
                borderRadius: 11,
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                color: isActive ? '#1B6FD4' : '#3A5168',
                background: isActive ? '#EAF2FD' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            style={{ marginTop: 6, textAlign: 'center', padding: 14, borderRadius: 11, fontWeight: 700, fontSize: 16, color: '#fff', textDecoration: 'none', background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)' }}
          >
            Agendar consulta
          </NavLink>
        </div>
      )}
    </header>
  )
}
