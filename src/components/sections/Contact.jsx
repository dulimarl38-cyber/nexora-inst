import SectionTitle from '../ui/SectionTitle'
import Container from '../ui/Container'

import { contactChannels } from '../../data/contact'

// Sem formulário: a seção é a porta de entrada direta para o e-mail e para o
// WhatsApp, com o atendimento identificado. Cada canal clicável é um <a> de
// verdade — funciona com mouse, teclado e toque, e navega para o destino real.
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <Container>
        <SectionTitle
          eyebrow="Contato"
          title="Vamos conversar"
          description="Conte o que sua empresa precisa — da infraestrutura ao sistema."
        />
        {/* <address> marca o bloco de coordenadas de contato da organização. */}
        <address className="contact__info">
          {contactChannels.map((channel, i) => (
            <div
              key={channel.id}
              className={`contact__info-item contact__info-item--link reveal reveal--delay-${i + 1}`}
            >
              <span className="contact__info-label">{channel.label}</span>
              <a
                className="contact__link"
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="contact__link-value">{channel.value}</span>
                <span className="contact__link-hint">{channel.hint}</span>
              </a>
            </div>
          ))}
        </address>
      </Container>
    </section>
  )
}
