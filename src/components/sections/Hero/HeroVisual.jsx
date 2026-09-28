// As 4 peças numeradas NÃO são só arte: são a navegação principal da landing
// page. Cada uma é a sua própria seção, então cada uma virou um link.
//
// Âncoras nativas de propósito: navegam sem JavaScript, funcionam por teclado e
// por toque, atualizam o hash (permitindo voltar/share) e reaproveitam o
// `scroll-behavior: smooth` que já existia no projeto.
//
// A arte não muda. Cada peça continua sendo o MESMO `.hero__layer` de antes,
// com as mesmas duas spans e o conector no lugar — só a tag virou <a>, e o
// CSS já estiliza âncora e div igual. Nenhuma regra visual nova foi necessária
// além do foco de teclado, que antes não existia porque o elemento não era
// focável.
//
// O rótulo visível É o nome da seção de destino. Por isso não existe
// aria-label aqui: o nome acessível sai do próprio conteúdo ("Sobre 01"), então
// leitor de tela e navegação por voz sempre concordam com o que está na tela
// (WCAG 2.5.3 — Label in Name). O "01" é a numeração da peça e segue junto.
const LAYERS = [
  { label: 'Sobre', tag: '01', href: '#about' },
  { label: 'Projetos', tag: '02', href: '#projects' },
  { label: 'Tecnologias', tag: '03', href: '#technologies' },
  { label: 'Contato', tag: '04', href: '#contact' },
]

// <nav> no lugar da <div> antiga: dá um landmark de navegação para leitores de
// tela sem nenhuma alteração visual — nav é display:block, como era a div.
export default function HeroVisual() {
  return (
    <nav className="hero__visual reveal reveal--delay-4" aria-label="Navegação principal">
      {LAYERS.map((layer, i) => (
        <div key={layer.tag}>
          <a className="hero__layer" href={layer.href}>
            <span>{layer.label}</span>
            <span>{layer.tag}</span>
          </a>
          {i < LAYERS.length - 1 && <div className="hero__connector" />}
        </div>
      ))}
    </nav>
  )
}
