import { useEffect, useState } from 'react'

const PHONE_DISPLAY = '(61) 9 9999-9999'
const BRAND_NAME = 'Baliza Veiculos Eletricos'
const WHATSAPP =
  'https://wa.me/5561999999999?text=Olá! Vim pelo site da Baliza Veiculos Eletricos e quero avaliar meu patinete.'

const MAPS_COORDS = '-15.8380955,-48.0328055'
const MAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_COORDS}`
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_COORDS}&hl=pt-BR&z=18&ie=UTF8&iwloc=B&output=embed`

const navLinks = [
  ['Orçamento', '#orcamento'],
  ['Reparos', '#servicos'],
  ['Contato', '#contato'],
]

const services = [
  {
    title: 'Não liga ou aparece erro',
    desc: 'O patinete apagou, reinicia sozinho, perdeu força ou mostra algum erro no painel.',
    help: 'Mande uma foto do painel e conte quando o problema começou.',
    items: ['não liga', 'erro no painel', 'desliga'],
    visual: 'board',
    meta: 'não liga',
    accent: 'green',
  },
  {
    title: 'Não carrega ou acaba rápido',
    desc: 'A bateria dura pouco, não aceita carga, o carregador não resolve ou a autonomia caiu muito.',
    help: 'Mande foto do carregador, do painel e diga quanto tempo a carga está durando.',
    items: ['não carrega', 'dura pouco', 'carregador'],
    visual: 'battery',
    meta: 'carga',
    accent: 'amber',
  },
  {
    title: 'Freio, pneu ou barulho',
    desc: 'Freio raspando, pneu furado, roda pesada, vibração, folga ou barulho estranho ao andar.',
    help: 'Mande um vídeo curto mostrando o barulho ou a peça que está incomodando.',
    items: ['freio raspando', 'pneu furado', 'barulho'],
    visual: 'wheel',
    meta: 'freio e pneu',
    accent: 'clay',
  },
]

