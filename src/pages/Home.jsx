import { Link } from 'react-router-dom'

const featuredServices = [
  { emoji: '🔬', name: 'Diagnóstico', desc: 'Equipos de última generación para identificar con precisión el estado de salud de tu mascota.' },
  { emoji: '💉', name: 'Vacunación', desc: 'Esquemas personalizados para proteger a tu mascota en cada etapa de su vida.' },
  { emoji: '✂️', name: 'Estética y Grooming', desc: 'Baño, corte y arreglo profesional para que tu mascota luzca y se sienta increíble.' },
  { emoji: '🏥', name: 'Cirugía', desc: 'Procedimientos quirúrgicos con los más altos estándares de seguridad y asepsia.' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-gradient-to-br from-green-800 to-green-600 text-white"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center text-center gap-6">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
          >
            Bienvenido a MyKan Veterinaria
          </h1>
          <p className="text-green-100 text-lg sm:text-xl max-w-xl leading-relaxed">
            Cuidamos a tu mascota con amor y profesionalismo en Santiago de
            Querétaro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              to="/contact"
              className="inline-block bg-white text-[#1a6b3a] font-semibold px-7 py-3 rounded-lg shadow hover:bg-green-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
            >
              Agendar consulta
            </Link>
            <Link
              to="/services"
              className="inline-block border-2 border-white text-white font-semibold px-7 py-3 rounded-lg hover:bg-white hover:text-[#1a6b3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section
        className="py-14 bg-gray-50"
        aria-labelledby="horarios-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2
            id="horarios-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            Horarios de atención
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2">
              <p className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Lunes — Viernes
              </p>
              <p className="text-gray-600 text-sm">9:00 — 15:00 hrs</p>
              <p className="text-gray-600 text-sm">16:00 — 21:00 hrs</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2">
              <p className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Sábados
              </p>
              <p className="text-gray-600 text-sm">9:00 — 15:00 hrs</p>
              <p className="text-gray-600 text-sm">16:00 — 17:00 hrs</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl shadow-md p-6 flex flex-col gap-2">
              <p className="font-semibold text-red-700 text-sm uppercase tracking-wide">
                Urgencias
              </p>
              <p className="text-red-600 font-bold text-lg">24/7</p>
              <p className="text-red-600 text-sm">Los 7 días de la semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview de servicios */}
      <section
        className="py-14 bg-white"
        aria-labelledby="servicios-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2
            id="servicios-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center"
          >
            Nuestros servicios
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Atención integral para cada etapa de vida de tu mascota.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map(({ emoji, name, desc }) => (
              <article
                key={name}
                className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col gap-3"
              >
                <span className="text-4xl" aria-hidden="true">{emoji}</span>
                <h3 className="font-semibold text-gray-800 text-base">{name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/services"
              className="inline-block bg-[#1a6b3a] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-[#2d8653] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="bg-[#1a6b3a] py-14" aria-labelledby="cta-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-5">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold text-white"
          >
            ¿Tienes una emergencia?
          </h2>
          <p className="text-green-100 text-lg max-w-md">
            Escríbenos ahora por WhatsApp. Estamos disponibles las 24 horas,
            los 7 días de la semana.
          </p>
          <a
            href="https://wa.me/524425443090"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#1a6b3a] font-semibold px-8 py-3 rounded-lg shadow hover:bg-green-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
            aria-label="Escribir a MyKan por WhatsApp"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
