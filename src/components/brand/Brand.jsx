// Identidade visual da Nexora. A logo é um elemento independente de marca:
// NÃO é link, NÃO abre menu e NÃO navega — a navegação principal passou a ser
// feita pelos botões da Hero.
//
// O asset é o mesmo de antes (/nexora-logo.png) e a altura renderizada é
// mantida (56px / 46px no mobile) porque a animação de carregamento
// (NexoraIntro) mede este <img> para calcular a escala do símbolo no pouso.
//
// ATENÇÃO: `brand__img` é o gancho usado por NexoraIntro para achar o ponto de
// pouso da animação. Se esta classe mudar, o seletor em NexoraIntro.jsx
// precisa ser atualizado junto — caso contrário a animação cai no fallback
// fixo e o "N" pousa fora da logo.
export default function Brand() {
  return (
    <div className="brand">
      <div className="brand__inner">
        <img src="/nexora-logo.png" alt="Nexora" className="brand__img" />
      </div>
    </div>
  )
}