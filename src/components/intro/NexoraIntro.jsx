import { useState, useEffect, useRef } from 'react'
import { CONTOUR_PATHS } from './contourPaths'
import { BEAMS } from './beamsData'
import '../../styles/intro.css'

export default function NexoraIntro({ onComplete }) {
  const [complete, setComplete] = useState(false)
  const [fadeBackdrop, setFadeBackdrop] = useState(false)

  const heroRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const contourRef = useRef(null)
  const animFrameRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    let backdropFaded = false

    // --- Medição offline dos assets (bbox de alpha>64 via System.Drawing) ---
    // nexora-logo.png 390×435: o N do símbolo ocupa x[13..372] y[18..381];
    // a wordmark "NEXORA" começa em y=382 e fica FORA do alvo de pouso.
    // nexora-symbol-clean.png 360×360: o N ocupa x[5..359] y[3..358].
    // Frações mapeadas sobre o getBoundingClientRect() do <img> renderizado,
    // tornando o cálculo responsivo (escala com viewport/DPR).
    const LOGO_N = { cx: 192.5 / 390, cy: 199.5 / 435, fh: 363 / 435 }
    const HERO_N = { cx: 182 / 360, cy: 180.5 / 360, fh: 355 / 360 }

    const getTargetPos = () => {
      const D = centerSize
      // centro visual do N do hero em coordenadas locais do div (não escalado)
      const px = HERO_N.cx * D
      const py = HERO_N.cy * D
      const heroNH = HERO_N.fh * D
      // Ponto de pouso do símbolo = retângulo real da logo de marca renderizada.
      // O seletor PRECISA casar com a classe em components/brand/Brand.jsx
      // (brand__img). Se não casar, cai no fallback fixo abaixo e o "N" pousa
      // fora da logo.
      const logoEl = document.querySelector('.brand__img')
      if (logoEl) {
        const rect = logoEl.getBoundingClientRect()
        if (rect.height > 0) {
          return {
            // centro visual do N dentro da logo renderizada (exclui wordmark)
            cx: rect.left + LOGO_N.cx * rect.width,
            cy: rect.top + LOGO_N.cy * rect.height,
            // escala para o N hero ter a mesma altura visual do N da marca
            s: (LOGO_N.fh * rect.height) / heroNH,
            px: px,
            py: py,
          }
        }
      }
      return { cx: 82, cy: 47, s: (LOGO_N.fh * 40) / heroNH, px: px, py: py }
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const centerSize = Math.min(vw * 0.38, vh * 0.38, 220)
    const centerX = (vw - centerSize) / 2
    const centerY = (vh - centerSize) / 2


    const easeInoutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const updateAnimation = (now) => {
      const elapsed = (now - startTime) / 1000

      // --- Materialização contínua: os traços SE TRANSFORMAM no N dourado ---
      // Aura dourada nasce DURANTE a formação (0.75 → 2.0s) com crescimento
      // gradual (smoothstep) — sem flash abrupto.
      const clamp01 = (v) => Math.min(1, Math.max(0, v))
      const smoothstep = (t) => t * t * (3 - 2 * t)
      const gl = smoothstep(clamp01((elapsed - 0.75) / 1.25))
      if (glowRef.current) glowRef.current.style.opacity = String(gl)

      // Preenchimento dourado sob os traços: máscara radial que cresce do centro
      // para fora (0.8 → 2.0s) e termina exatamente quando o último traço fecha
      // o N. Enquanto a máscara é menor que o N, só os traços desenhados existem:
      // nunca há um "N pronto" antes de a formação terminar — as linhas é que se
      // materializam em N dourado, sem corte e sem troca de elemento perceptível.
      const fg = smoothstep(clamp01((elapsed - 0.8) / 1.2))
      const R = fg * 112
      const grad =
        'radial-gradient(circle at 50% 50%, #000 0%, #000 ' +
        Math.max(R - 10, 0) +
        '%, transparent ' +
        R +
        '%)'
      if (imgRef.current) {
        imgRef.current.style.opacity =
          elapsed < 0.7 ? '0' : String(Math.min(1, (elapsed - 0.7) / 0.2))
        imgRef.current.style.webkitMaskImage = grad
        imgRef.current.style.maskImage = grad
      }

      // Traços somem suavemente POR CIMA do N já completo e geometricamente
      // idêntico (2.0 → 2.3s) — como as bordas coincidem com o PNG, o fade é
      // imperceptível; nenhum elemento "pula".
      if (contourRef.current) {
        contourRef.current.style.opacity = String(1 - clamp01((elapsed - 2.0) / 0.3))
      }

      // Backdrop começa a revelar o site (~3.25s) — a transição CSS de 0.75s
      // termina exatamente quando inicia o crossfade de encaixe (4.0s)
      if (elapsed >= 3.25 && !backdropFaded) {
        backdropFaded = true
        setFadeBackdrop(true)
      }


      const el = heroRef.current
      if (el) {
        if (elapsed < 2.3) {
          // 0.0 → 2.3s: formação + respiro — container sempre visível; a
          // materialização (máscara do N + aura) é controlada pelo bloco acima
          el.style.opacity = '1'
          el.style.transform =
            'translate3d(' + centerX + 'px, ' + centerY + 'px, 0px) scale(1)'
        } else if (elapsed < 2.9) {
          // 2.3 → 2.9s: rotação 3D suave
          const rotProgress = (elapsed - 2.3) / 0.6
          const rotEased = easeInoutCubic(Math.min(1, Math.max(0, rotProgress)))
          const angle = rotEased * 360

          el.style.opacity = '1'
          el.style.transform =
            'translate3d(' + centerX + 'px, ' + centerY + 'px, 0px) scale(1) rotateY(' + angle + 'deg)'
        } else if (elapsed < 4.0) {
          // 2.9 → 4.0s: redução + deslocamento até a marca (logo).
          // O translate é resolvido para que o CENTRO VISUAL do N hero
          // coincida com o do N da logo (pouso exato, sem "chute" de top).
          // p' = O + s·(p − O) + t  ⇒  t = c − O − s·(p − O)
          const travelProgress = (elapsed - 2.9) / 1.1
          const tEased = easeInoutCubic(Math.min(1, Math.max(0, travelProgress)))

          const target = getTargetPos()
          const O = centerSize / 2
          const s = 1 + (target.s - 1) * tEased
          // centro do N no início (estado de respiro/rotação) e no destino
          const c0x = target.px + centerX
          const c0y = target.py + centerY
          const curX = c0x + (target.cx - c0x) * tEased
          const curY = c0y + (target.cy - c0y) * tEased
          const tx = curX - O - s * (target.px - O)
          const ty = curY - O - s * (target.py - O)
          const subtleRot = (1 - tEased) * 15 * Math.sin(tEased * Math.PI)

          el.style.opacity = '1'
          el.style.transform =
            'translate3d(' + tx + 'px, ' + ty + 'px, 0px) scale(' + s + ') rotate(' + subtleRot + 'deg)'
        } else {
          // 4.0 → 4.4s: encaixe fixo sobre o N da logo + crossfade de 0.4s;
          // o logo real da marca já está visível por baixo.
          const target = getTargetPos()
          const O = centerSize / 2
          const finalX = target.cx - O - target.s * (target.px - O)
          const finalY = target.cy - O - target.s * (target.py - O)
          const fadeOut = Math.max(0, 1 - (elapsed - 4.0) / 0.4)
          el.style.opacity = String(fadeOut)
          el.style.transform =
            'translate3d(' + finalX + 'px, ' + finalY + 'px, 0px) scale(' + target.s + ')'
        }
      }


      if (elapsed < 4.4) {
        animFrameRef.current = requestAnimationFrame(updateAnimation)
      } else {
        setComplete(true)
        document.body.style.overflow = originalOverflow
        if (onCompleteRef.current) onCompleteRef.current()
      }
    }

    animFrameRef.current = requestAnimationFrame(updateAnimation)


    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      document.body.style.overflow = originalOverflow
    }
  }, [])

  if (complete) {
    return null
  }

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const centerSize = Math.min(vw * 0.38, vh * 0.38, 220)

  return (
    <div className={'nexora-intro-wrapper ' + (fadeBackdrop ? 'nexora-intro-wrapper--fade-backdrop' : '')} aria-hidden="true">
      <div className="nexora-intro-backdrop" />

      <svg className="nexora-intro-beams" viewBox={'0 0 ' + vw + ' ' + vh}>
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a24b" stopOpacity="0" />
            <stop offset="70%" stopColor="#e6cf8f" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        {BEAMS.map((b, i) => {
          const x1 = b.orig[0] * vw
          const y1 = b.orig[1] * vh
          const x2 = (vw - centerSize) / 2 + (b.target[0] / 360) * centerSize
          const y2 = (vh - centerSize) / 2 + (b.target[1] / 360) * centerSize
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#beamGrad)"
              strokeWidth={i % 2 === 0 ? 2 : 1.2}
              className="nexora-intro-beam"
              style={{ animationDelay: (0.05 + (i / (BEAMS.length - 1)) * 1.0) + 's' }}
            />
          )
        })}
      </svg>

      <div className="nexora-intro-stage">
        <svg
          ref={contourRef}
          className="nexora-intro-contours"
          viewBox="0 0 360 360"
          style={{ width: centerSize + 'px', height: centerSize + 'px', position: 'absolute' }}
        >
          {CONTOUR_PATHS.map((d, i) => {
            // Stagger proporcional: os traços estruturais grandes desenham cedo
            // (caneta com velocidade constante) e os detalhes chegam em cascata
            // a cada ~56ms — novos traços aparecem continuamente até ~1.77s e o
            // último fecha o N em ~1.95s (formação cheia, sem buraco antes do N).
            const cDelay = i === 0 ? 0.15 : i === 1 ? 0.45 : 0.65 + (i - 2) * 0.056
            const cDur = i === 0 ? 0.75 : i === 1 ? 0.45 : i === 2 ? 0.2 : 0.18
            return (
              <path
                key={i}
                d={d}
                pathLength={1}
                className="nexora-contour-path"
                style={{
                  animation:
                    'nexora-draw-contour ' +
                    cDur +
                    's cubic-bezier(0.25, 1, 0.3, 1) ' +
                    cDelay +
                    's forwards',
                }}
              />
            )
          })}
        </svg>
      </div>


      <div
        ref={heroRef}
        className="nexora-intro-hero-symbol"
        style={{
          width: centerSize + 'px',
          height: centerSize + 'px',
          opacity: 0,
        }}
      >
        <div ref={glowRef} className="nexora-intro-hero-symbol__glow" style={{ opacity: 0 }} />
        <img
          ref={imgRef}
          src="/nexora-symbol-clean.png"
          alt="Nexora Symbol"
          className="nexora-intro-hero-symbol__img"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  )
}
