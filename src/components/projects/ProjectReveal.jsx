import { useEffect, useId, useRef, useState } from 'react'

/**
 * ProjectReveal — fundação da interação de PROJETOS.
 *
 * Conceito: PROJETO FECHADO → proximidade abre preview visual →
 * clique continua a expansão do MESMO elemento (sem modal tradicional).
 *
 * API preparada para o objeto futuro:
 *   { id, name, category, description, image, slug, link }
 * `image` e `link` são opcionais; sem `image` não há placeholder inventado.
 *
 * Estados: 'closed' | 'proximity' | 'preview' | 'expanded'
 * - closed: só categoria + nome + indicação discreta.
 * - proximity: dica sutil de aproximação (desktop, com pequeno atraso —
 *   não é mouseenter instantâneo).
 * - preview: área visual parcialmente aberta com project.image.
 * - expanded: a MESMA área continua a expansão e exibe uma âncora para `link`.
 *   Sem `link`, apenas expande.
 *
 * Mobile (hover:none): sem hover — 1º toque abre preview, 2º expande.
 * Teclado: Tab foca, Enter/Espaço avançam, Esc recolhe.
 * Animação: só transições CSS (transform/opacity/clip-path). Sem rAF/canvas.
 */
export default function ProjectReveal({ project = {} }) {
  const { id, name = '', category = '', description = '', image = '', slug = '', link = '' } = project
  const [state, setState] = useState('closed')
  const [coarse, setCoarse] = useState(false)
  const panelId = useId()
  const hoverRef = useRef(false)
  const timerRef = useRef(null)

  const isOpen = state === 'preview' || state === 'expanded'

  // Detecta ponteiro sem hover (touch) uma vez — define o modo mobile.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(hover: none)')
      setCoarse(mq.matches)
      const onChange = (e) => setCoarse(e.matches)
      if (mq.addEventListener) mq.addEventListener('change', onChange)
      return () => {
        if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      }
    }
  }, [])

  // Limpa o timer de proximidade ao desmontar.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Avança a máquina de estados (clique / Enter / Espaço / toque).
  const advance = () => {
    if (state === 'closed' || state === 'proximity') {
      setState('preview')
      return
    }
    if (state === 'preview') {
      setState('expanded')
      return
    }
    // expanded → recolhe para preview; cancela navegação ainda pendente.
    setState('preview')
  }

  // Desktop: entrada do cursor → proximidade sutil, preview só após ~140ms.
  const handleMouseEnter = () => {
    if (coarse) return
    if (state === 'expanded') return
    hoverRef.current = true
    clearTimer()
    setState((prev) => (prev === 'closed' ? 'proximity' : prev))
    timerRef.current = setTimeout(() => {
      if (hoverRef.current) {
        setState((prev) => (prev === 'proximity' ? 'preview' : prev))
      }
    }, 140)
  }

  const handleMouseLeave = () => {
    hoverRef.current = false
    clearTimer()
    // Expanded persiste (sensação de "entrar no projeto"); demais recolhem.
    setState((prev) => (prev === 'proximity' || prev === 'preview' ? 'closed' : prev))
  }

  const handleHeadClick = () => {
    // Mobile: toques avançam direto (sem timer de hover). Desktop: clique
    // também funciona mesmo que o timer ainda não tenha disparado.
    clearTimer()
    advance()
  }

  // Foco por teclado dá a dica de proximidade sem abrir sozinho.
  const handleHeadFocus = () => {
    setState((prev) => (prev === 'closed' ? 'proximity' : prev))
  }

  const handleHeadBlur = () => {
    setState((prev) => (prev === 'proximity' ? 'closed' : prev))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      clearTimer()
      setState((prev) => {
        if (prev === 'expanded') return 'preview'
        if (prev === 'preview' || prev === 'proximity') return 'closed'
        return prev
      })
    }
  }

  return (
    <article
      className="project-reveal"
      data-state={state}
      data-project-id={id || undefined}
      data-project-slug={slug || undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="project-reveal__head"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleHeadClick}
        onFocus={handleHeadFocus}
        onBlur={handleHeadBlur}
      >
        <span className="project-reveal__meta">
          {category && <span className="project-reveal__category">{category}</span>}
          <span className="project-reveal__name">{name}</span>
        </span>
        <span className="project-reveal__hint" aria-hidden="true">
          <span className="project-reveal__hint-label">
            {state === 'expanded' ? 'Recolher' : 'Abrir'}
          </span>
          <span className="project-reveal__icon">+</span>
        </span>
      </button>

      <div
        id={panelId}
        className="project-reveal__viewport"
        role="region"
        aria-label={name || undefined}
        aria-hidden={!isOpen}
      >
        <div className="project-reveal__viewport-inner">
          <div className="project-reveal__media">
            {image ? (
              <img
                className="project-reveal__img"
                src={image}
                alt={name || ''}
                loading="lazy"
              />
            ) : (
              // Área preparada para project.image — sem placeholder inventado.
              <div className="project-reveal__media-empty" aria-hidden="true" />
            )}
          </div>
          {description && (
            <p className="project-reveal__description" aria-hidden={state !== 'expanded'}>
              {description}
            </p>
          )}
          {link && state === 'expanded' && (
            <a
              className="project-reveal__link"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar projeto
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
