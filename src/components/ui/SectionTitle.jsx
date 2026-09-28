import SplitTitle from './SplitTitle';

// Cabeçalho padrão de seção (eyebrow + título + descrição opcional).
// O título usa o tratamento padrão do sistema de títulos (corte por linha
// diagonal). variant="half" volta ao efeito anterior, se for necessário.
export default function SectionTitle({ eyebrow, title, description, split = true, variant }) {
  return (
    <div className="section-title">
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      {split ? (
        <SplitTitle as="h2" className="section-title__title" variant={variant}>{title}</SplitTitle>
      ) : (
        <h2 className="section-title__title">{title}</h2>
      )}
      {description && <p className="section-title__description">{description}</p>}
    </div>
  )
}
