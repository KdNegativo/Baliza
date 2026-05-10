import { useEffect, useState } from 'react'

const PHONE_DISPLAY = '(61) 9 9999-9999'
const BRAND_NAME = 'Baliza Veiculos Eletricos'
const WHATSAPP =
  'https://wa.me/5561999999999?text=Olá! Vim pelo site da Baliza Veiculos Eletricos e quero avaliar meu patinete.'

const MAPS_COORDS = '-15.8380955,-48.0328055'
const MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_COORDS}`
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_COORDS}&hl=pt-BR&z=18&ie=UTF8&iwloc=B&output=embed`

const navLinks = [
  ['Serviços', '#servicos'],
  ['Diagnóstico', '#diagnostico'],
  ['Processo', '#processo'],
  ['Bancada', '#responsavel'],
  ['Contato', '#contato'],
]

const services = [
  {
    title: 'Eletrônica e controladora',
    desc: 'Análise de placa, chicote, sensores, conectores, trilhas e componentes antes de recomendar troca completa.',
    items: ['MOSFET', 'capacitores', 'sensor Hall', 'conectores'],
    visual: 'board',
    meta: 'sinal, placa e chicote',
    accent: 'green',
  },
  {
    title: 'Bateria, BMS e carregamento',
    desc: 'Teste de tensão por grupo, avaliação de BMS, conectores, carregador e perda de autonomia.',
    items: ['36V a 52V', 'BMS', 'balanceamento', 'carga'],
    visual: 'battery',
    meta: 'autonomia e proteção',
    accent: 'amber',
  },
  {
    title: 'Freio, pneu e mecânica',
    desc: 'Correção de folga, vibração, freio raspando, rolamentos e conjunto de roda/motor.',
    items: ['freio a disco', 'pneu', 'rolamento', 'mastro'],
    visual: 'wheel',
    meta: 'rodagem e segurança',
    accent: 'clay',
  },
]

const labModules = [
  ['Entrada', 'Modelo, sintoma, foto e histórico do defeito antes de marcar a avaliação.'],
  ['Bancada', 'Medição elétrica, inspeção visual, teste de comandos e causa provável.'],
  ['Decisão', 'Orçamento claro: reparar, substituir, aguardar peça ou não compensar.'],
  ['Entrega', 'Teste funcional e orientação de uso para evitar retorno do mesmo problema.'],
]

const process = [
  ['01', 'Triagem pelo WhatsApp', 'Você envia modelo, sintoma e fotos. Quando possível, já recebe uma orientação inicial.'],
  ['02', 'Diagnóstico de bancada', 'O equipamento é aberto, medido e avaliado com atenção à causa real do defeito.'],
  ['03', 'Orçamento documentado', 'Você recebe a explicação do problema, valor, prazo e o que será substituído.'],
  ['04', 'Reparo e teste final', 'Depois da aprovação, o patinete é reparado e testado antes da retirada ou entrega.'],
]

const standards = [
  {
    title: 'Registro visual do defeito',
    text: 'Fotos e explicação do que foi encontrado antes de aprovar o reparo.',
    tag: 'evidência',
    status: 'defeito documentado',
  },
  {
    title: 'Orçamento com escopo fechado',
    text: 'Você sabe o que será feito, quanto custa e quando fica pronto.',
    tag: 'clareza',
    status: 'peça e mão de obra',
  },
  {
    title: 'Teste funcional antes da entrega',
    text: 'Carga, freio, painel, aceleração e comportamento geral são conferidos.',
    tag: 'entrega',
    status: 'teste final conferido',
  },
]

const checklist = [
  ['Alimentação', 'tensão de pack, carregador e conectores'],
  ['Comando', 'acelerador, freio, painel e sensor Hall'],
  ['Controladora', 'trilhas, MOSFETs, capacitores e chicote'],
  ['Bateria', 'grupos de células, BMS e queda de tensão'],
  ['Rodagem', 'freio, pneu, rolamento e folgas'],
  ['Teste final', 'partida, carga, frenagem e comportamento geral'],
]

const inspectionCells = [
  ['Pack', '41.6V'],
  ['BMS', 'ativo'],
  ['Hall', 'sinal'],
  ['Freio', 'corte'],
  ['Painel', 'responde'],
  ['Carga', '2.0A'],
  ['Motor', 'giro'],
  ['Pneu', 'pressão'],
  ['Chicote', 'limpo'],
]

