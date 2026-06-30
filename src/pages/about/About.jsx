// import React, { useEffect, useRef, useState, useCallback } from 'react'
// import "./about.scss"

// const milestones = [
//     { year: "2011", title: "The foundation", text: "WINNER entered the Uzbek market with its first product line." },
//     { year: "2015", title: "Production scaled up", text: "New blending lines launched, tripling annual output." },
//     { year: "2018", title: "Quality certified", text: "Compliance confirmed against international API and ACEA standards." },
//     { year: "2021", title: "Regional network", text: "120+ official dealer points opened across 12 regions." },
//     { year: "2024", title: "Next-gen formulas", text: "A new fully synthetic line engineered for extreme heat resistance." },
// ]

// const stats = [
//     { value: 120, suffix: "+", label: "Dealer points" },
//     { value: 12, suffix: "", label: "Regions covered" },
//     { value: 13, suffix: "", label: "Years of experience" },
//     { value: 40, suffix: "+", label: "Product types" },
// ]

// const useReveal = (options = {}) => {
//     const ref = useRef(null)
//     const [visible, setVisible] = useState(false)

//     useEffect(() => {
//         const node = ref.current
//         if (!node) return
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setVisible(true)
//                     observer.unobserve(node)
//                 }
//             },
//             { threshold: 0.2, ...options }
//         )
//         observer.observe(node)
//         return () => observer.disconnect()
//     }, [])

//     return [ref, visible]
// }

// const RevealBlock = ({ as: Tag = "div", className = "", delay = 0, variant = "up", children }) => {
//     const [ref, visible] = useReveal()

//     return (
//         <Tag
//             ref={ref}
//             className={`${className} reveal reveal--${variant} ${visible ? "reveal--visible" : ""}`}
//             style={{ transitionDelay: `${delay}ms` }}
//         >
//             {children}
//         </Tag>
//     )
// }

// const useCountUp = (target, duration = 1600, trigger = false) => {
//     const [value, setValue] = useState(0)
//     const started = useRef(false)

//     useEffect(() => {
//         if (!trigger || started.current) return
//         started.current = true
//         const start = performance.now()
//         const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

//         const tick = (now) => {
//             const progress = Math.min((now - start) / duration, 1)
//             const eased = easeOutExpo(progress)
//             setValue(Math.round(eased * target))
//             if (progress < 1) requestAnimationFrame(tick)
//         }

//         requestAnimationFrame(tick)
//     }, [trigger, target, duration])

//     return value
// }

// const useTilt = (strength = 10) => {
//     const ref = useRef(null)

//     const onMouseMove = useCallback((e) => {
//         const node = ref.current
//         if (!node) return
//         const rect = node.getBoundingClientRect()
//         const px = (e.clientX - rect.left) / rect.width - 0.5
//         const py = (e.clientY - rect.top) / rect.height - 0.5
//         node.style.setProperty('--tilt-x', `${(-py * strength).toFixed(2)}deg`)
//         node.style.setProperty('--tilt-y', `${(px * strength).toFixed(2)}deg`)
//         node.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`)
//         node.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`)
//     }, [strength])

//     const onMouseLeave = useCallback(() => {
//         const node = ref.current
//         if (!node) return
//         node.style.setProperty('--tilt-x', '0deg')
//         node.style.setProperty('--tilt-y', '0deg')
//     }, [])

//     return { ref, onMouseMove, onMouseLeave }
// }

// const useMagnetic = (strength = 0.35) => {
//     const ref = useRef(null)

//     const onMouseMove = useCallback((e) => {
//         const node = ref.current
//         if (!node) return
//         const rect = node.getBoundingClientRect()
//         const x = (e.clientX - rect.left - rect.width / 2) * strength
//         const y = (e.clientY - rect.top - rect.height / 2) * strength
//         node.style.transform = `translate(${x}px, ${y}px)`
//     }, [strength])

//     const onMouseLeave = useCallback(() => {
//         const node = ref.current
//         if (!node) return
//         node.style.transform = `translate(0, 0)`
//     }, [])

//     return { ref, onMouseMove, onMouseLeave }
// }

// const TiltCard = ({ index, title, text }) => {
//     const { ref, onMouseMove, onMouseLeave } = useTilt(8)
//     return (
//         <RevealBlock className="about__mission-card-wrap" delay={index * 120}>
//             <div
//                 ref={ref}
//                 className="about__mission-card"
//                 onMouseMove={onMouseMove}
//                 onMouseLeave={onMouseLeave}>
//                 <span className="about__mission-card-glow" />
//                 <h3>{String(index + 1).padStart(2, '0')}. {title}</h3>
//                 <p>{text}</p>
//             </div>
//         </RevealBlock>
//     )
// }

