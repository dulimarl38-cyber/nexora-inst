// Divide uma palavra aproximadamente ao meio (por caracteres) e devolve as duas
// metades: a primeira fica preenchida e a segunda fica vazada.
// O corte é 50/50 arredondado para baixo (a metade preenchida nunca fica maior
// que a vazada) e nunca deixa a palavra inteira vazada.
// Array.from preserva caracteres compostos/acentuados como um só caractere.
// Uso interno: a variante 'half' logo abaixo é a única que consome isto.
function splitWord(word) {
  const chars = Array.from(word);
  const mid = Math.max(1, Math.floor(chars.length / 2));
  return {
    filled: chars.slice(0, mid).join(''),
    outlined: chars.slice(mid).join('')
  };
}

// Tipografia de título do site. O tratamento padrão é o corte por linha
// diagonal: duas cópias IDÊNTICAS e sobrepostas do mesmo texto — uma preenchida
// e uma contornada — recortadas pela MESMA linha diagonal com máscaras
// complementares. O corte é geométrico: a letra que a linha atravessa fica com
// uma parte preenchida e outra vazada (não existe divisão por caracteres nem
// por palavras).
//
// variant="half" mantém o efeito anterior: cada palavra dividida internamente ao
// meio, primeira metade preenchida e segunda contornada, preservando os espaços.
export default function SplitTitle({
  children,
  className = '',
  as: Component = 'h2',
  variant = 'diagonal',
  angle = -22
}) {
  if (variant === 'diagonal') {
    const style = { '--cut-angle': `${angle}deg` };

    return (
      <Component className={`split-title split-title--diagonal ${className}`.trim()} style={style}>
        {/* cópia real: é este texto que leitores de tela leem */}
        <span className="split-title__filled">{children}</span>
        {/* cópia decorativa, exatamente por cima da primeira */}
        <span className="split-title__outlined" aria-hidden="true">{children}</span>
        {/* a linha que define o corte (recortada na caixa do título) */}
        <span className="split-title__line-clip" aria-hidden="true">
          <span className="split-title__line" />
        </span>
      </Component>
    );
  }

  const text = typeof children === 'string' ? children : String(children ?? '');
  const words = text.length > 0 ? text.split(' ') : [];

  const parts = [];
  words.forEach((word, i) => {
    const { filled, outlined } = splitWord(word);
    if (i > 0) {
      parts.push(' ');
    }
    parts.push(
      <span key={`${i}-filled`} className="split-title__filled">{filled}</span>
    );
    if (outlined) {
      parts.push(
        <span key={`${i}-outlined`} className="split-title__outlined">{outlined}</span>
      );
    }
  });

  return (
    <Component className={`split-title ${className}`.trim()}>
      {parts}
    </Component>
  );
}