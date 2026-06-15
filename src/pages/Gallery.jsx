import { useState } from 'react'

const categories = ['Servicios', 'Clientes', 'Accesorios']

const images = {
  Servicios: [
    { src: 'https://placehold.co/400x300?text=Consulta+General', alt: 'Consulta general veterinaria' },
    { src: 'https://placehold.co/400x300?text=Diagnóstico', alt: 'Equipo de diagnóstico veterinario' },
    { src: 'https://placehold.co/400x300?text=Cirugía', alt: 'Sala de cirugía veterinaria' },
    { src: 'https://placehold.co/400x300?text=Laboratorio', alt: 'Laboratorio clínico veterinario' },
    { src: 'https://placehold.co/400x300?text=Grooming', alt: 'Servicio de grooming para mascotas' },
    { src: 'https://placehold.co/400x300?text=Vacunación', alt: 'Vacunación de mascotas' },
  ],
  Clientes: [
    { src: 'https://placehold.co/400x300?text=Cliente+1', alt: 'Perro con su dueño en la clínica' },
    { src: 'https://placehold.co/400x300?text=Cliente+2', alt: 'Gato siendo atendido por veterinario' },
    { src: 'https://placehold.co/400x300?text=Cliente+3', alt: 'Mascota feliz después de su cita' },
    { src: 'https://placehold.co/400x300?text=Cliente+4', alt: 'Dueña con su perro en consulta' },
    { src: 'https://placehold.co/400x300?text=Cliente+5', alt: 'Mascota recuperada en hospitalización' },
    { src: 'https://placehold.co/400x300?text=Cliente+6', alt: 'Perro listo después del grooming' },
  ],
  Accesorios: [
    { src: 'https://placehold.co/400x300?text=Collares', alt: 'Collares para perros y gatos' },
    { src: 'https://placehold.co/400x300?text=Juguetes', alt: 'Juguetes para mascotas' },
    { src: 'https://placehold.co/400x300?text=Alimento', alt: 'Alimentos balanceados para mascotas' },
    { src: 'https://placehold.co/400x300?text=Correas', alt: 'Correas y arneses para perros' },
    { src: 'https://placehold.co/400x300?text=Camas', alt: 'Camas y accesorios de descanso' },
    { src: 'https://placehold.co/400x300?text=Ropa', alt: 'Ropa y accesorios para mascotas' },
  ],
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Servicios')
  const [lightbox, setLightbox] = useState(null)

  const handleKeyDown = (e, img) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setLightbox(img)
    }
  }

  const closeLightbox = (e) => {
    if (e.key === 'Escape' || e.type === 'click') {
      setLightbox(null)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="bg-[#1a6b3a] text-white py-12 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Galería</h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          Momentos especiales de nuestras mascotas y el equipo MyKan.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Filtros */}
        <div
          className="flex justify-center gap-2 mb-10 flex-wrap"
          role="group"
          aria-label="Filtrar galería por categoría"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2 ${
                activeCategory === cat
                  ? 'bg-[#1a6b3a] text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a6b3a] hover:text-[#1a6b3a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <section aria-label={`Galería: ${activeCategory}`}>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
          >
            {images[activeCategory].map((img) => (
              <li key={img.src}>
                <button
                  type="button"
                  className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] focus-visible:ring-offset-2 block"
                  onClick={() => setLightbox(img)}
                  onKeyDown={(e) => handleKeyDown(e, img)}
                  aria-label={`Ver imagen ampliada: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width="400"
                    height="300"
                    className="w-full h-56 object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
          onKeyDown={closeLightbox}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full rounded-xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 bg-white text-gray-700 w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] font-bold text-lg"
              aria-label="Cerrar imagen"
            >
              ×
            </button>
            <p className="text-white text-sm text-center mt-3 opacity-80">
              {lightbox.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