const faqs = [
  {
    q: 'O diagnóstico é feito antes do orçamento?',
    a: 'Sim. A proposta é avaliar na bancada antes de indicar troca de placa, bateria ou qualquer peça de maior custo.',
  },
  {
    q: 'Atende só patinete Xiaomi?',
    a: 'Não. Além de Xiaomi e Ninebot, também são avaliados modelos nacionais, importados e scooters elétricos similares.',
  },
  {
    q: 'Dá para combinar busca ou entrega?',
    a: 'Dá para verificar disponibilidade em Águas Claras, Taguatinga, Guará e regiões próximas pelo WhatsApp.',
  },
  {
    q: 'O que preciso enviar pelo WhatsApp?',
    a: 'Envie modelo do patinete, sintoma principal, foto do painel e, se possível, um vídeo curto mostrando o defeito.',
  },
]

function IconWhatsapp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M17.47 14.38c-.32-.16-1.9-.93-2.2-1.04-.3-.11-.51-.16-.72.16-.21.32-.82 1.04-.99 1.25-.17.21-.35.24-.67.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.39-.26-.63-.53-.54-.72-.55l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61 0 1.54 1.13 3.03 1.29 3.24.16.21 2.22 3.39 5.38 4.76.75.32 1.34.52 1.79.66.75.24 1.43.21 1.97.13.6-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.29-.21-.61-.37z" />
      <path d="M12 0C5.37 0 0 5.37 0 12c0 2.13.56 4.13 1.53 5.87L0 24l6.35-1.49C8.1 23.46 10.02 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 22c-1.9 0-3.67-.52-5.18-1.42l-.37-.22-3.77.89.9-3.67-.24-.38C2.54 15.72 2 13.93 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-main">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-line" aria-hidden="true" />
          <span className="brand-copy">
            <strong>Baliza</strong>
            <em>Veiculos Eletricos</em>
            <small>Bancada técnica independente</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map(([label, href], index) => (
            <a key={href} href={href}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <span>{label}</span>
              <i />
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-status" aria-hidden="true">
            <span />
            <strong>Atendimento direto</strong>
            <small>Águas Claras / DF</small>
          </div>

          <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
            <IconWhatsapp />
            <span>Solicitar avaliação</span>
          </a>
        </div>

        <button
          className={`menu-button${open ? ' is-open' : ''}`}
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${open ? ' is-open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={close}>
          Solicitar avaliação
        </a>
      </div>
    </header>
  )
}

function useRevealMotion() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reveal'))

    if (!items.length) return undefined

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -12%',
        threshold: 0.18,
      },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace('#', ''))
      const target = id ? document.getElementById(id) : null

      if (target) {
        target.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'))
        if (target.classList.contains('reveal')) target.classList.add('is-visible')
        window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
      }
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)

    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])
}

function ScooterBlueprint() {
  return (
    <svg className="scooter-blueprint" viewBox="20 38 570 294" aria-hidden="true">
      <defs>
        <linearGradient id="blueprintLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#5ee0a1" stopOpacity="0.15" />
          <stop offset="45%" stopColor="#5ee0a1" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e2a75f" stopOpacity="0.24" />
        </linearGradient>
      </defs>
      <path className="blueprint-grid" d="M20 300H590M20 248H590M20 196H590M20 144H590M20 92H590" />
      <path className="blueprint-grid" d="M78 50V320M154 50V320M230 50V320M306 50V320M382 50V320M458 50V320M534 50V320" />
      <circle className="wheel-outline" cx="156" cy="262" r="58" />
      <circle className="wheel-outline" cx="452" cy="262" r="58" />
      <circle className="wheel-core" cx="156" cy="262" r="16" />
      <circle className="wheel-core" cx="452" cy="262" r="16" />
      <path className="scooter-frame" d="M156 262H336L432 128M318 262L392 164H470" />
      <path className="scooter-frame thin" d="M432 128V62M405 62H482M336 262L390 262M224 238H330" />
      <path className="pulse-route" d="M156 262H336L432 128V62H482" />
      <rect className="deck" x="206" y="230" width="148" height="24" rx="8" />
      <circle className="blueprint-node active" cx="336" cy="262" r="8" />
      <circle className="blueprint-node" cx="432" cy="128" r="8" />
      <circle className="blueprint-node warn" cx="224" cy="238" r="8" />
    </svg>
  )
}