const labModules = [
  ['Modelo', 'Marca, modelo ou uma foto do patinete.'],
  ['Sintoma', 'O que aconteceu: não liga, não carrega, freio, erro, barulho ou queda de autonomia.'],
  ['Foto ou vídeo', 'Uma foto do painel e um vídeo curto mostrando o defeito já ajudam muito.'],
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

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

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
            <span>Pedir orçamento</span>
          </a>
        </div>

        <button
          className={`menu-button${open ? ' is-open' : ''}`}
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={close}>
          Pedir orçamento
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
    <svg className="scooter-blueprint" viewBox="0 0 640 330" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="sc-tire" cx="33%" cy="33%" r="60%">
          <stop offset="0%" stopColor="#233028" />
          <stop offset="60%" stopColor="#0d1510" />
          <stop offset="100%" stopColor="#060a07" />
        </radialGradient>
        <radialGradient id="sc-rim" cx="38%" cy="36%" r="58%">
          <stop offset="0%" stopColor="#344c3c" />
          <stop offset="65%" stopColor="#14201a" />
          <stop offset="100%" stopColor="#090d0a" />
        </radialGradient>
        <linearGradient id="sc-deck" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#1b2d21" />
          <stop offset="48%" stopColor="#131f18" />
          <stop offset="100%" stopColor="#1b2d21" />
        </linearGradient>
        <linearGradient id="sc-stem" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#0c1610" />
          <stop offset="28%" stopColor="#364c3e" />
          <stop offset="72%" stopColor="#243630" />
          <stop offset="100%" stopColor="#0c1610" />
        </linearGradient>
        <linearGradient id="sc-hbar" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#162018" />
          <stop offset="22%" stopColor="#364c3e" />
          <stop offset="78%" stopColor="#2c4034" />
          <stop offset="100%" stopColor="#162018" />
        </linearGradient>
        <filter id="sc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.82  0 0 0 0 0.48  0 0 0 0.8 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sc-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Clip that exposes only the upper-left arc of the wheel for the fender */}
        <clipPath id="sc-fend-clip">
          <polygon points="154,246 205,148 -10,40 -10,290 105,310" />
        </clipPath>
      </defs>

      {/* Background grid */}
      <path className="blueprint-grid" d="M40 286H604M40 232H604M40 178H604M40 124H604M40 70H604" />
      <path className="blueprint-grid" d="M78 46V306M156 46V306M234 46V306M312 46V306M390 46V306M468 46V306M546 46V306" />

      {/* Ground shadow + LED reflection */}
      <ellipse cx="320" cy="294" rx="272" ry="14" fill="rgba(0,0,0,0.48)" />
      <ellipse cx="320" cy="297" rx="196" ry="7" fill="rgba(25,211,125,0.055)" />

      {/* REAR WHEEL */}
      {/* Depth shadow (pseudo-3D) */}
      <circle cx="159" cy="250" r="63" fill="rgba(0,0,0,0.45)" />
      {/* Outer tire edge */}
      <circle cx="154" cy="246" r="64" fill="#080c09" />
      {/* Tire body */}
      <circle cx="154" cy="246" r="62" fill="url(#sc-tire)" />
      {/* Tread shoulder line */}
      <circle cx="154" cy="246" r="62" fill="none" stroke="#1e2c1e" strokeWidth="1.5" />
      {/* Tread grooves — dois anéis de ranhura */}
      <circle cx="154" cy="246" r="59" fill="none" stroke="#060a07" strokeWidth="3" strokeDasharray="10 5" />
      <circle cx="154" cy="246" r="55" fill="none" stroke="#060a07" strokeWidth="2" strokeDasharray="7 6" />
      {/* Sidewall character line */}
      <circle cx="154" cy="246" r="52" fill="none" stroke="#1e2c20" strokeWidth="1" opacity="0.65" />
      {/* Rim bead seat */}
      <circle cx="154" cy="246" r="50" fill="none" stroke="#2a3e32" strokeWidth="3.5" />
      {/* Rim body */}
      <circle cx="154" cy="246" r="49" fill="url(#sc-rim)" />
      <circle cx="154" cy="246" r="49" fill="none" stroke="#3c5448" strokeWidth="1.5" opacity="0.55" />
      {/* Rim channel */}
      <circle cx="154" cy="246" r="46" fill="none" stroke="#0a0e0b" strokeWidth="4" />
      {/* 8 spokes */}
      <g fill="none" stroke="#1c3024" strokeWidth="3" strokeLinecap="round">
        <line x1="154" y1="224" x2="154" y2="197" />
        <line x1="170" y1="230" x2="189" y2="212" />
        <line x1="176" y1="246" x2="203" y2="246" />
        <line x1="170" y1="262" x2="189" y2="280" />
        <line x1="154" y1="268" x2="154" y2="295" />
        <line x1="138" y1="262" x2="119" y2="280" />
        <line x1="132" y1="246" x2="105" y2="246" />
        <line x1="138" y1="230" x2="119" y2="212" />
      </g>
      {/* Spoke highlights */}
      <g fill="none" stroke="#3c5448" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <line x1="154" y1="223" x2="154" y2="198" />
        <line x1="170" y1="229" x2="188" y2="213" />
        <line x1="175" y1="246" x2="202" y2="246" />
        <line x1="170" y1="263" x2="188" y2="279" />
        <line x1="154" y1="269" x2="154" y2="294" />
        <line x1="138" y1="263" x2="120" y2="279" />
        <line x1="133" y1="246" x2="106" y2="246" />
        <line x1="138" y1="229" x2="120" y2="213" />
      </g>
      {/* Spoke nipples na roda */}
      <g fill="#2a3e32" stroke="#3c5448" strokeWidth="0.8">
        <circle cx="154" cy="197" r="2.5" />
        <circle cx="189" cy="212" r="2.5" />
        <circle cx="203" cy="246" r="2.5" />
        <circle cx="189" cy="280" r="2.5" />
        <circle cx="154" cy="295" r="2.5" />
        <circle cx="119" cy="280" r="2.5" />
        <circle cx="105" cy="246" r="2.5" />
        <circle cx="119" cy="212" r="2.5" />
      </g>
      {/* Hub motor — carcaça */}
      <circle cx="154" cy="246" r="24" fill="#0c1210" stroke="#182218" strokeWidth="2.5" />
      <circle cx="154" cy="246" r="20" fill="#0a0d0b" />
      {/* Motor stator: anel verde pontilhado */}
      <circle cx="154" cy="246" r="19" fill="none" stroke="#19d37d" strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.65" filter="url(#sc-glow)" />
      {/* Marcas de ventilação */}
      <g stroke="#1e2e22" strokeWidth="1.5" strokeLinecap="round">
        <line x1="154" y1="234" x2="154" y2="228" />
        <line x1="162" y1="238" x2="166" y2="233" />
        <line x1="164" y1="246" x2="170" y2="246" />
        <line x1="162" y1="254" x2="166" y2="259" />
        <line x1="154" y1="258" x2="154" y2="264" />
        <line x1="146" y1="254" x2="142" y2="259" />
        <line x1="144" y1="246" x2="138" y2="246" />
        <line x1="146" y1="238" x2="142" y2="233" />
      </g>
      {/* Eixo */}
      <circle cx="154" cy="246" r="9" fill="#141e18" stroke="#2e4438" strokeWidth="1.5" />
      <circle cx="154" cy="246" r="5" fill="#19d37d" fillOpacity="0.28" filter="url(#sc-glow)" />
      {/* Disco de freio */}
      <circle cx="154" cy="246" r="33" fill="none" stroke="#182218" strokeWidth="7" />
      <circle cx="154" cy="246" r="33" fill="none" stroke="#3c5448" strokeWidth="1" strokeDasharray="10 6" strokeOpacity="0.3" />

      {/* FRONT WHEEL */}
      <circle cx="471" cy="250" r="63" fill="rgba(0,0,0,0.45)" />
      <circle cx="466" cy="246" r="64" fill="#080c09" />
      <circle cx="466" cy="246" r="62" fill="url(#sc-tire)" />
      <circle cx="466" cy="246" r="62" fill="none" stroke="#1e2c1e" strokeWidth="1.5" />
      <circle cx="466" cy="246" r="59" fill="none" stroke="#060a07" strokeWidth="3" strokeDasharray="10 5" />
      <circle cx="466" cy="246" r="55" fill="none" stroke="#060a07" strokeWidth="2" strokeDasharray="7 6" />
      <circle cx="466" cy="246" r="52" fill="none" stroke="#1e2c20" strokeWidth="1" opacity="0.65" />
      <circle cx="466" cy="246" r="50" fill="none" stroke="#2a3e32" strokeWidth="3.5" />
      <circle cx="466" cy="246" r="49" fill="url(#sc-rim)" />
      <circle cx="466" cy="246" r="49" fill="none" stroke="#3c5448" strokeWidth="1.5" opacity="0.55" />
      <circle cx="466" cy="246" r="46" fill="none" stroke="#0a0e0b" strokeWidth="4" />
      {/* 8 spokes */}
      <g fill="none" stroke="#1c3024" strokeWidth="3" strokeLinecap="round">
        <line x1="466" y1="224" x2="466" y2="197" />
        <line x1="482" y1="230" x2="501" y2="212" />
        <line x1="488" y1="246" x2="515" y2="246" />
        <line x1="482" y1="262" x2="501" y2="280" />
        <line x1="466" y1="268" x2="466" y2="295" />
        <line x1="450" y1="262" x2="431" y2="280" />
        <line x1="444" y1="246" x2="417" y2="246" />
        <line x1="450" y1="230" x2="431" y2="212" />
      </g>
      <g fill="none" stroke="#3c5448" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <line x1="466" y1="223" x2="466" y2="198" />
        <line x1="482" y1="229" x2="500" y2="213" />
        <line x1="487" y1="246" x2="514" y2="246" />
        <line x1="482" y1="263" x2="500" y2="279" />
        <line x1="466" y1="269" x2="466" y2="294" />
        <line x1="450" y1="263" x2="432" y2="279" />
        <line x1="445" y1="246" x2="418" y2="246" />
        <line x1="450" y1="229" x2="432" y2="213" />
      </g>
      <g fill="#2a3e32" stroke="#3c5448" strokeWidth="0.8">
        <circle cx="466" cy="197" r="2.5" />
        <circle cx="501" cy="212" r="2.5" />
        <circle cx="515" cy="246" r="2.5" />
        <circle cx="501" cy="280" r="2.5" />
        <circle cx="466" cy="295" r="2.5" />
        <circle cx="431" cy="280" r="2.5" />
        <circle cx="417" cy="246" r="2.5" />
        <circle cx="431" cy="212" r="2.5" />
      </g>
      {/* Hub dianteiro simples */}
      <circle cx="466" cy="246" r="20" fill="#0c1210" stroke="#182218" strokeWidth="2.5" />
      <circle cx="466" cy="246" r="9" fill="#141e18" stroke="#2e4438" strokeWidth="1.5" />
      <circle cx="466" cy="246" r="5" fill="#2e4438" fillOpacity="0.7" />
      {/* Disco de freio */}
      <circle cx="466" cy="246" r="33" fill="none" stroke="#182218" strokeWidth="7" />
      <circle cx="466" cy="246" r="33" fill="none" stroke="#3c5448" strokeWidth="1" strokeDasharray="10 6" strokeOpacity="0.28" />

      {/* REAR FENDER — perfect uniform arc via clip + circle stroke */}
      <g clipPath="url(#sc-fend-clip)">
        <circle cx="154" cy="246" r="70" fill="none" stroke="#1b2d21" strokeWidth="14" />
        <circle cx="154" cy="246" r="70" fill="none" stroke="#3c5448" strokeWidth="1.5" opacity="0.55" />
      </g>
      {/* Taillight */}
      <rect x="77" y="220" width="18" height="11" rx="3.5" fill="#1a0a0a" stroke="#cc3030" strokeWidth="1.5" />
      <rect x="80" y="222" width="12" height="7" rx="2" fill="#cc3030" fillOpacity="0.72" filter="url(#sc-soft)" />

      {/* DECK — with 3D bottom face */}
      <path d="M176 220 L418 220 L425 228 L183 228 Z" fill="#080e0a" />
      <rect x="174" y="196" width="246" height="26" rx="10" fill="url(#sc-deck)" />
      <rect x="174" y="196" width="246" height="26" rx="10" fill="none" stroke="#283c2e" strokeWidth="1.5" />
      {/* Deck top highlight */}
      <rect x="178" y="197" width="238" height="3" rx="3" fill="rgba(255,255,255,0.035)" />
      {/* Grip tape lines */}
      <g stroke="rgba(255,255,255,0.038)" strokeWidth="1">
        <line x1="182" y1="201" x2="412" y2="201" />
        <line x1="182" y1="205" x2="412" y2="205" />
        <line x1="182" y1="209" x2="412" y2="209" />
        <line x1="182" y1="213" x2="412" y2="213" />
        <line x1="182" y1="217" x2="412" y2="217" />
      </g>
      {/* Battery window */}
      <rect x="196" y="206" width="158" height="10" rx="4" fill="#080e09" stroke="#19d37d" strokeWidth="0.8" opacity="0.45" />
      <rect x="200" y="208" width="26" height="6" rx="2.5" fill="#19d37d" fillOpacity="0.72" />
      <rect x="230" y="208" width="26" height="6" rx="2.5" fill="#19d37d" fillOpacity="0.68" />
      <rect x="260" y="208" width="26" height="6" rx="2.5" fill="#19d37d" fillOpacity="0.55" />
      <rect x="290" y="208" width="26" height="6" rx="2.5" fill="#19d37d" fillOpacity="0.35" />
      <rect x="320" y="208" width="26" height="6" rx="2.5" fill="#1c3024" fillOpacity="0.8" />
      {/* LED underline strip */}
      <line x1="184" y1="221" x2="414" y2="221" stroke="#19d37d" strokeWidth="2.5" strokeOpacity="0.55" filter="url(#sc-glow)" />
      {/* Charging port */}
      <rect x="413" y="200" width="10" height="14" rx="3" fill="#0c1610" stroke="#2e4438" strokeWidth="1" />
      <rect x="415" y="204" width="6" height="6" rx="1.5" fill="#19d37d" fillOpacity="0.4" />

      {/* STEM — nearly vertical, slight forward lean */}
      <path d="M402 208 L424 72" stroke="#050808" strokeWidth="22" strokeLinecap="round" />
      <path d="M400 206 L422 70" stroke="url(#sc-stem)" strokeWidth="17" strokeLinecap="round" />
      <path d="M402 206 L424 70" stroke="#3c5448" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M401 206 L423 70" stroke="#19d37d" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.18" />

      {/* Folding mechanism joint */}
      <circle cx="412" cy="150" r="13" fill="#0c1610" stroke="#1c2c22" strokeWidth="2" />
      <circle cx="412" cy="150" r="9" fill="#141e18" stroke="#19d37d" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="412" cy="150" r="5" fill="#19d37d" fillOpacity="0.3" filter="url(#sc-glow)" />
      <line x1="403" y1="150" x2="421" y2="150" stroke="#2e4438" strokeWidth="2" opacity="0.5" />
      <line x1="409" y1="142" x2="415" y2="158" stroke="#2e4438" strokeWidth="1.5" opacity="0.3" />

      {/* FRONT FORK */}
      <path d="M402 210 L470 254" stroke="#050808" strokeWidth="16" strokeLinecap="round" />
      <path d="M400 208 L468 252" stroke="url(#sc-stem)" strokeWidth="12" strokeLinecap="round" />
      <path d="M402 208 L470 252" stroke="#3c5448" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Fork second rail */}
      <path d="M394 214 L461 258" stroke="#1c2c22" strokeWidth="8" strokeLinecap="round" />
      <path d="M396 214 L463 258" stroke="#2e4438" strokeWidth="2" strokeLinecap="round" opacity="0.35" />

      {/* HANDLEBAR — perfil lateral: tubos vistos de lado como cilindros */}
      {/* Sombra do conjunto */}
      <line x1="348" y1="75" x2="500" y2="75" stroke="#040806" strokeWidth="16" strokeLinecap="butt" />
      {/* Tubo principal (perfil lateral) */}
      <line x1="350" y1="70" x2="498" y2="70" stroke="#1a2c20" strokeWidth="11" strokeLinecap="butt" />
      {/* Highlight topo do tubo */}
      <line x1="350" y1="65" x2="498" y2="65" stroke="#3c5448" strokeWidth="2" strokeLinecap="butt" opacity="0.5" />

      {/* Tampa esquerda — elipse (tubo indo para longe do viewer) */}
      <ellipse cx="350" cy="70" rx="6" ry="12" fill="#0e1810" stroke="#253828" strokeWidth="2" />
      <ellipse cx="350" cy="70" rx="3" ry="6" fill="#162018" opacity="0.6" />

      {/* Tampa direita — elipse (tubo vindo em direção ao viewer, throttle) */}
      <ellipse cx="498" cy="70" rx="6" ry="12" fill="#0d1c12" stroke="#19d37d" strokeWidth="1.5" strokeOpacity="0.6" />
      <ellipse cx="498" cy="70" rx="3" ry="6" fill="#1a3020" opacity="0.7" />

      {/* Alavanca de freio esquerda — desce e vai para frente */}
      <line x1="366" y1="76" x2="380" y2="96" stroke="#1e3028" strokeWidth="6" strokeLinecap="round" />
      <line x1="367" y1="76" x2="381" y2="96" stroke="#3c5448" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Alavanca de freio direita */}
      <line x1="480" y1="76" x2="466" y2="96" stroke="#1e3028" strokeWidth="6" strokeLinecap="round" />
      <line x1="479" y1="76" x2="465" y2="96" stroke="#3c5448" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Display central — sobre o tubo */}
      <rect x="406" y="56" width="34" height="22" rx="6" fill="#080e08" stroke="#1a2a1a" strokeWidth="2" />
      <rect x="409" y="59" width="28" height="16" rx="4" fill="#091609" stroke="#19d37d" strokeWidth="1" />
      <rect x="412" y="62" width="18" height="2.5" rx="1.2" fill="#19d37d" fillOpacity="0.72" />
      <rect x="412" y="67" width="13" height="2.5" rx="1.2" fill="#19d37d" fillOpacity="0.45" />
      <rect x="412" y="72" width="8" height="2" rx="1" fill="#19d37d" fillOpacity="0.35" />

      {/* FAROL — na face frontal do mastro, abaixo do guidão */}
      <ellipse cx="432" cy="90" rx="11" ry="9" fill="#1a3020" stroke="#19d37d" strokeWidth="1.5" filter="url(#sc-glow)" />
      <ellipse cx="432" cy="90" rx="7" ry="5.5" fill="#d0ffe4" fillOpacity="0.88" />
      {/* Cone de luz para frente */}
      <path d="M442 83 L522 58" stroke="#19d37d" strokeWidth="18" strokeOpacity="0.04" strokeLinecap="round" />
      <path d="M442 90 L528 90" stroke="#19d37d" strokeWidth="11" strokeOpacity="0.03" strokeLinecap="round" />
      <path d="M442 97 L520 114" stroke="#19d37d" strokeWidth="7" strokeOpacity="0.02" strokeLinecap="round" />

      {/* FRONT FENDER */}
      <path d="M425 160 Q450 195 464 212" fill="none" stroke="#0e1810" strokeWidth="11" strokeLinecap="round" />
      <path d="M425 160 Q450 195 464 212" fill="none" stroke="#1c2e22" strokeWidth="7" strokeLinecap="round" />
      <path d="M427 160 Q452 195 466 212" fill="none" stroke="#304838" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

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
  const holes = Array.from({ length: 14 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 14 + Math.PI / 14
    return {
      cx: 132 + Math.cos(angle) * 47,
      cy: 110 + Math.sin(angle) * 47,
    }
  })
  const bolts = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 6
    return {
      cx: 132 + Math.cos(angle) * 25,
      cy: 110 + Math.sin(angle) * 25,
    }
  })
  const slots = Array.from({ length: 12 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 12 + Math.PI / 18
    return {
      x1: 132 + Math.cos(angle) * 32,
      y1: 110 + Math.sin(angle) * 32,
      x2: 132 + Math.cos(angle) * 56,
      y2: 110 + Math.sin(angle) * 56,
    }
  })

  return (
    <svg className="service-visual brake-visual" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="brakeDisc" cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#f6faf5" />
          <stop offset="46%" stopColor="#b8c3ba" />
          <stop offset="100%" stopColor="#59645d" />
        </radialGradient>
        <radialGradient id="brakeDarkDisc" cx="48%" cy="52%" r="62%">
          <stop offset="0%" stopColor="#2a342e" />
          <stop offset="72%" stopColor="#111813" />
          <stop offset="100%" stopColor="#050807" />
        </radialGradient>
        <linearGradient id="caliperGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c6ff7e" />
          <stop offset="42%" stopColor="#37df86" />
          <stop offset="100%" stopColor="#12341f" />
        </linearGradient>
      </defs>
      <path className="brake-shadow" d="M58 170C112 198 235 198 290 166" />
      <g className="brake-disc-svg">
        <circle className="disc-backplate" cx="132" cy="110" r="72" />
        <circle className="disc-outer" cx="132" cy="110" r="64" />
        <circle className="disc-inner-dark" cx="132" cy="110" r="54" />
        <circle className="disc-track" cx="132" cy="110" r="48" />
        <g className="disc-slots">
          {slots.map((slot) => (
            <line
              className="disc-slot"
              key={`${slot.x1}-${slot.y1}`}
              x1={slot.x1}
              y1={slot.y1}
              x2={slot.x2}
              y2={slot.y2}
            />
          ))}
        </g>
        {holes.map((hole) => (
          <circle className="disc-hole" key={`${hole.cx}-${hole.cy}`} cx={hole.cx} cy={hole.cy} r="4.1" />
        ))}
        {bolts.map((bolt) => (
          <circle className="disc-bolt" key={`${bolt.cx}-${bolt.cy}`} cx={bolt.cx} cy={bolt.cy} r="3.8" />
        ))}
        <circle className="disc-hub" cx="132" cy="110" r="19" />
        <circle className="disc-center" cx="132" cy="110" r="10" />
      </g>
      <g className="brake-caliper-svg">
        <path className="caliper-shadow" d="M188 62C223 50 262 62 274 91C288 124 265 154 229 158H184L196 136H226C242 136 254 126 254 111C254 94 241 84 224 85L198 89Z" />
        <path className="caliper-shell" d="M185 60C222 49 259 61 271 90C286 124 263 153 228 157H182L194 135H225C241 135 251 125 251 111C251 95 239 86 223 87L195 91Z" />
        <path className="caliper-window" d="M210 91C231 86 247 94 250 110C253 126 241 136 222 136H205L213 121H222C231 121 237 117 236 110C235 103 229 100 219 102L212 104Z" />
        <rect className="brake-pad-svg pad-inner" x="178" y="88" width="14" height="45" rx="5" />
        <rect className="brake-pad-svg pad-outer" x="222" y="91" width="13" height="39" rx="5" />
        <path className="caliper-bridge-line" d="M202 70C225 63 250 70 263 89M199 146C225 150 249 144 262 127" />
        <circle className="caliper-bolt" cx="255" cy="91" r="4.2" />
        <circle className="caliper-bolt" cx="250" cy="132" r="4.2" />
        <circle className="caliper-bolt" cx="205" cy="72" r="3.4" />
      </g>
      <path className="brake-energy" d="M82 184H260" />
      <text className="visual-label brake-label disc-label" x="72" y="199">
        disco
      </text>
      <text className="visual-label brake-label caliper-label" x="228" y="199">
        pinça
      </text>
    </svg>
  )
}

