import Button from '../../ui/Button'

export default function HeroActions() {
  return (
    <div className="hero__actions reveal reveal--delay-3">
      <Button variant="primary" href="#contact">Fale com a gente</Button>
      <Button variant="secondary" href="#solutions">Conhecer soluções</Button>
    </div>
  )
}
