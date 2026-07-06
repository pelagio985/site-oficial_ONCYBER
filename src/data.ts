import { Service, Testimonial } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: "Suporte Técnico & Helpdesk",
    description: "Consultoria especializada e suporte de TI ágil para resolução de problemas e manutenção contínua.",
    longDescription: "Garanta que as operações da sua empresa nunca parem com o nosso suporte técnico premium. Oferecemos Helpdesk remoto e presencial focado em resolver incidentes com rapidez e eficiência técnica, além de consultoria preventiva e otimização de sistemas corporativos.",
    iconName: "LifeBuoy",
    deliverables: [
      "Suporte remoto imediato e atendimento presencial",
      "Monitoramento ativo de servidores e endpoints",
      "Consultoria de melhoria operacional de TI",
      "Gestão de incidentes com SLA estruturado"
    ]
  },
  {
    id: 2,
    title: "Segurança & Backup",
    description: "Blindagem de dados críticos, auditorias e soluções de backup em nuvem resilientes a falhas.",
    longDescription: "Proteja o patrimônio digital da sua empresa contra ataques virtuais e vazamentos. Implementamos firewalls avançados, políticas estritas de controle de acesso, criptografia integral de dados e rotinas automatizadas de backup redundante local e em nuvem.",
    iconName: "ShieldAlert",
    deliverables: [
      "Auditoria completa de vulnerabilidade digital",
      "Backup em nuvem com alta redundância",
      "Instalação e gestão de Firewalls corporativos",
      "Recuperação de desastres e continuidade de negócios"
    ]
  },
  {
    id: 3,
    title: "Infraestrutura & Redes",
    description: "Projetos de cabeamento estruturado, roteamento de alta velocidade e otimização de sinal Wi-Fi.",
    longDescription: "Projetamos redes corporativas velozes, seguras e de alta estabilidade. Desde o cabeamento estruturado físico de switches e roteadores profissionais até a segmentação lógica de rede e distribuição homogênea de sinal Wi-Fi corporativo de alta densidade.",
    iconName: "Network",
    deliverables: [
      "Projetos e organização de racks e cabeamento estruturado",
      "Otimização de Wi-Fi corporativo de alto desempenho",
      "Instalação e configuração de switches e roteadores",
      "Segmentação lógica de tráfego e redes de convidados (VLANs)"
    ]
  },
  {
    id: 4,
    title: "Soluções em Nuvem",
    description: "Migração segura para a nuvem, servidores virtuais e gerenciamento completo de serviços Cloud.",
    longDescription: "Leve sua organização para o próximo nível operacional integrando soluções híbridas ou 100% na nuvem. Oferecemos planejamento, execução de migração e gerenciamento constante de serviços que reduzem seus custos físicos e trazem escalabilidade ilimitada.",
    iconName: "Cloud",
    deliverables: [
      "Migração de arquivos e servidores físicos para Cloud",
      "Configuração de servidores virtuais e bancos de dados",
      "Implementação de ferramentas de colaboração (Google Workspace)",
      "Redução de custos de infraestrutura on-premise"
    ]
  },
  {
    id: 5,
    title: "Montagem & Manutenção de PCs",
    description: "Diagnóstico especializado, substituição de hardware e otimização geral de sistemas operacionais.",
    longDescription: "Aumente consideravelmente a vida útil das suas máquinas de trabalho. Efetuamos limpezas físicas preventivas profundas, diagnósticos de defeitos de placa, substituição estratégica de peças (HD para SSD, RAM) e formatação otimizada profissional.",
    iconName: "Cpu",
    deliverables: [
      "Limpeza interna preventiva e troca de pasta térmica",
      "Upgrade de componentes (SSD, Memória RAM, Processador)",
      "Formatação otimizada e remoção de vírus/malwares",
      "Configuração sob medida de estações de trabalho profissionais"
    ]
  },
  {
    id: 6,
    title: "Instalação de Escritórios",
    description: "Montagem física de computadores, monitores, impressoras, periféricos e organização de cabos.",
    longDescription: "Instale seu novo espaço comercial sem dor de cabeça. Realizamos a instalação física e lógica de todos os equipamentos de informática de seus colaboradores: montagem física, cabeamento de mesa impecável (Cable Management) e conexão em rede corporativa.",
    iconName: "Monitor",
    deliverables: [
      "Organização estética e estruturada de cabos (Cable Management)",
      "Fixação de monitores articulados e impressoras de rede",
      "Montagem organizada das estações dos colaboradores",
      "Integração de equipamentos e verificação completa de operação"
    ]
  },
  {
    id: 7,
    title: "Venda de Equipamentos",
    description: "Fornecimento de computadores de alto desempenho, notebooks corporativos e periféricos de ponta.",
    longDescription: "Adquira hardware corporativo durável, confiável e com excelente custo-benefício. Através de parcerias com fornecedores nacionais e internacionais, oferecemos venda direta e sob encomenda de computadores profissionais, notebooks, servidores e insumos de escritório.",
    iconName: "ShoppingCart",
    deliverables: [
      "Venda sob demanda de notebooks e desktops corporativos",
      "Fornecimento de insumos e consumíveis para escritório",
      "Garantia oficial e suporte de hardware incluso",
      "Melhor relação custo-benefício do mercado de TI"
    ]
  },
  {
    id: 8,
    title: "Marketing & Automação Digital",
    description: "Desenvolvimento de Landing Pages de alta conversão, design gráfico e automação de processos digitais.",
    longDescription: "Aumente a visibilidade e eficiência operacional da sua empresa. Desenvolvemos sites de alto impacto, criamos identidades visuais corporativas impactantes e automatizamos fluxos internos de processos digitais (como CRM e envio de faturas).",
    iconName: "Zap",
    deliverables: [
      "Desenvolvimento de Landing Pages responsivas ultra velozes",
      "Criação de marcas, banners e materiais gráficos corporativos",
      "Automação de e-mails, alertas e fluxos de atendimento",
      "Integração inteligente de sistemas empresariais"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Arnaldo Manuel",
    role: "Diretor Executivo",
    company: "CaboInvest Empreendimentos",
    rating: 5,
    feedback: "A ONCYBER reestruturou toda a nossa rede empresarial em Pemba. O profissionalismo na organização de cabos e na segurança de dados foi impecável. Hoje temos estabilidade total.",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    id: 2,
    name: "Lúcia Macuácua",
    role: "Gestora de Operações",
    company: "Logística do Norte",
    rating: 5,
    feedback: "O suporte técnico preventivo da ONCYBER é excelente. Desde que assinamos o plano de helpdesk mensal, os computadores do nosso escritório trabalham rápidos e livres de interrupções.",
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    id: 3,
    name: "Rui Tembe",
    role: "Gerente Geral",
    company: "Pemba Consulting",
    rating: 5,
    feedback: "Excelente serviço de migração para a nuvem. Migramos nossos servidores físicos para o Google Cloud sem perder um único minuto de trabalho, tudo com consultoria exemplar.",
    avatar: "https://picsum.photos/seed/user3/100/100"
  },
  {
    id: 4,
    name: "Catarina Mondlane",
    role: "Fundadora & Designer",
    company: "Estúdio Criativo Mondlane",
    rating: 5,
    feedback: "A criação de nossa landing page de alta performance e as automações de processos digitais elevaram nossas vendas. Um atendimento focado em gerar valor e confiança.",
    avatar: "https://picsum.photos/seed/user4/100/100"
  },
  {
    id: 5,
    name: "Elias Chissano",
    role: "Administrador Financeiro",
    company: "Norte Seguros SA",
    rating: 5,
    feedback: "Contratamos a ONCYBER para auditoria de segurança e backup em nuvem. Agora podemos garantir aos nossos clientes que seus dados financeiros estão 100% blindados de ameaças.",
    avatar: "https://picsum.photos/seed/user5/100/100"
  },
  {
    id: 6,
    name: "Mariana Alface",
    role: "Diretora Comercial",
    company: "Cariacó Distribuidora",
    rating: 5,
    feedback: "Fizeram a venda e montagem de todas as máquinas do nosso novo escritório com cable management impecável. Nosso espaço ficou limpo, elegante e altamente tecnológico.",
    avatar: "https://picsum.photos/seed/user6/100/100"
  }
];

export const PARTNER_LOGOS = [
  { name: "Google", displayName: "Google" },
  { name: "Meta", displayName: "Meta" },
  { name: "X", displayName: "X" },
  { name: "NVIDIA", displayName: "NVIDIA" },
  { name: "PlayStation", displayName: "PlayStation" },
  { name: "Xbox", displayName: "Xbox" }
];
