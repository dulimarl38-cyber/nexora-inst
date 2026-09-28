import { processSteps } from '../../data/process'
import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

export default function Process() {
  return (
    <section className="process" id="process">
      <Container>
        <SectionTitle eyebrow="Processo" title="Como trabalhamos" />
        <div className="process__flow reveal">
          {processSteps.map((step, i) => (
            <div className="process__step" key={step.id}>
              <div className="process__marker">
                <span className="process__dot" />
                <span className="process__line" />
              </div>
              <div className="process__content">
                <span className="process__number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
