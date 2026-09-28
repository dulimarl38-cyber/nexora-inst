import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

// Seção de Infraestrutura — o conceito de camadas da marca. O texto explica o
// serviço; a corrente de movimentos percorre a seção inteira (estratos, nós e
// setas, parágrafos) com um único relógio, definido em infrastructure.css.
const CHAIN = ['Computador', 'Rede', 'Infraestrutura', 'Sistema', 'Aplicação']

// Três estratos horizontais. As posições em % são as mesmas que o fundo já
// usava — mudar apenas como elas são desenhadas e animadas.
const STRATA = [18, 40, 62]

// Uma linha de abertura, logo abaixo do título.
const LEAD = 'Uma infraestrutura de TI bem planejada é a base para que sistemas, redes e operações funcionem com estabilidade, segurança e eficiência.'

const BODY = [
  'Projetamos, organizamos e mantemos ambientes de infraestrutura considerando equipamentos, servidores, estações de trabalho, conectividade e recursos em nuvem. O objetivo é criar uma estrutura confiável, preparada para a rotina atual e capaz de acompanhar o crescimento do negócio.',
  'Da configuração dos equipamentos à organização do ambiente tecnológico, cada elemento é pensado para trabalhar em conjunto, reduzir problemas e facilitar a operação e a manutenção.',
]

export default function Infrastructure() {
  return (
    <section className="infrastructure" id="infrastructure">
      {/* Corrente contínua da seção. Puramente decorativa: some inteira da
          árvore de acessibilidade. */}
      <div className="infrastructure__strata" aria-hidden="true">
        {STRATA.map((top) => (
          <span key={top} className="infrastructure__stratum" style={{ top: `${top}%` }} />
        ))}
      </div>
      <Container>
        <SectionTitle
          eyebrow="Infraestrutura"
          title="Infraestrutura que sustenta o negócio"
          description={LEAD}
          split
        />
        {/* A corrente entra como uma sequência só: cada peça recebe um índice
            (`--i`) e o CSS tira dele a fase. Assim a distância entre duas
            peças é sempre a mesma — inclusive entre nós e setas. */}
        <div className="infrastructure__chain">
          {CHAIN.map((node, i) => (
            <span key={node} style={{ display: 'contents' }}>
              <span
                className={`infrastructure__node ${i === CHAIN.length - 1 ? 'infrastructure__node--accent' : ''}`}
                style={{ '--i': i * 2 }}
              >
                {node}
              </span>
              {i < CHAIN.length - 1 && (
                <span className="infrastructure__arrow" style={{ '--i': i * 2 + 1 }} aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="infrastructure__body">
          {BODY.map((paragraph, i) => (
            <p key={i} style={{ '--i': CHAIN.length * 2 - 1 + i }}>
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}

