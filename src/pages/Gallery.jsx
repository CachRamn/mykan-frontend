import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'

const categories = ['Servicios', 'Clientes', 'Accesorios']

const images = {
  Servicios: [
    'Consulta general', 'Diagnóstico por imagen', 'Sala de cirugía',
    'Laboratorio clínico', 'Estética y grooming', 'Vacunación',
  ],
  Clientes: [
    'Firulais y su familia', 'Michi en consulta', 'Mascota recuperada',
    'Cita de control', 'Alta hospitalaria', 'Listo tras el grooming',
  ],
  Accesorios: [
    'Collares y placas', 'Juguetes', 'Alimento premium',
    'Correas y arneses', 'Camas de descanso', 'Ropa para mascotas',
  ],
}

const PhotoIcon = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Servicios')
  const [lightbox, setLightbox] = useState(null)

  return (
    <div style={{ background: '#F4F9FF' }}>
      {/* ===== Cabecera ===== */}
      <section style={{ position: 'relative', background: 'radial-gradient(900px 500px at 80% -20%,#1B6FD4,#0E4FA3 45%,#0A2A47 100%)', color: '#fff', overflow: 'hidden', padding: '64px 28px 76px', textAlign: 'center' }}>
        <svg style={{ position: 'absolute', top: 30, right: '8%', width: 54, height: 54, opacity: 0.1, animation: 'mkfloat 8s ease-in-out infinite' }} viewBox="0 0 100 100" fill="#fff"><ellipse cx="50" cy="67" rx="20" ry="16" /><ellipse cx="26" cy="48" rx="9" ry="12" /><ellipse cx="74" cy="48" rx="9" ry="12" /><ellipse cx="38" cy="31" rx="8" ry="11" /><ellipse cx="62" cy="31" rx="8" ry="11" /></svg>
        <Reveal style={{ position: 'relative' }}>
          <span style={{ color: '#9FC9FF', fontWeight: 700, fontSize: 12.5, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Inicio · Galería</span>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(34px,5vw,46px)', lineHeight: 1.08, letterSpacing: '-1.3px', margin: '12px 0 0' }}>Galería</h1>
          <p style={{ fontSize: 18, color: '#C5DBF5', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.55 }}>Momentos especiales de nuestras mascotas y el equipo MyKan.</p>
        </Reveal>
      </section>

      {/* ===== Filtros + grid ===== */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 28px 100px' }}>
        <div role="group" aria-label="Filtrar galería" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 34 }}>
          {categories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                style={{
                  padding: '11px 24px',
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: 14.5,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all .25s ease',
                  ...(active
                    ? { background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', color: '#fff', border: '1.5px solid transparent', boxShadow: '0 10px 22px rgba(27,111,212,.28)' }
                    : { background: '#fff', color: '#5B7081', border: '1.5px solid #DBE6F2' }),
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
          {images[activeCategory].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setLightbox(label)}
              aria-label={`Ver imagen ampliada: ${label}`}
              style={{ position: 'relative', border: '1px solid #DCE9FB', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', padding: 0, background: '#E5F0FF', aspectRatio: '4 / 3', display: 'block', width: '100%', animation: 'mkfade .5s ease both' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,#E9F2FE,#E9F2FE 12px,#DCE9FB 12px,#DCE9FB 24px)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6E91BB' }}>
                <PhotoIcon />
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px', background: 'linear-gradient(to top,rgba(10,42,71,.78),transparent)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 13.5, textAlign: 'left' }}>{label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox}
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(8,22,40,.82)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div style={{ position: 'relative', maxWidth: 720, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ aspectRatio: '4 / 3', borderRadius: 20, overflow: 'hidden', background: 'repeating-linear-gradient(135deg,#E9F2FE,#E9F2FE 16px,#DCE9FB 16px,#DCE9FB 32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: '#6E91BB', boxShadow: '0 30px 80px rgba(0,0,0,.5)' }}>
              <PhotoIcon size={52} />
              <span style={{ fontFamily: "'Sora',monospace", fontSize: 13, letterSpacing: '1px' }}>{lightbox}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar imagen"
              style={{ position: 'absolute', top: -16, right: -16, width: 42, height: 42, borderRadius: '50%', background: '#fff', color: '#0A2A47', border: 'none', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,.3)' }}
            >
              ×
            </button>
            <p style={{ textAlign: 'center', color: '#C5DBF5', fontSize: 14, marginTop: 16 }}>{lightbox}</p>
          </div>
        </div>
      )}
    </div>
  )
}
