// Canais oficiais de contato da Nexora.
// O `href` é o destino real do link: `mailto:` abre o cliente de e-mail padrão
// do dispositivo e `wa.me` abre a conversa no WhatsApp já com o número
// internacional completo (55 + DDD 94 + celular).
export const contactChannels = [
  {
    id: 'email',
    label: 'E-mail',
    value: 'eduardorodriguesodog@gmail.com',
    href: 'mailto:eduardorodriguesodog@gmail.com',
    hint: 'Abrir no aplicativo de e-mail',
  },
  {
    id: 'whatsapp',
    label: 'Telefone / WhatsApp',
    value: '(94) 9 8434-3166',
    href: 'https://wa.me/5594984343166',
    hint: 'Abrir conversa no WhatsApp',
    // Link externo: abre em nova aba sem dar acesso à aba de origem.
    external: true,
  },
]

export default contactChannels
