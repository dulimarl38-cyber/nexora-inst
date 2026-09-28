import { technologies, technologiesClosing } from '../../data/technologies'
import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

export default function Technologies() {
  return (
    <section className="technologies" id="technologies">
      <Container>
        <div className="technologies__head">
          <div className="reveal">
            <SectionTitle
              eyebrow="Tecnologias"
              title="Tecnologia que transforma infraestrutura em solução."
            />
            <p className="technologies__lead">
              Usamos tecnologias modernas para desenvolver aplicações, integrar
              sistemas e construir ambientes digitais mais seguros, conectados e
              preparados para crescer.
            </p>
          </div>
        </div>

        <div className="technologies__grid">
          {technologies.map((cat, i) => (
            <article
              className="technologies__group reveal"
              key={cat.id}
              style={{ '--i': i }}
            >
              <div className="technologies__group-head">
                <span className="technologies__index">0{i + 1}</span>
                <h3 className="technologies__group-title">{cat.title}</h3>
              </div>
              <ul className="technologies__items">
                {cat.items.map((item) => (
                  <li className="technologies__item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="technologies__closing reveal">
          {technologiesClosing}
        </p>
      </Container>
    </section>
  )
}