// const StatItem = ({ value, suffix, label, trigger, delay }) => {
//     const count = useCountUp(value, 1500 + delay, trigger)
//     return (
//         <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
//             <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>
//                 {count}{suffix}
//             </span>
//             <span className="about__stat-label">{label}</span>
//         </div>
//     )
// }

// const About = () => {
//     const [activePoint, setActivePoint] = useState(null)
//     const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
//     const [heroLoaded, setHeroLoaded] = useState(false)

//     const heroGlowRef = useRef(null)
//     const ctaMagnet = useMagnetic(0.3)
//     const timelineRef = useRef(null)
//     const [lineProgress, setLineProgress] = useState(0)

//     useEffect(() => {
//         const t = requestAnimationFrame(() => setHeroLoaded(true))
//         return () => cancelAnimationFrame(t)
//     }, [])

//     useEffect(() => {
//         const handleMove = (e) => {
//             const node = heroGlowRef.current
//             if (!node) return
//             const x = (e.clientX / window.innerWidth) * 100
//             const y = (e.clientY / window.innerHeight) * 100
//             node.style.setProperty('--mx', `${x}%`)
//             node.style.setProperty('--my', `${y}%`)
//         }
//         window.addEventListener('mousemove', handleMove)
//         return () => window.removeEventListener('mousemove', handleMove)
//     }, [])

//     useEffect(() => {
//         const handleScroll = () => {
//             const node = timelineRef.current
//             if (!node) return
//             const rect = node.getBoundingClientRect()
//             const vh = window.innerHeight
//             const total = rect.height
//             const seen = Math.min(Math.max(vh * 0.7 - rect.top, 0), total)
//             setLineProgress(Math.min((seen / total) * 100, 100))
//         }
//         window.addEventListener('scroll', handleScroll, { passive: true })
//         handleScroll()
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     const heroWords = "Trust for every engine on the move".split(" ")

//     return (
//         <div className="about">

//             <section className="about__hero">
//                 <div className="about__hero-bg">
//                     <div ref={heroGlowRef} className="about__hero-cursor-glow" />
//                     <div className="about__hero-glow about__hero-glow--gold" />
//                     <div className="about__hero-glow about__hero-glow--red" />
//                     <div className="about__hero-grid" />
//                 </div>
//             </section>

//             <section className="about__mission">
//                 <div className="about__mission-sticky">
//                     <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark" variant="left">
//                         Our mission
//                     </RevealBlock>
//                     <RevealBlock as="h2" className="about__mission-title" delay={100} variant="left">
//                         Quality isn't an accident. It's a system.
//                     </RevealBlock>
//                 </div>

//                 <div className="about__mission-content">
//                     <TiltCard
//                         index={0}
//                         title="Technology"
//                         text="Every formula is lab-tested and aligned with international API and ACEA standards."
//                     />
//                     <TiltCard
//                         index={1}
//                         title="Local engineering"
//                         text="Formulated for Uzbekistan's climate — built to handle scorching summers and harsh winters."
//                     />
//                     <TiltCard
//                         index={2}
//                         title="Trust"
//                         text="120+ official dealers and thousands of drivers rely on WINNER products every day."
//                     />
//                 </div>
//             </section>

//             <section className="about__stats" ref={statsRef}>
//                 <div className="about__stats-grid">
//                     {stats.map((s, i) => (
//                         <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />
//                     ))}
//                 </div>
//             </section>

//             <section className="about__timeline" ref={timelineRef}>
//                 <RevealBlock as="h2" className="about__section-title" variant="blur">
//                     Our journey
//                 </RevealBlock>

//                 <div className="about__timeline-line">
//                     <div className="about__timeline-line-fill" style={{ height: `${lineProgress}%` }} />
//                 </div>

//                 <div className="about__timeline-list">
//                     {milestones.map((m, i) => (
//                         <RevealBlock
//                             key={m.year}
//                             className={`about__timeline-item ${i % 2 === 0 ? "is-left" : "is-right"}`}
//                             delay={i * 90}
//                             variant={i % 2 === 0 ? "left" : "right"}
//                         >
//                             <div className="about__timeline-dot">
//                                 <span className="about__timeline-dot-ring" />
//                             </div>
//                             <div className="about__timeline-card">
//                                 <span className="about__timeline-year">{m.year}</span>
//                                 <h3>{m.title}</h3>
//                                 <p>{m.text}</p>
//                             </div>
//                         </RevealBlock>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default About