function WorkbenchVisual() {
  return (
    <div className="workbench-visual" aria-label="Visual técnico de diagnóstico de patinete">
      <div className="bench-card bench-main">
        <span className="bench-glow" />
        <span className="scan-beam" />
        <div className="bench-toolbar">
          <span>OS-014</span>
          <b>diagnóstico em bancada</b>
        </div>
        <ScooterBlueprint />
        <div className="fault-points">
          <span><i /> BMS em teste</span>
          <span><i /> Freio ok</span>
          <span><i /> Painel ok</span>
        </div>
      </div>

      <div className="bench-card service-order">
        <div className="order-head">
          <span>Bancada Baliza</span>
          <b>em avaliação</b>
        </div>
        <div className="live-meter">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="order-item">
          <span>Sintoma</span>
          <strong>liga e corta aceleração</strong>
        </div>
        <div className="order-item">
          <span>Leitura</span>
          <strong>41.6V no pack</strong>
        </div>
        <div className="order-item">
          <span>Hipótese</span>
          <strong>queda sob carga</strong>
        </div>
        <div className="order-progress">
          <span />
        </div>
        <small>Orçamento liberado só depois da medição completa.</small>
      </div>
    </div>
  )
}

function BrakeVisual() {
  const holes = Array.from({ length: 12 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 12 + Math.PI / 12
    return {
      cx: 132 + Math.cos(angle) * 48,
      cy: 110 + Math.sin(angle) * 48,
    }
  })
  const bolts = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 6
    return {
      cx: 132 + Math.cos(angle) * 25,
      cy: 110 + Math.sin(angle) * 25,
    }
  })

  return (
    <svg className="service-visual brake-visual" viewBox="0 0 360 220" aria-hidden="true">
      <defs>
        <radialGradient id="brakeDisc" cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#f7faf6" />
          <stop offset="48%" stopColor="#b7c0b7" />
          <stop offset="100%" stopColor="#5d675f" />
        </radialGradient>
        <linearGradient id="caliperGradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#0f2a1d" />
          <stop offset="58%" stopColor="#20d982" />
          <stop offset="100%" stopColor="#b7f45d" />
        </linearGradient>
      </defs>
      <path className="brake-shadow" d="M58 170C111 201 240 199 303 160" />
      <g className="brake-disc-svg">
        <circle className="disc-outer" cx="132" cy="110" r="68" />
        <circle className="disc-track" cx="132" cy="110" r="51" />
        {holes.map((hole) => (
          <circle className="disc-hole" key={`${hole.cx}-${hole.cy}`} cx={hole.cx} cy={hole.cy} r="4.6" />
        ))}
        {bolts.map((bolt) => (
          <circle className="disc-bolt" key={`${bolt.cx}-${bolt.cy}`} cx={bolt.cx} cy={bolt.cy} r="3.8" />
        ))}
        <circle className="disc-hub" cx="132" cy="110" r="19" />
        <circle className="disc-center" cx="132" cy="110" r="10" />
      </g>
      <g className="brake-caliper-svg">
        <path className="caliper-shell" d="M198 54H286C304 54 318 68 318 86V134C318 152 304 166 286 166H198V141H280C286 141 291 136 291 130V90C291 84 286 79 280 79H198Z" />
        <path className="caliper-window" d="M218 92H270V128H218Z" />
        <rect className="brake-pad-svg pad-inner" x="184" y="84" width="17" height="52" rx="5" />
        <rect className="brake-pad-svg pad-outer" x="252" y="86" width="17" height="48" rx="5" />
        <path className="caliper-bridge-line" d="M204 76H282M204 144H282" />
        <circle className="caliper-bolt" cx="297" cy="79" r="4.5" />
        <circle className="caliper-bolt" cx="297" cy="141" r="4.5" />
      </g>
      <path className="brake-energy" d="M91 185H279" />
      <text className="visual-label brake-label disc-label" x="58" y="199">
        disco
      </text>
      <text className="visual-label brake-label caliper-label" x="236" y="199">
        pinça e pastilha
      </text>
    </svg>
  )
}

