import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/services', label: 'Servicios' },
  { to: '/gallery', label: 'Galería' },
  { to: '/contact', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 hover:text-[#1a6b3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded px-1 py-0.5 ${
      isActive ? 'text-[#1a6b3a] font-semibold' : 'text-gray-700'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-[#1a6b3a] font-bold text-lg leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] rounded"
          aria-label="MyKan Veterinaria — Inicio"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            width="28"
            height="28"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {/* Pata de animal — 4 dedos + palma */}
            <ellipse cx="50" cy="72" rx="22" ry="18" />
            <ellipse cx="24" cy="52" rx="10" ry="13" />
            <ellipse cx="76" cy="52" rx="10" ry="13" />
            <ellipse cx="36" cy="36" rx="9" ry="12" />
            <ellipse cx="64" cy="36" rx="9" ry="12" />
          </svg>
          <span>MyKan Veterinaria</span>
        </NavLink>

        {/* Links escritorio */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={navLinkClass} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a] text-gray-700"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${open ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current my-1 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow-md"
        >
          <ul className="flex flex-col px-4 py-3 gap-1" role="list">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-50 text-[#1a6b3a] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#1a6b3a]'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6b3a]`
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
