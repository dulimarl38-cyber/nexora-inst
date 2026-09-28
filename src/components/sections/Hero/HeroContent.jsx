import HeroTitle from './HeroTitle'
import HeroSubtitle from './HeroSubtitle'
import HeroActions from './HeroActions'

export default function HeroContent() {
  return (
    <div className="hero__content">
      <span className="hero__eyebrow reveal">Infraestrutura & Desenvolvimento</span>
      <HeroTitle />
      <HeroSubtitle>
        A Nexora conecta hardware, rede e software em uma só operação —
        da infraestrutura ao sistema que sua empresa usa todos os dias.
      </HeroSubtitle>
      <HeroActions />
    </div>
  )
}

