import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'

const scheduleRows = [
  { day: 'Lun — Vie', hours: '9:00–15:00 y 16:00–21:00', urgent: false },
  { day: 'Sábados', hours: '9:00–15:00 y 16:00–17:00', urgent: false },
  { day: 'Urgencias', hours: '24/7 los 7 días', urgent: true },
]

const labelStyle = { fontSize: 14, fontWeight: 600, color: '#0A2A47' }
const fieldBase = { borderRadius: 12, padding: '13px 15px', fontSize: 15, fontFamily: 'inherit', color: '#14283D', outline: 'none', transition: 'border-color .2s, background .2s' }
const eyebrowSm = { fontSize: 11, fontWeight: 600, color: '#9AAEC2', textTransform: 'uppercase', letterSpacing: '.6px' }
const cardLink = { background: '#fff', border: '1px solid #EAF2FD', borderRadius: 16, padding: 18, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10 }
const badge = (bg, color) => ({ width: 40, height: 40, borderRadius: 11, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' })

export default function Contact() {
  const [form, setForm] = useState({ ownerName: '', petName: '', phone: '', description: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.ownerName.trim()) e.ownerName = 'Por favor ingresa tu nombre.'
    if (!form.petName.trim()) e.petName = 'Ingresa el nombre de tu mascota.'
    if (!form.phone.trim()) e.phone = 'Ingresa tu número de teléfono.'
    if (!form.description.trim()) e.description = 'Cuéntanos tu consulta.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }
    const message = `Hola MyKan, soy ${form.ownerName}. Mi mascota se llama ${form.petName}. Mi teléfono es ${form.phone}. Consulta: ${form.description}`
    window.open(`https://wa.me/524425443090?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const fieldStyle = (key) => ({
    ...fieldBase,
    border: errors[key] ? '1.5px solid #E1473D' : '1.5px solid #DBE6F2',
    background: errors[key] ? '#FEF2F1' : '#fff',
  })

  return (
    <div style={{ background: '#F4F9FF' }}>
      {/* ===== Cabecera ===== */}
      <section style={{ position: 'relative', background: 'radial-gradient(900px 500px at 80% -20%,#1B6FD4,#0E4FA3 45%,#0A2A47 100%)', color: '#fff', overflow: 'hidden', padding: '64px 28px 76px', textAlign: 'center' }}>
        <svg style={{ position: 'absolute', top: 30, right: '8%', width: 54, height: 54, opacity: 0.1, animation: 'mkfloat 8s ease-in-out infinite' }} viewBox="0 0 100 100" fill="#fff"><ellipse cx="50" cy="67" rx="20" ry="16" /><ellipse cx="26" cy="48" rx="9" ry="12" /><ellipse cx="74" cy="48" rx="9" ry="12" /><ellipse cx="38" cy="31" rx="8" ry="11" /><ellipse cx="62" cy="31" rx="8" ry="11" /></svg>
        <Reveal style={{ position: 'relative' }}>
          <span style={{ color: '#9FC9FF', fontWeight: 700, fontSize: 12.5, letterSpacing: '2.5px', textTransform: 'uppercase' }}>Inicio · Contacto</span>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(34px,5vw,46px)', lineHeight: 1.08, letterSpacing: '-1.3px', margin: '12px 0 0' }}>Contacto</h1>
          <p style={{ fontSize: 18, color: '#C5DBF5', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.55 }}>Llena el formulario y te respondemos por WhatsApp a la brevedad.</p>
        </Reveal>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 28px 100px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 32, alignItems: 'start' }}>
          {/* ===== Formulario ===== */}
          <Reveal as="form" onSubmit={handleSubmit} noValidate style={{ background: '#fff', border: '1px solid #EAF2FD', borderRadius: 22, padding: 34, boxShadow: '0 12px 34px rgba(10,42,71,.07)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label htmlFor="ownerName" style={labelStyle}>Nombre del dueño <span style={{ color: '#F2683C' }}>*</span></label>
              <input id="ownerName" name="ownerName" type="text" autoComplete="name" value={form.ownerName} onChange={handleChange} placeholder="Tu nombre completo" style={fieldStyle('ownerName')} />
              {errors.ownerName && <span role="alert" style={{ color: '#E1473D', fontSize: 12.5 }}>{errors.ownerName}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label htmlFor="petName" style={labelStyle}>Nombre de la mascota <span style={{ color: '#F2683C' }}>*</span></label>
              <input id="petName" name="petName" type="text" value={form.petName} onChange={handleChange} placeholder="Nombre de tu mascota" style={fieldStyle('petName')} />
              {errors.petName && <span role="alert" style={{ color: '#E1473D', fontSize: 12.5 }}>{errors.petName}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label htmlFor="phone" style={labelStyle}>Número de teléfono <span style={{ color: '#F2683C' }}>*</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(442) 000 00 00" style={fieldStyle('phone')} />
              {errors.phone && <span role="alert" style={{ color: '#E1473D', fontSize: 12.5 }}>{errors.phone}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label htmlFor="description" style={labelStyle}>Describe tu consulta <span style={{ color: '#F2683C' }}>*</span></label>
              <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} placeholder="Cuéntanos qué le pasa a tu mascota o qué servicio necesitas…" style={{ ...fieldStyle('description'), resize: 'vertical' }} />
              {errors.description && <span role="alert" style={{ color: '#E1473D', fontSize: 12.5 }}>{errors.description}</span>}
            </div>
            <button type="submit" className="mk-lift" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'linear-gradient(150deg,#2E86F0,#1B6FD4)', color: '#fff', fontWeight: 700, fontSize: 16, padding: 15, border: 'none', borderRadius: 13, cursor: 'pointer', boxShadow: '0 12px 26px rgba(27,111,212,.30)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Enviar por WhatsApp
            </button>
            <p style={{ fontSize: 12.5, color: '#9AAEC2', margin: 0, textAlign: 'center' }}>Se abrirá WhatsApp con un mensaje prellenado con tus datos.</p>
          </Reveal>

          {/* ===== Información ===== */}
          <Reveal delay={120} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
              <a href="https://wa.me/524425443090" target="_blank" rel="noopener noreferrer" className="mk-lift" style={cardLink}>
                <span style={badge('#E5F0FF', '#1B6FD4')}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg></span>
                <div><div style={eyebrowSm}>WhatsApp</div><div style={{ fontWeight: 700, color: '#0A2A47', fontSize: 15, marginTop: 2 }}>(442) 544 30 90</div></div>
              </a>
              <a href="tel:+524422179078" className="mk-lift" style={cardLink}>
                <span style={badge('#FDE5DA', '#F2683C')}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg></span>
                <div><div style={eyebrowSm}>Urgencias</div><div style={{ fontWeight: 700, color: '#0A2A47', fontSize: 15, marginTop: 2 }}>(442) 217 90 78</div></div>
              </a>
              <a href="https://www.instagram.com/vet.mykan/" target="_blank" rel="noopener noreferrer" className="mk-lift" style={cardLink}>
                <span style={badge('#E5F0FF', '#1B6FD4')}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></span>
                <div><div style={eyebrowSm}>Instagram</div><div style={{ fontWeight: 700, color: '#0A2A47', fontSize: 15, marginTop: 2 }}>@vet.mykan</div></div>
              </a>
              <a href="https://www.facebook.com/@vetmykan" target="_blank" rel="noopener noreferrer" className="mk-lift" style={cardLink}>
                <span style={badge('#E5F0FF', '#1B6FD4')}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></span>
                <div><div style={eyebrowSm}>Facebook</div><div style={{ fontWeight: 700, color: '#0A2A47', fontSize: 15, marginTop: 2 }}>@vetmykan</div></div>
              </a>
            </div>

            {/* Horarios */}
            <div style={{ background: '#fff', border: '1px solid #EAF2FD', borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: '#0A2A47', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1B6FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                Horarios de atención
              </h3>
              {scheduleRows.map((r, i) => (
                <div key={r.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < scheduleRows.length - 1 ? '1px solid #EEF4FC' : 'none' }}>
                  <span style={{ fontWeight: 600, color: '#3A5168', fontSize: 14 }}>{r.day}</span>
                  <span style={{ color: r.urgent ? '#F2683C' : '#5B7081', fontWeight: r.urgent ? 700 : 400, fontSize: 14 }}>{r.hours}</span>
                </div>
              ))}
            </div>

            {/* Dirección */}
            <div style={{ background: '#fff', border: '1px solid #EAF2FD', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 13 }}>
              <span style={{ flex: 'none', ...badge('#E5F0FF', '#1B6FD4') }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg></span>
              <div><div style={eyebrowSm}>Dirección</div><div style={{ fontWeight: 600, color: '#0A2A47', fontSize: 14.5, marginTop: 3, lineHeight: 1.5 }}>C. Arquitectura 9, Industrial, 76130 Santiago de Querétaro, Qro.</div></div>
            </div>

            {/* Mapa */}
            <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #EAF2FD', boxShadow: '0 12px 30px rgba(10,42,71,.08)' }}>
              <iframe
                src="https://maps.google.com/maps?q=C.+Arquitectura+9,+Industrial,+76130+Santiago+de+Quer%C3%A9taro,+Qro&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                title="Ubicación de MyKan Veterinaria"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
