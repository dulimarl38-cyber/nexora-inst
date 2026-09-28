import { projects } from '../../data/projects'
import ProjectReveal from '../projects/ProjectReveal'
import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <Container>
        <SectionTitle eyebrow="Projetos" title="Cases" description="Projetos reais que já estão no ar. Aproxime, abra e acesse o site ao vivo." split />
        {projects.length > 0 ? (
          <div className="projects__list reveal">
            {projects.map((project) => (
              <ProjectReveal key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="projects__empty reveal">Os primeiros cases da Nexora serão exibidos aqui.</div>
        )}
      </Container>
    </section>
  )
}
