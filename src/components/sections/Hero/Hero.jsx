import HeroBackground from './HeroBackground'
import HeroVisual from './HeroVisual'
import HeroContent from './HeroContent'
import HeroDecorations from './HeroDecorations'

// Seção principal do site. Composição visual final: etapa futura no VS Code.
// A ordem vertical não mudou: conteúdo (eyebrow, título, subtítulo, CTAs) →
// camadas numeradas (HeroVisual). As camadas também são a navegação principal —
// cada uma é um link para a sua seção —, então não existe nenhuma faixa de
// menu separada abaixo delas.
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <HeroBackground />
      <HeroDecorations />
      <div className="hero__inner">
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  )
}
