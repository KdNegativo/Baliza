import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor       from './components/Cursor'
import Grain        from './components/Grain'
import Preloader    from './components/Preloader'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import Statement    from './components/Statement'
import Services     from './components/Services'
import About        from './components/About'
import Faq          from './components/Faq'
import Location     from './components/Location'
import Cta          from './components/Cta'
import Footer       from './components/Footer'
import WaFloat      from './components/WaFloat'
import MobileCta    from './components/MobileCta'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
  }, [loaded])

  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.5, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = time => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove(tick) }
  }, [loaded])

  return (
    <>
      <Grain />
      <Cursor />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Nav />
      <Hero loaded={loaded} />
      <Statement />
      <Services />
      <About />
      <Faq />
      <Location />
      <Cta />
      <Footer />
      <WaFloat />
      <MobileCta />
    </>
  )
}