function ServiceVisual({ type }) {
  if (type === 'battery') {
    return (
      <svg className="service-visual battery-visual" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
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
    <svg className="service-visual board-visual" viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <filter id="brd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.82  0 0 0 0 0.48  0 0 0 0.8 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* PCB base */}
      <rect className="board-base" x="14" y="10" width="332" height="200" rx="12" />
      <rect x="14" y="10" width="332" height="200" rx="12" fill="none" stroke="rgba(25,211,125,0.1)" strokeWidth="1" />
      {/* Furos de fixação */}
      {[[28,24],[332,24],[28,196],[332,196]].map(([x,y],i) => (
        <g key={i}><circle cx={x} cy={y} r="5" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" /><circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.08)" /></g>
      ))}

      {/* CONECTOR DE BATERIA — esquerda */}
      <rect x="16" y="58" width="30" height="48" rx="4" fill="#0d1e12" stroke="rgba(25,211,125,0.42)" strokeWidth="1.5" />
      {[[20,62],[30,62],[20,78],[30,78],[20,94],[30,94]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="10" height="12" rx="2" fill={`rgba(25,211,125,${i<2?0.22:0.14})`} />
      ))}
      <text x="31" y="116" fill="rgba(25,211,125,0.45)" fontSize="6" fontFamily="monospace" textAnchor="middle">BATT</text>

      {/* TRILHAS DE POTÊNCIA — grossas âmbar */}
      <path d="M46 66 H94" fill="none" stroke="#f2b84b" strokeWidth="5" strokeOpacity="0.38" strokeLinecap="round" />
      <path d="M46 66 H94" fill="none" stroke="#f2b84b" strokeWidth="1.5" strokeOpacity="0.55" strokeLinecap="round" />
      <path d="M46 82 H94" fill="none" stroke="#152018" strokeWidth="5" strokeOpacity="0.9" strokeLinecap="round" />

      {/* CI PRINCIPAL — controladora */}
      <rect className="board-chip" x="92" y="52" width="98" height="116" rx="8" />
      <rect x="100" y="60" width="82" height="100" rx="5" fill="#0d2214" stroke="rgba(25,211,125,0.14)" strokeWidth="0.8" />
      <circle cx="96" cy="56" r="2.5" fill="rgba(25,211,125,0.55)" />
      <text x="141" y="107" fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MCU</text>
      <text x="141" y="120" fill="rgba(25,211,125,0.65)" fontSize="7" fontFamily="monospace" textAnchor="middle">CTRL</text>
      <rect x="108" y="128" width="66" height="10" rx="2" fill="#1a3020" stroke="rgba(25,211,125,0.1)" strokeWidth="0.8" />
      {/* Pinos top */}
      <g fill="rgba(192,200,196,0.42)">
        {[100,110,120,130,140,150,160,170].map(x => <rect key={x} x={x} y="46" width="5" height="7" rx="1" />)}
      </g>
      {/* Pinos bottom */}
      <g fill="rgba(192,200,196,0.42)">
        {[100,110,120,130,140,150,160,170].map(x => <rect key={x} x={x} y="167" width="5" height="7" rx="1" />)}
      </g>
      {/* Pinos left */}
      <g fill="rgba(192,200,196,0.42)">
        {[62,76,90,104,118,132,146].map(y => <rect key={y} x="86" y={y} width="6" height="5" rx="1" />)}
      </g>
      {/* Pinos right */}
      <g fill="rgba(192,200,196,0.42)">
        {[62,76,90,104,118,132,146].map(y => <rect key={y} x="190" y={y} width="6" height="5" rx="1" />)}
      </g>

      {/* TRILHAS DE GATE — finas verdes (sinal) */}
      <g fill="none" stroke="#19d37d" strokeWidth="1.2" strokeOpacity="0.38" strokeLinecap="round" strokeLinejoin="round">
        <path d="M196 66 H214 V46 H228" />
        <path d="M196 80 H214 V92 H228" />
        <path d="M196 94 H214 V138 H228" />
      </g>

      {/* MOSFETs × 3 */}
      {[[228,34],[228,79],[228,125]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x} y={y} width="36" height="24" rx="4" fill="#0d1e12" stroke="rgba(25,211,125,0.45)" strokeWidth="1.5" />
          <rect x={x+2} y={y+2} width="32" height="10" rx="2" fill="#192e1c" />
          <line x1={x+2} y1={y+12} x2={x+34} y2={y+12} stroke="rgba(25,211,125,0.1)" strokeWidth="0.8" />
          <text x={x+18} y={y+21} fill="rgba(25,211,125,0.45)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">FET</text>
          {[x+4,x+14,x+24].map(lx => <rect key={lx} x={lx} y={y+24} width="5" height="7" rx="1" fill="rgba(192,200,196,0.5)" />)}
        </g>
      ))}

      {/* TRILHAS DE FASE — MOSFETs ao conector de motor */}
      {[46,91,137].map(y => (
        <g key={y}>
          <path d={`M264 ${y} H282`} fill="none" stroke="#f2b84b" strokeWidth="3.5" strokeOpacity="0.36" strokeLinecap="round" />
          <path d={`M264 ${y} H282`} fill="none" stroke="#f2b84b" strokeWidth="1" strokeOpacity="0.55" strokeLinecap="round" />
        </g>
      ))}

      {/* CONECTOR DE MOTOR — direita */}
      <rect x="282" y="26" width="28" height="134" rx="4" fill="#0d1e12" stroke="rgba(242,184,75,0.4)" strokeWidth="1.5" />
      {[[32,50],[77,95],[122,140]].map(([y1,y2],i) => (
        <g key={i}>
          <rect x="286" y={y1} width="20" height="20" rx="2" fill="rgba(242,184,75,0.18)" />
        </g>
      ))}
      <text x="296" y="172" fill="rgba(242,184,75,0.5)" fontSize="6" fontFamily="monospace" textAnchor="middle">MTR</text>

      {/* CAPACITORES BULK — topo e base */}
      {[[54,36],[54,178]].map(([cx,cy]) => (
        <g key={cy}>
          <circle cx={cx} cy={cy} r="15" fill="#0d1e12" stroke="rgba(25,211,125,0.3)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="8" fill="#182e1c" />
          <path d={`M${cx-4} ${cy} H${cx+4}`} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M${cx} ${cy-4} V${cy+4}`} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M${cx-13} ${cy-7} A15 15 0 0 1 ${cx+13} ${cy-7}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
        </g>
      ))}
      {/* Trilhas dos capacitores */}
      <path d="M54 51 V66" fill="none" stroke="#f2b84b" strokeWidth="2.5" strokeOpacity="0.28" strokeLinecap="round" />
      <path d="M54 163 V82" fill="none" stroke="#19d37d" strokeWidth="2.5" strokeOpacity="0.2" strokeLinecap="round" />

      {/* CONECTOR HALL — bottom */}
      <rect x="104" y="178" width="56" height="18" rx="3" fill="#0d1e12" stroke="rgba(25,211,125,0.32)" strokeWidth="1.2" />
      <g fill="rgba(25,211,125,0.2)">
        {[107,118,129,140,151].map(x => <rect key={x} x={x} y="181" width="7" height="12" rx="1.5" />)}
      </g>
      <text x="132" y="207" fill="rgba(25,211,125,0.4)" fontSize="5.5" fontFamily="monospace" textAnchor="middle">HALL</text>
      <path d="M132 174 V178" fill="none" stroke="#19d37d" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />

      {/* RESISTORES SMD */}
      {[[200,178],[220,178]].map(([x,y]) => (
        <g key={x}>
          <rect x={x} y={y} width="16" height="7" rx="2" fill="#1a2c1e" stroke="rgba(242,184,75,0.28)" strokeWidth="1" />
          <line x1={x-3} y1={y+3.5} x2={x} y2={y+3.5} stroke="rgba(192,200,196,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x+16} y1={y+3.5} x2={x+19} y2={y+3.5} stroke="rgba(192,200,196,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}

      {/* PULSE ANIMADO */}
      <path className="service-pulse" d="M46 66 H92 M190 110 H214 V92 H228 M264 91 H282" />

      {/* NÓS DIAGNÓSTICOS */}
      <circle className="board-node warn" cx="46" cy="66" r="6" />
      <circle className="board-node active" cx="92" cy="66" r="6" />
      <circle className="board-node active" cx="264" cy="91" r="6" />
      <circle className="board-node" cx="282" cy="91" r="6" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Reparo de patinetes em Águas Claras / Brasília</p>
          <h1>
            <span>Patinete com defeito?</span>
            <span>Peça o orçamento</span>
            <span>pelo WhatsApp.</span>
          </h1>
          <p>
            Atendimento direto com quem faz o reparo. Envie o sintoma, uma foto ou vídeo curto e receba a orientação para
            avaliar o próximo passo.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={WHATSAPP} target="_blank" rel="noreferrer">
              <IconWhatsapp />
              Pedir orçamento no WhatsApp
            </a>
            <a className="button secondary" href="#orcamento">
              O que enviar
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
      <div className="metric reveal" style={{ '--i': 0 }}>
        <strong>Direto</strong>
        <span>você fala com quem vai avaliar o patinete</span>
      </div>
      <div className="metric reveal" style={{ '--i': 1 }}>
        <strong>Rápido</strong>
        <span>triagem inicial pelo WhatsApp com foto ou vídeo</span>
      </div>
      <div className="metric reveal" style={{ '--i': 2 }}>
        <strong>Bancada</strong>
        <span>avaliação técnica antes de indicar troca de peça</span>
      </div>
      <div className="metric reveal" style={{ '--i': 3 }}>
        <strong>Clareza</strong>
        <span>você entende o serviço antes de aprovar</span>
      </div>
    </section>
  )
}

function LabDeck() {
  return (
    <section className="lab-deck lead-deck" id="orcamento">
      <div className="lab-deck-inner">
        <div className="lab-copy reveal">
          <span>Orçamento pelo WhatsApp</span>
          <h2>Para começar, mande só o essencial.</h2>
          <p>
            A ideia é tirar o cliente da dúvida sem jogar informação demais na tela. Com três coisas simples já dá para
            orientar se vale levar para avaliação.
          </p>
          <a className="button primary lead-button" href={WHATSAPP} target="_blank" rel="noreferrer">
            <IconWhatsapp />
            Enviar informações agora
          </a>
        </div>
        <div className="lab-modules">
          {labModules.map(([title, text], index) => (
            <article className="lab-module reveal" style={{ '--i': index }} key={title}>
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
        <span>Escolha o seu caso</span>
        <h2>Qual problema o seu patinete está dando?</h2>
        <p>
          Não precisa saber o nome da peça. Se parecer com um desses casos, mande uma foto ou vídeo pelo WhatsApp.
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
              <strong className="service-help-line">{service.help}</strong>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="service-help-cta reveal">
        <div>
          <span>Não sabe explicar o defeito?</span>
          <strong>Sem problema. Mande um vídeo curto e ele te orienta pelo WhatsApp.</strong>
        </div>
        <a className="button primary" href={WHATSAPP} target="_blank" rel="noreferrer">
          <IconWhatsapp />
          Tirar dúvida no WhatsApp
        </a>
      </div>
    </section>
  )
}

function FaultDocSvg() {
  return (
    <svg className="fault-doc-svg" viewBox="0 0 260 132" aria-hidden="true">
      <defs>
        <radialGradient id="faultRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b84b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f2b84b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Viewfinder frame */}
      <rect className="vf-frame" x="44" y="10" width="172" height="112" rx="6" />

      {/* Corner brackets */}
      <path className="vf-bracket" d="M54 22 L54 13 L63 13" />
      <path className="vf-bracket" d="M206 13 L215 13 L215 22" />
      <path className="vf-bracket" d="M54 109 L54 119 L63 119" />
      <path className="vf-bracket" d="M206 119 L215 119 L215 109" />

      {/* Fault glow */}
      <circle className="vf-fault-glow" cx="130" cy="61" r="30" />

      {/* Target circle */}
      <circle className="vf-target" cx="130" cy="61" r="24" />

      {/* Crosshair arms */}
      <line className="vf-cross" x1="130" y1="42" x2="130" y2="52" />
      <line className="vf-cross" x1="130" y1="70" x2="130" y2="80" />
      <line className="vf-cross" x1="111" y1="61" x2="121" y2="61" />
      <line className="vf-cross" x1="139" y1="61" x2="149" y2="61" />

      {/* Fault dot */}
      <circle className="vf-dot" cx="130" cy="61" r="4.5" />

      {/* Scan line */}
      <line className="vf-scan" x1="44" y1="61" x2="216" y2="61" />

      {/* Status label */}
      <text className="vf-label" x="130" y="106">foto antes do orçamento</text>
    </svg>
  )
}

function QuoteSvg() {
  return (
    <svg className="quote-svg" viewBox="0 0 260 132" aria-hidden="true">
      <defs>
        <linearGradient id="quotePanel" x1="0" x2="1">
          <stop offset="0%" stopColor="#07110d" />
          <stop offset="62%" stopColor="#10251a" />
          <stop offset="100%" stopColor="#182817" />
        </linearGradient>
      </defs>

      <rect className="qt-doc" x="34" y="10" width="192" height="112" rx="12" />
      <rect className="qt-header" x="46" y="22" width="168" height="22" rx="7" />
      <text className="qt-title" x="130" y="37">ESCOPO DO REPARO</text>

      <g className="qt-row qt-row-1">
        <circle className="qt-dot" cx="56" cy="62" r="5" />
        <path className="qt-check" d="M53 62L56 65L62 57" />
        <text className="qt-item-label" x="72" y="64">peça definida</text>
        <rect className="qt-status-pill" x="158" y="53" width="48" height="18" rx="9" />
        <text className="qt-status-text" x="182" y="65">ok</text>
      </g>

      <g className="qt-row qt-row-2">
        <circle className="qt-dot" cx="56" cy="84" r="5" />
        <path className="qt-check" d="M53 84L56 87L62 79" />
        <text className="qt-item-label" x="72" y="86">serviço fechado</text>
        <rect className="qt-progress-bg" x="158" y="79" width="48" height="6" rx="3" />
        <rect className="qt-progress" x="158" y="79" width="48" height="6" rx="3" />
      </g>

      <line className="qt-divider" x1="50" y1="101" x2="210" y2="101" />
      <text className="qt-footer" x="130" y="115">aprovado antes de iniciar</text>
      <path className="qt-scan" d="M42 48H218" />
    </svg>
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
            <div className="console-flow">
              <span className="console-line" />
              <span className="console-pulse" />
              <div className="flow-step">
                <i>01</i>
                <b>Entrada</b>
                <small>foto + sintoma</small>
              </div>
              <div className="flow-step">
                <i>02</i>
                <b>Bancada</b>
                <small>medição real</small>
              </div>
              <div className="flow-step">
                <i>03</i>
                <b>Saída</b>
                <small>teste final</small>
              </div>
            </div>
            <div className="console-readouts">
              <span>
                <i />
                defeito registrado
              </span>
              <span>
                <i />
                escopo aprovado
              </span>
              <span>
                <i />
                entrega conferida
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
                {index === 0 ? (
                  <FaultDocSvg />
                ) : index === 1 ? (
                  <QuoteSvg />
                ) : (
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
        {process.map(([number, title, text], index) => (
          <article className="timeline-step reveal" style={{ '--i': index }} key={title}>
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
            Atendimento em Águas Claras, Brasília - DF. Envie modelo, sintoma e uma foto ou vídeo curto para começar o
            orçamento.
          </p>
          <div className="contact-actions">
            <a className="button primary" href={WHATSAPP} target="_blank" rel="noreferrer">
              <IconWhatsapp />
              Pedir orçamento
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
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contato')
      const nearContact = contact ? window.scrollY + window.innerHeight > contact.offsetTop + 120 : false

      setVisible(window.scrollY > 600)
      setBlocked(nearContact)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`sticky-cta${visible && !blocked ? ' is-visible' : ''}`}
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Solicitar avaliação pelo WhatsApp"
    >
      <IconWhatsapp />
      Orçamento no WhatsApp
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
        <Services />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
