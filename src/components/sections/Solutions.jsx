import { solutions } from '../../data/solutions'
import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

export default function Solutions() {
  return (
    <section className="solutions" id="solutions">
      <Container>
        <SectionTitle eyebrow="Soluções" title="Da infraestrutura à aplicação" split />
        <div className="solutions__grid reveal">
          {solutions.map((item, i) => (
            <div className="solutions__card" key={item.id}>
              <span className="solutions__index">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
