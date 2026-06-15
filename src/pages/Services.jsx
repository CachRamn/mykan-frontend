const services = [
  {
    emoji: '🩺',
    name: 'Consulta General',
    desc: 'Evaluación completa del estado de salud de tu mascota con nuestros veterinarios certificados.',
  },
  {
    emoji: '🔬',
    name: 'Diagnóstico',
    desc: 'Identificamos la causa de los síntomas con equipos de diagnóstico de última generación.',
  },
  {
    emoji: '🏥',
    name: 'Cirugía',
    desc: 'Procedimientos quirúrgicos con los más altos estándares de seguridad y asepsia.',
  },
  {
    emoji: '🛍️',
    name: 'Venta de Accesorios',
    desc: 'Collares, correas, juguetes y más para el bienestar y diversión de tu mascota.',
  },
  {
    emoji: '🥘',
    name: 'Venta de Alimento',
    desc: 'Alimentos balanceados de las mejores marcas para cada etapa de vida.',
  },
  {
    emoji: '💉',
    name: 'Vacunación y Desparasitación',
    desc: 'Esquemas de vacunación personalizados y control de parásitos internos y externos.',
  },
  {
    emoji: '✂️',
    name: 'Estética y Grooming',
    desc: 'Baño, corte y arreglo profesional para que tu mascota luzca y se sienta increíble.',
  },
  {
    emoji: '🛏️',
    name: 'Hospitalización',
    desc: 'Área de hospitalización equipada para la recuperación segura y monitoreada de tu mascota.',
  },
  {
    emoji: '🚨',
    name: 'Urgencias 24/7',
    desc: 'Atención de emergencias las 24 horas del día, los 7 días de la semana.',
  },
  {
    emoji: '🧪',
    name: 'Laboratorio Clínico',
    desc: 'Análisis de sangre, orina y más para diagnósticos precisos y rápidos.',
  },
  {
    emoji: '🦷',
    name: 'Odontología Veterinaria',
    desc: 'Limpieza dental, extracciones y tratamientos para la salud bucal de tu mascota.',
  },
  {
    emoji: '📡',
    name: 'Radiología e Imagen',
    desc: 'Radiografías y ultrasonido para una visión interna completa del estado de tu mascota.',
  },
]

export default function Services() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="bg-[#1a6b3a] text-white py-12 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Nuestros servicios</h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          Atención veterinaria integral para el bienestar de tu mascota.
        </p>
      </div>

      {/* Grid de servicios */}
      <section
        aria-labelledby="services-list-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-14"
      >
        <h2 id="services-list-heading" className="sr-only">
          Lista de servicios
        </h2>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {services.map(({ emoji, name, desc }) => (
            <li key={name}>
              <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-full p-6 flex flex-col gap-3">
                <span className="text-4xl" aria-hidden="true">
                  {emoji}
                </span>
                <h3 className="font-semibold text-gray-800 text-base">{name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA inferior */}
      <section className="bg-white py-10 px-4 sm:px-6 text-center border-t border-gray-100">
        <p className="text-gray-700 text-base mb-4">
          ¿Tienes dudas sobre algún servicio? Contáctanos directamente.
        </p>
        <a
          href="https://wa.me/524425443090"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1a6b3a] text-white font-semibold px-7 py-3 rounded-lg shadow hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2"
          aria-label="Consultar por WhatsApp"
        >
          Consultar por WhatsApp
        </a>
      </section>
    </div>
  )
}
