// Categorias e tecnologias por camada — cada categoria agrupa as tecnologias
// que a Nexora usa naquela frente. `items` é renderizado como texto corrido
// separado por ·, no mesmo estilo editorial do restante do site.
export const technologies = [
  {
    id: 'web',
    title: 'Desenvolvimento Web',
    items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Vite'],
  },
  {
    id: 'backend',
    title: 'Backend & Dados',
    items: ['Node.js', 'APIs', 'PostgreSQL', 'Supabase', 'Integrações'],
  },
  {
    id: 'infra',
    title: 'Infraestrutura',
    items: ['Windows', 'Linux', 'Virtualização', 'Servidores', 'Cloud'],
  },
  {
    id: 'rede',
    title: 'Redes & Conectividade',
    items: ['TCP/IP', 'DNS', 'DHCP', 'Wi-Fi', 'Roteamento', 'Segurança de rede'],
  },
  {
    id: 'automacao',
    title: 'Automação & Integração',
    items: ['APIs', 'Webhooks', 'Automação de processos', 'Integrações entre sistemas'],
  },
  {
    id: 'seguranca',
    title: 'Segurança',
    items: ['Controle de acesso', 'Backup', 'Monitoramento', 'Boas práticas de segurança'],
  },
]

// Fecho da seção — ideia que resume a escolha de stack da Nexora.
export const technologiesClosing =
  'A tecnologia certa não é a mais complexa. É a que resolve o problema certo.'
