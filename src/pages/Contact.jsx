import { useState } from 'react'

const scheduleRows = [
  { day: 'Lunes — Viernes', hours: '9:00 – 15:00 y 16:00 – 21:00 hrs' },
  { day: 'Sábados', hours: '9:00 – 15:00 y 16:00 – 17:00 hrs' },
  { day: 'Urgencias', hours: '24/7 los 7 días de la semana' },
]

export default function Contact() {
  const [form, setForm] = useState({
    ownerName: '',
    petName: '',
    phone: '',
    description: '',
  })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.ownerName.trim()) e.ownerName = 'Por favor ingresa tu nombre.'
    if (!form.petName.trim()) e.petName = 'Por favor ingresa el nombre de tu mascota.'
    if (!form.phone.trim()) e.phone = 'Por favor ingresa tu número de teléfono.'
    if (!form.description.trim()) e.description = 'Por favor describe tu consulta.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const message = `Hola MyKan, soy ${form.ownerName}. Mi mascota se llama ${form.petName}. Mi teléfono es ${form.phone}. Consulta: ${form.description}`
    window.open(
      `https://wa.me/524425443090?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="bg-[#1a6b3a] text-white py-12 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contacto</h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          Escríbenos o llena el formulario y te respondemos a la brevedad.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Formulario */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-xl font-bold text-gray-800 mb-6">
            Envíanos tu consulta
          </h2>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="ownerName"
                className="text-sm font-medium text-gray-700"
              >
                Nombre del dueño <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                autoComplete="name"
                value={form.ownerName}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.ownerName ? 'err-ownerName' : undefined}
                aria-invalid={!!errors.ownerName}
                placeholder="Tu nombre completo"
                className={`border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition ${
                  errors.ownerName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.ownerName && (
                <p id="err-ownerName" className="text-red-600 text-xs" role="alert">
                  {errors.ownerName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="petName"
                className="text-sm font-medium text-gray-700"
              >
                Nombre de la mascota <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="petName"
                name="petName"
                type="text"
                value={form.petName}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.petName ? 'err-petName' : undefined}
                aria-invalid={!!errors.petName}
                placeholder="Nombre de tu mascota"
                className={`border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition ${
                  errors.petName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.petName && (
                <p id="err-petName" className="text-red-600 text-xs" role="alert">
                  {errors.petName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Número de teléfono <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                aria-invalid={!!errors.phone}
                placeholder="(442) 000 00 00"
                className={`border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p id="err-phone" className="text-red-600 text-xs" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Descripción de la consulta <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.description ? 'err-description' : undefined}
                aria-invalid={!!errors.description}
                placeholder="Cuéntanos qué le pasa a tu mascota o qué servicio necesitas…"
                className={`border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b3a] transition resize-y ${
                  errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p id="err-description" className="text-red-600 text-xs" role="alert">
                  {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#1a6b3a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2 mt-1"
            >
              Enviar por WhatsApp
            </button>
            <p className="text-xs text-gray-400">
              Al enviar, se abrirá WhatsApp con un mensaje pre-llenado con tus datos.
            </p>
          </form>
        </section>

        {/* Información de contacto */}
        <section aria-labelledby="info-heading" className="flex flex-col gap-6">
          <h2 id="info-heading" className="text-xl font-bold text-gray-800">
            Información de contacto
          </h2>

          {/* Tarjetas de contacto */}
          <ul className="flex flex-col gap-3" role="list">
            <li className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <span className="text-2xl" aria-hidden="true">📱</span>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">WhatsApp</p>
                <a
                  href="https://wa.me/524425443090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a6b3a] font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
                >
                  (442) 544 30 90
                </a>
              </div>
            </li>
            <li className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <span className="text-2xl" aria-hidden="true">📞</span>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Urgencias</p>
                <a
                  href="tel:+524422179078"
                  className="text-[#1a6b3a] font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
                >
                  (442) 217 90 78
                </a>
              </div>
            </li>
            <li className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <span className="text-2xl" aria-hidden="true">📸</span>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Instagram</p>
                <a
                  href="https://www.instagram.com/vet.mykan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a6b3a] font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
                >
                  @vet.mykan
                </a>
              </div>
            </li>
            <li className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <span className="text-2xl" aria-hidden="true">👥</span>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Facebook</p>
                <a
                  href="https://www.facebook.com/@vetmykan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a6b3a] font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
                >
                  @vetmykan
                </a>
              </div>
            </li>
          </ul>

          {/* Horarios */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span aria-hidden="true">🕐</span> Horarios de atención
            </h3>
            <table className="w-full text-sm" aria-label="Horarios de atención MyKan">
              <tbody>
                {scheduleRows.map(({ day, hours }) => (
                  <tr key={day} className="border-t border-gray-100 first:border-t-0">
                    <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">
                      {day}
                    </td>
                    <td
                      className={`py-2 ${day === 'Urgencias' ? 'text-red-600 font-semibold' : 'text-gray-500'}`}
                    >
                      {hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mapa */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=C.+Arquitectura+9,+Industrial,+76130+Santiago+de+Quer%C3%A9taro,+Qro&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ubicación de MyKan Veterinaria en Google Maps"
              aria-label="Mapa mostrando la ubicación de MyKan Veterinaria: C. Arquitectura 9, Industrial, 76130 Santiago de Querétaro, Qro."
            />
          </div>
        </section>
      </div>
    </div>
  )
}