function ServiceVisual({ type }) {
  if (type === 'battery') {
    return (
      <svg className="service-visual battery-visual" viewBox="0 0 360 220" aria-hidden="true">
        <defs>
          <linearGradient id="batteryCharge" x1="0" x2="1">
            <stop offset="0%" stopColor="#19d37d" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#19d37d" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#b7f45d" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect className="battery-shell" x="54" y="58" width="252" height="104" rx="18" />
        <rect className="battery-tip" x="306" y="92" width="18" height="36" rx="6" />
        {[0, 1, 2, 3, 4].map((item) => (
          <g className="battery-slot" style={{ '--i': item }} key={item}>
            <rect className="battery-cell" x={76 + item * 42} y="76" width="28" height="68" rx="8" />
            <rect className="battery-fill" x={80 + item * 42} y="126" width="20" height="14" rx="5" />
          </g>
        ))}
        <path className="battery-bus" d="M76 108H286" />
        <path className="battery-bus battery-bus-soft" d="M76 124H286" />
        <circle className="charge-dot" r="6">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M76 108H286" />
        </circle>
        <circle className="charge-dot charge-dot-soft" r="4">
          <animateMotion dur="3s" repeatCount="indefinite" path="M286 124H76" />
        </circle>
        <text className="visual-label" x="56" y="198">
          leitura por grupos de células
        </text>
      </svg>
    )
  }

  if (type === 'wheel') {
    return <BrakeVisual />
  }

  return (
    <svg className="service-visual board-visual" viewBox="0 0 360 220" aria-hidden="true">
      <rect className="board-base" x="54" y="42" width="252" height="138" rx="18" />
      <rect className="board-chip" x="134" y="78" width="88" height="64" rx="10" />
      <path className="board-line" d="M82 78H134M222 92H278M82 140H134M222 132H278M178 42V78M178 142V180" />
      <circle className="board-node active" cx="82" cy="78" r="8" />
      <circle className="board-node" cx="278" cy="92" r="8" />
      <circle className="board-node warn" cx="82" cy="140" r="8" />
      <circle className="board-node" cx="278" cy="132" r="8" />
      <path className="service-pulse" d="M82 78H134V110H222V92H278" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Bancada independente em Águas Claras / Brasília</p>
          <h1>
            <span>Patinete parado?</span>
            <span>Diagnóstico antes</span>
            <span>da troca.</span>
          </h1>
          <p>
            Reparo feito por especialista independente, com medição real na bancada, orçamento explicado e contato direto
            com quem abre o equipamento.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={WHATSAPP} target="_blank" rel="noreferrer">
              <IconWhatsapp />
              Solicitar avaliação
            </a>
            <a className="button secondary" href="#diagnostico">
              Ver método técnico
              <IconArrow />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <WorkbenchVisual />
        </div>
      </div>
    </section>
  )
}

function CredibilityBar() {
  return (
    <section className="credibility" id="bancada">
      <div className="metric reveal">
        <strong>1:1</strong>
        <span>contato direto com quem faz o reparo</span>
      </div>
      <div className="metric reveal">
        <strong>Antes</strong>
        <span>orçamento aprovado antes de trocar peça</span>
      </div>
      <div className="metric reveal">
        <strong>Bancada</strong>
        <span>diagnóstico com medição e inspeção visual</span>
      </div>
      <div className="metric reveal">
        <strong>Teste</strong>
        <span>freio, painel, carga e aceleração conferidos</span>
      </div>
    </section>
  )
}

