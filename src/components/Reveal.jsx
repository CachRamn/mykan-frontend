import { useEffect, useRef } from 'react'

/**
 * Revela su contenido con un fade-up cuando entra en el viewport.
 * Uso: <Reveal as="article" delay={70} className="mk-card" style={{...}}>...</Reveal>
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    let timer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setTimeout(() => el.classList.add('is-visible'), delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  return (
    <Tag ref={ref} className={`mk-reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  )
}
