// Rodapé institucional. Conteúdo final (links, redes, endereço) a definir.
const NAV_ITEMS = [
  { label: 'Nexora', href: '#about' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Processo', href: '#process' },
  { label: 'Contato', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div className="footer__logo">Nex<span>ora</span></div>
            <p className="footer__tagline">Do primeiro computador à aplicação que roda nele.</p>
          </div>
          <nav className="footer__nav">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          © {new Date().getFullYear()} Nexora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
