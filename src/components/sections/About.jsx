import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

const POINTS = [
  { title: 'Quem somos', text: 'Uma equipe de tecnologia que atua em todas as camadas: hardware, rede e software.' },
  { title: 'O que fazemos', text: 'Projetamos, implementamos e sustentamos a infraestrutura e as aplicações que rodam sobre ela.' },
  { title: 'Como pensamos', text: 'Tecnologia como um sistema único — não peças isoladas resolvidas por fornecedores diferentes.' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <Container>
        <div className="about__grid">
          <div className="reveal">
            <SectionTitle eyebrow="Nexora" title="Uma empresa, todas as camadas" split />
            <p className="about__lead">
              Acreditamos que tecnologia de verdade nasce quando <em>infraestrutura</em> e{' '}
              <em>software</em> são pensados juntos — não contratados separadamente.
            </p>
          </div>
          <div className="about__points reveal reveal--delay-1">
            {POINTS.map((point, i) => (
              <div className="about__point" key={point.title}>
                <span className="about__point-index">0{i + 1}</span>
                <div>
                  <div className="about__point-title">{point.title}</div>
                  <p className="about__point-text">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