function LabDeck() {
  return (
    <section className="lab-deck">
      <div className="lab-deck-inner">
        <div className="lab-copy reveal">
          <span>Fluxo de atendimento</span>
          <h2>Do primeiro sintoma à entrega, tudo fica claro.</h2>
          <p>
            O atendimento começa com uma triagem simples e avança para medição real na bancada. O cliente entende o que
            está acontecendo antes de aprovar qualquer troca de peça.
          </p>
        </div>
        <div className="lab-modules">
          {labModules.map(([title, text], index) => (
            <article className="lab-module reveal" key={title}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section services" id="servicos">
      <div className="section-heading reveal">
        <span>Serviços</span>
        <h2>Especialidade técnica, processo claro e custo explicado.</h2>
        <p>
          O foco é encontrar a causa do defeito antes de transformar tudo em troca de peça. Quando reparar compensa, o
          orçamento mostra exatamente o que será feito.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => (
          <article className={`service-card ${service.accent} reveal`} key={service.title}>
            <div className="service-topline">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{service.meta}</b>
            </div>
            <ServiceVisual type={service.visual} />
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Standards() {
  return (
    <section className="standards">
      <div className="standards-inner">
        <div className="standards-head reveal">
          <span>Padrão de bancada</span>
          <h2>Processo registrado, sem orçamento no escuro.</h2>
          <p>
            O cliente fala com quem abre o patinete. Cada etapa fica clara: sintoma, medição, causa provável, orçamento e
            teste final antes da retirada.
          </p>
          <div className="standards-console" aria-hidden="true">
            <div className="console-top">
              <span>OS-014</span>
              <b>fluxo validado</b>
            </div>
            <div className="console-scan">
              <i />
              <i />
              <i />
            </div>
            <div className="console-rows">
              <span>
                <b>entrada</b>
                foto + sintoma
              </span>
              <span>
                <b>bancada</b>
                medição real
              </span>
              <span>
                <b>saída</b>
                teste final
              </span>
            </div>
          </div>
        </div>
        <div className="standard-grid">
          {standards.map((item, index) => (
            <article className="standard-card reveal" style={{ '--i': index }} key={item.title}>
              <div className="standard-card-top">
                <b>{String(index + 1).padStart(2, '0')}</b>
                <span>{item.tag}</span>
              </div>
              <div className={`standard-visual standard-visual-${index + 1}`} aria-hidden="true">
                {index === 2 ? (
                  <svg className="final-test-svg" viewBox="0 0 260 132">
                    <rect className="final-panel" x="24" y="18" width="212" height="96" rx="14" />
                    <text className="final-title" x="42" y="43">TESTE FINAL</text>
                    <g className="final-row final-row-1">
                      <circle cx="44" cy="60" r="7" />
                      <path d="M40 60L43 63L49 56" />
                      <text x="60" y="64">carga</text>
                      <rect x="112" y="55" width="92" height="8" rx="4" />
                      <line x1="112" y1="59" x2="196" y2="59" />
                    </g>
                    <g className="final-row final-row-2">
                      <circle cx="44" cy="80" r="7" />
                      <path d="M40 80L43 83L49 76" />
                      <text x="60" y="84">freio</text>
                      <rect x="112" y="75" width="92" height="8" rx="4" />
                      <line x1="112" y1="79" x2="188" y2="79" />
                    </g>
                    <g className="final-row final-row-3">
                      <circle cx="44" cy="100" r="7" />
                      <path d="M40 100L43 103L49 96" />
                      <text x="60" y="104">painel</text>
                      <rect x="112" y="95" width="92" height="8" rx="4" />
                      <line x1="112" y1="99" x2="202" y2="99" />
                    </g>
                    <path className="final-scan" d="M32 50H228" />
                  </svg>
                ) : (
                  <>
                    <span />
                    <span />
                    <span />
                    <span />
                  </>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="standard-status">
                <i />
                <span>{item.status}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DiagnosticMethod() {
  return (
    <section className="section method" id="diagnostico">
      <div className="method-copy reveal">
        <span>Diagnóstico</span>
        <h2>O orçamento nasce de medição, não de chute.</h2>
        <p>
          Antes de recomendar controladora, bateria ou conjunto mecânico, o equipamento passa por verificação de tensão,
          conectores, sinais, freio, aceleração e comportamento em carga.
        </p>
      </div>

      <div className="report-card reveal">
        <div className="report-top">
          <strong>Relatório de bancada</strong>
          <span>exemplo</span>
        </div>
        <div className="report-row">
          <span>Sintoma</span>
          <b>painel reinicia ao acelerar</b>
        </div>
        <div className="report-row">
          <span>Leitura inicial</span>
          <b>conector de fase oxidado</b>
        </div>
        <div className="report-row">
          <span>Próximo passo</span>
          <b>medir resistência sob carga</b>
        </div>
        <div className="report-row">
          <span>Aprovação</span>
          <b>antes de substituir peça</b>
        </div>
      </div>
    </section>
  )
}

function Checklist() {
  return (
    <section className="checklist-section" id="checklist">
      <div className="checklist-inner">
        <div className="checklist-copy reveal">
          <span>Checklist técnico</span>
          <h2>O que é verificado antes de fechar o orçamento.</h2>
          <p>
            A avaliação cruza elétrica, comando, bateria e rodagem. A ideia é entender a causa do defeito antes de
            sugerir troca de peça.
          </p>
          <div className="inspection-panel" aria-hidden="true">
            <div className="inspection-head">
              <span>scan de bancada</span>
              <b>ativo</b>
            </div>
            <div className="inspection-grid">
              {inspectionCells.map(([label, value], index) => (
                <span className="inspection-cell" style={{ '--i': index }} key={label}>
                  <b>{label}</b>
                  <em>{value}</em>
                  <i />
                </span>
              ))}
            </div>
            <div className="inspection-readout">
              <span>leitura final</span>
              <strong>9/9 OK</strong>
            </div>
          </div>
        </div>
        <div className="checklist-grid">
          {checklist.map(([title, text], index) => (
            <article className="check-item reveal" style={{ '--i': index }} key={title}>
              <span className="check-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>verificado</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section process" id="processo">
      <div className="section-heading reveal">
        <span>Processo</span>
        <h2>Do primeiro contato ao teste final.</h2>
      </div>
      <div className="timeline">
        {process.map(([number, title, text]) => (
          <article className="timeline-step reveal" key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Responsible() {
  return (
    <section className="section responsible" id="responsavel">
      <div className="responsible-card reveal">
        <div>
          <span>Responsável técnico</span>
          <h2>Atendimento independente com padrão profissional.</h2>
        </div>
        <div>
          <p>
            A Baliza funciona como uma bancada técnica especializada, com atendimento direto: a mesma pessoa que recebe o
            sintoma, abre o equipamento, faz a medição e explica o orçamento.
          </p>
          <p>
            Esse formato deixa o serviço mais transparente e evita substituições desnecessárias quando o defeito está em
            componente, conector, BMS ou ajuste mecânico.
          </p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq">
      <div className="faq-inner">
        <div className="faq-copy reveal">
          <span>Dúvidas frequentes</span>
          <h2>Antes de levar, já dá para adiantar o diagnóstico.</h2>
          <p>
            Quanto melhor a informação inicial, mais rápido fica separar sintoma, causa provável e próximo passo de
            bancada.
          </p>

          <div className="faq-precheck" aria-hidden="true">
            <div className="faq-precheck-top">
              <span>pré-check pelo WhatsApp</span>
              <b>4 itens</b>
            </div>
            <div className="faq-precheck-grid">
              <i>modelo</i>
              <i>sintoma</i>
              <i>foto</i>
              <i>vídeo</i>
            </div>
          </div>
        </div>

        <div className="faq-board reveal">
          <div className="faq-board-head">
            <span>respostas rápidas</span>
            <b>toque para abrir</b>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <article className={`faq-item${open === index ? ' is-open' : ''}`} key={item.q}>
                <button type="button" onClick={() => setOpen(open === index ? null : index)}>
                  <span>{item.q}</span>
                  <b>{open === index ? '-' : '+'}</b>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contato">
      <div className="contact-card reveal">
        <div className="contact-copy">
          <span>Contato</span>
          <h2>Solicite uma avaliação pelo WhatsApp.</h2>
          <p>
            Atendimento em Águas Claras, Brasília - DF. Envie o sintoma, modelo do patinete e uma foto para orientar o
            melhor próximo passo.
          </p>
          <div className="contact-actions">
            <a className="button primary" href={WHATSAPP} target="_blank" rel="noreferrer">
              <IconWhatsapp />
              Chamar no WhatsApp
            </a>
            <a className="button secondary" href={MAPS_DIR} target="_blank" rel="noreferrer">
              Abrir rota
              <IconArrow />
            </a>
          </div>
        </div>
        <a className="map-frame" href={MAPS_DIR} target="_blank" rel="noreferrer" aria-label="Abrir rota no Google Maps">
          <iframe
            src={MAPS_EMBED}
            title="Localização da Baliza em Águas Claras"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span>{BRAND_NAME}</span>
      <a href={WHATSAPP} target="_blank" rel="noreferrer">
        {PHONE_DISPLAY}
      </a>
    </footer>
  )
}

function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`sticky-cta${visible ? ' is-visible' : ''}`}
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
    >
      <IconWhatsapp />
      Avaliação
    </a>
  )
}

export default function App() {
  useRevealMotion()
  useHashScroll()

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <LabDeck />
        <Standards />
        <Services />
        <DiagnosticMethod />
        <Checklist />
        <Process />
        <Responsible />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
