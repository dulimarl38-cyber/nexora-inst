// Botão base. variant: 'primary' | 'secondary'
export default function Button({ children, variant = 'primary', onClick, href, type = 'button' }) {
  const className = `btn btn--${variant}`
  if (href) {
    return <a href={href} className={className}>{children}</a>
  }
  return <button type={type} className={className} onClick={onClick}>{children}</button>
}
