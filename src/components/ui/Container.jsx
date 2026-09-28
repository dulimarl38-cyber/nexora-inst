// Wrapper de largura máxima centralizado, usado por todas as seções.
export default function Container({ children, className = '' }) {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}
