// // import React, { useEffect, useRef, useState, useCallback } from 'react'
// // import "./about.scss"

// // const milestones = [
// //     { year: "2011", title: "The foundation", text: "WINNER entered the Uzbek market with its first product line." },
// //     { year: "2015", title: "Production scaled up", text: "New blending lines launched, tripling annual output." },
// //     { year: "2018", title: "Quality certified", text: "Compliance confirmed against international API and ACEA standards." },
// //     { year: "2021", title: "Regional network", text: "120+ official dealer points opened across 12 regions." },
// //     { year: "2024", title: "Next-gen formulas", text: "A new fully synthetic line engineered for extreme heat resistance." },
// // ]

// // const stats = [
// //     { value: 120, suffix: "+", label: "Dealer points" },
// //     { value: 12, suffix: "", label: "Regions covered" },
// //     { value: 13, suffix: "", label: "Years of experience" },
// //     { value: 40, suffix: "+", label: "Product types" },
// // ]

// // const useReveal = (options = {}) => {
// //     const ref = useRef(null)
// //     const [visible, setVisible] = useState(false)

// //     useEffect(() => {
// //         const node = ref.current
// //         if (!node) return
// //         const observer = new IntersectionObserver(
// //             ([entry]) => {
// //                 if (entry.isIntersecting) {
// //                     setVisible(true)
// //                     observer.unobserve(node)
// //                 }
// //             },
// //             { threshold: 0.2, ...options }
// //         )
// //         observer.observe(node)
// //         return () => observer.disconnect()
// //     }, [])

// //     return [ref, visible]
// // }

// // const RevealBlock = ({ as: Tag = "div", className = "", delay = 0, variant = "up", children }) => {
// //     const [ref, visible] = useReveal()

// //     return (
// //         <Tag
// //             ref={ref}
// //             className={`${className} reveal reveal--${variant} ${visible ? "reveal--visible" : ""}`}
// //             style={{ transitionDelay: `${delay}ms` }}
// //         >
// //             {children}
// //         </Tag>
// //     )
// // }

// // const useCountUp = (target, duration = 1600, trigger = false) => {
// //     const [value, setValue] = useState(0)
// //     const started = useRef(false)

// //     useEffect(() => {
// //         if (!trigger || started.current) return
// //         started.current = true
// //         const start = performance.now()
// //         const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

// //         const tick = (now) => {
// //             const progress = Math.min((now - start) / duration, 1)
// //             const eased = easeOutExpo(progress)
// //             setValue(Math.round(eased * target))
// //             if (progress < 1) requestAnimationFrame(tick)
// //         }

// //         requestAnimationFrame(tick)
// //     }, [trigger, target, duration])

// //     return value
// // }

// // const useTilt = (strength = 10) => {
// //     const ref = useRef(null)

// //     const onMouseMove = useCallback((e) => {
// //         const node = ref.current
// //         if (!node) return
// //         const rect = node.getBoundingClientRect()
// //         const px = (e.clientX - rect.left) / rect.width - 0.5
// //         const py = (e.clientY - rect.top) / rect.height - 0.5
// //         node.style.setProperty('--tilt-x', `${(-py * strength).toFixed(2)}deg`)
// //         node.style.setProperty('--tilt-y', `${(px * strength).toFixed(2)}deg`)
// //         node.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`)
// //         node.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`)
// //     }, [strength])

// //     const onMouseLeave = useCallback(() => {
// //         const node = ref.current
// //         if (!node) return
// //         node.style.setProperty('--tilt-x', '0deg')
// //         node.style.setProperty('--tilt-y', '0deg')
// //     }, [])

// //     return { ref, onMouseMove, onMouseLeave }
// // }

// // const useMagnetic = (strength = 0.35) => {
// //     const ref = useRef(null)

// //     const onMouseMove = useCallback((e) => {
// //         const node = ref.current
// //         if (!node) return
// //         const rect = node.getBoundingClientRect()
// //         const x = (e.clientX - rect.left - rect.width / 2) * strength
// //         const y = (e.clientY - rect.top - rect.height / 2) * strength
// //         node.style.transform = `translate(${x}px, ${y}px)`
// //     }, [strength])

// //     const onMouseLeave = useCallback(() => {
// //         const node = ref.current
// //         if (!node) return
// //         node.style.transform = `translate(0, 0)`
// //     }, [])

// //     return { ref, onMouseMove, onMouseLeave }
// // }

// // const TiltCard = ({ index, title, text }) => {
// //     const { ref, onMouseMove, onMouseLeave } = useTilt(8)
// //     return (
// //         <RevealBlock className="about__mission-card-wrap" delay={index * 120}>
// //             <div
// //                 ref={ref}
// //                 className="about__mission-card"
// //                 onMouseMove={onMouseMove}
// //                 onMouseLeave={onMouseLeave}>
// //                 <span className="about__mission-card-glow" />
// //                 <h3>{String(index + 1).padStart(2, '0')}. {title}</h3>
// //                 <p>{text}</p>
// //             </div>
// //         </RevealBlock>
// //     )
// // }

// // const StatItem = ({ value, suffix, label, trigger, delay }) => {
// //     const count = useCountUp(value, 1500 + delay, trigger)
// //     return (
// //         <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
// //             <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>
// //                 {count}{suffix}
// //             </span>
// //             <span className="about__stat-label">{label}</span>
// //         </div>
// //     )
// // }

// // const About = () => {
// //     const [activePoint, setActivePoint] = useState(null)
// //     const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
// //     const [heroLoaded, setHeroLoaded] = useState(false)

// //     const heroGlowRef = useRef(null)
// //     const ctaMagnet = useMagnetic(0.3)
// //     const timelineRef = useRef(null)
// //     const [lineProgress, setLineProgress] = useState(0)

// //     useEffect(() => {
// //         const t = requestAnimationFrame(() => setHeroLoaded(true))
// //         return () => cancelAnimationFrame(t)
// //     }, [])

// //     useEffect(() => {
// //         const handleMove = (e) => {
// //             const node = heroGlowRef.current
// //             if (!node) return
// //             const x = (e.clientX / window.innerWidth) * 100
// //             const y = (e.clientY / window.innerHeight) * 100
// //             node.style.setProperty('--mx', `${x}%`)
// //             node.style.setProperty('--my', `${y}%`)
// //         }
// //         window.addEventListener('mousemove', handleMove)
// //         return () => window.removeEventListener('mousemove', handleMove)
// //     }, [])

// //     useEffect(() => {
// //         const handleScroll = () => {
// //             const node = timelineRef.current
// //             if (!node) return
// //             const rect = node.getBoundingClientRect()
// //             const vh = window.innerHeight
// //             const total = rect.height
// //             const seen = Math.min(Math.max(vh * 0.7 - rect.top, 0), total)
// //             setLineProgress(Math.min((seen / total) * 100, 100))
// //         }
// //         window.addEventListener('scroll', handleScroll, { passive: true })
// //         handleScroll()
// //         return () => window.removeEventListener('scroll', handleScroll)
// //     }, [])

// //     const heroWords = "Trust for every engine on the move".split(" ")

// //     return (
// //         <div className="about">

// //             <section className="about__hero">
// //                 <div className="about__hero-bg">
// //                     <div ref={heroGlowRef} className="about__hero-cursor-glow" />
// //                     <div className="about__hero-glow about__hero-glow--gold" />
// //                     <div className="about__hero-glow about__hero-glow--red" />
// //                     <div className="about__hero-grid" />
// //                 </div>
// //             </section>

// //             <section className="about__mission">
// //                 <div className="about__mission-sticky">
// //                     <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark" variant="left">
// //                         Our mission
// //                     </RevealBlock>
// //                     <RevealBlock as="h2" className="about__mission-title" delay={100} variant="left">
// //                         Quality isn't an accident. It's a system.
// //                     </RevealBlock>
// //                 </div>

// //                 <div className="about__mission-content">
// //                     <TiltCard
// //                         index={0}
// //                         title="Technology"
// //                         text="Every formula is lab-tested and aligned with international API and ACEA standards."
// //                     />
// //                     <TiltCard
// //                         index={1}
// //                         title="Local engineering"
// //                         text="Formulated for Uzbekistan's climate — built to handle scorching summers and harsh winters."
// //                     />
// //                     <TiltCard
// //                         index={2}
// //                         title="Trust"
// //                         text="120+ official dealers and thousands of drivers rely on WINNER products every day."
// //                     />
// //                 </div>
// //             </section>

// //             <section className="about__stats" ref={statsRef}>
// //                 <div className="about__stats-grid">
// //                     {stats.map((s, i) => (
// //                         <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />
// //                     ))}
// //                 </div>
// //             </section>

// //             <section className="about__timeline" ref={timelineRef}>
// //                 <RevealBlock as="h2" className="about__section-title" variant="blur">
// //                     Our journey
// //                 </RevealBlock>

// //                 <div className="about__timeline-line">
// //                     <div className="about__timeline-line-fill" style={{ height: `${lineProgress}%` }} />
// //                 </div>

// //                 <div className="about__timeline-list">
// //                     {milestones.map((m, i) => (
// //                         <RevealBlock
// //                             key={m.year}
// //                             className={`about__timeline-item ${i % 2 === 0 ? "is-left" : "is-right"}`}
// //                             delay={i * 90}
// //                             variant={i % 2 === 0 ? "left" : "right"}
// //                         >
// //                             <div className="about__timeline-dot">
// //                                 <span className="about__timeline-dot-ring" />
// //                             </div>
// //                             <div className="about__timeline-card">
// //                                 <span className="about__timeline-year">{m.year}</span>
// //                                 <h3>{m.title}</h3>
// //                                 <p>{m.text}</p>
// //                             </div>
// //                         </RevealBlock>
// //                     ))}
// //                 </div>
// //             </section>
// //         </div>
// //     )
// // }

// // export default About

// import React, { useEffect, useRef, useState, useCallback } from 'react'
// import "./about.scss"

// const milestones = [
//     { year: "2011", code: "WNR—01", title: "The foundation", text: "WINNER entered the Uzbek market with its first product line." },
//     { year: "2015", code: "WNR—02", title: "Production scaled up", text: "New blending lines launched, tripling annual output." },
//     { year: "2018", code: "WNR—03", title: "Quality certified", text: "Compliance confirmed against international API and ACEA standards." },
//     { year: "2021", code: "WNR—04", title: "Regional network", text: "120+ official dealer points opened across 12 regions." },
//     { year: "2024", code: "WNR—05", title: "Next-gen formulas", text: "A new fully synthetic line engineered for extreme heat resistance." },
// ]

// const stats = [
//     { value: 120, suffix: "+", label: "Dealer points", code: "QTY.DLR" },
//     { value: 12, suffix: "", label: "Regions covered", code: "QTY.REG" },
//     { value: 13, suffix: "", label: "Years of experience", code: "QTY.YRS" },
//     { value: 40, suffix: "+", label: "Product types", code: "QTY.SKU" },
// ]

// const grades = ["5W-30", "10W-40", "15W-40", "0W-20"]

// const regions = [
//     { name: "Tashkent", dealers: 34, x: 68, y: 24, coord: "41.31°N 69.28°E" },
//     { name: "Samarkand", dealers: 18, x: 46, y: 46, coord: "39.65°N 66.97°E" },
//     { name: "Bukhara", dealers: 14, x: 28, y: 50, coord: "39.77°N 64.42°E" },
//     { name: "Andijan", dealers: 12, x: 86, y: 30, coord: "40.78°N 72.34°E" },
//     { name: "Fergana", dealers: 10, x: 80, y: 34, coord: "40.39°N 71.78°E" },
//     { name: "Namangan", dealers: 9, x: 78, y: 22, coord: "40.99°N 71.67°E" },
//     { name: "Khorezm", dealers: 8, x: 14, y: 30, coord: "41.55°N 60.63°E" },
//     { name: "Nukus", dealers: 7, x: 10, y: 18, coord: "42.46°N 59.61°E" },
//     { name: "Qarshi", dealers: 8, x: 42, y: 62, coord: "38.86°N 65.79°E" },
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

// // Recurring structural motif: technical corner brackets, like a measured/certified spec drawing.
// const CornerBrackets = ({ variant = "" }) => (
//     <span className={`brackets ${variant}`} aria-hidden="true">
//         <span className="brackets__corner brackets__corner--tl" />
//         <span className="brackets__corner brackets__corner--tr" />
//         <span className="brackets__corner brackets__corner--bl" />
//         <span className="brackets__corner brackets__corner--br" />
//     </span>
// )

// const TiltCard = ({ index, title, text }) => {
//     const { ref, onMouseMove, onMouseLeave } = useTilt(8)
//     return (
//         <RevealBlock
//             className={`about__mission-card-wrap stagger-${index}`}
//             delay={index * 130}
//             variant={index % 2 === 0 ? "left" : "right"}
//         >
//             <div
//                 ref={ref}
//                 className="about__mission-card"
//                 onMouseMove={onMouseMove}
//                 onMouseLeave={onMouseLeave}>
//                 <span className="about__mission-card-glow" />
//                 <CornerBrackets />
//                 <span className="about__mission-card-ghost">{String(index + 1).padStart(2, '0')}</span>
//                 <span className="about__mission-card-index">SPEC.{String(index + 1).padStart(2, '0')}</span>
//                 <h3>{title}</h3>
//                 <p>{text}</p>
//             </div>
//         </RevealBlock>
//     )
// }

// const StatItem = ({ value, suffix, label, code, trigger, delay }) => {
//     const count = useCountUp(value, 1500 + delay, trigger)
//     return (
//         <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
//             <CornerBrackets variant="brackets--light" />
//             <span className="about__stat-code">{code}</span>
//             <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>
//                 {count}{suffix}
//             </span>
//             <span className="about__stat-label">{label}</span>
//             <span className="about__stat-gauge">
//                 <span
//                     className="about__stat-gauge-fill"
//                     style={{ width: trigger ? `${Math.min((value / 130) * 100, 100)}%` : "0%" }}
//                 />
//             </span>
//         </div>
//     )
// }

// const About = () => {
//     const [activePoint, setActivePoint] = useState(null)
//     const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
//     const [heroLoaded, setHeroLoaded] = useState(false)
//     const [scrollPct, setScrollPct] = useState(0)

//     const heroGlowRef = useRef(null)
//     const ctaMagnet = useMagnetic(0.3)
//     const timelineRef = useRef(null)
//     const [lineProgress, setLineProgress] = useState(0)

//     useEffect(() => {
//         const t = requestAnimationFrame(() => requestAnimationFrame(() => setHeroLoaded(true)))
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
//             if (node) {
//                 const rect = node.getBoundingClientRect()
//                 const vh = window.innerHeight
//                 const total = rect.height
//                 const seen = Math.min(Math.max(vh * 0.7 - rect.top, 0), total)
//                 setLineProgress(Math.min((seen / total) * 100, 100))
//             }

//             const doc = document.documentElement
//             const max = doc.scrollHeight - doc.clientHeight
//             setScrollPct(max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0)
//         }
//         window.addEventListener('scroll', handleScroll, { passive: true })
//         handleScroll()
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     const heroWords = ["Trust", "for", "every", "engine", "on", "the", "move"]

//     return (
//         <div className="about">

//             {/* Signature element — a dipstick gauge that reads overall page progress,
//                echoing how an oil level is actually checked. */}
//             <div className="dipstick" aria-hidden="true">
//                 <span className="dipstick__cap" />
//                 <span className="dipstick__track">
//                     <span className="dipstick__fill" style={{ height: `${scrollPct}%` }} />
//                     <span className="dipstick__mark dipstick__mark--max" style={{ bottom: "82%" }}>MAX</span>
//                     <span className="dipstick__mark dipstick__mark--min" style={{ bottom: "12%" }}>MIN</span>
//                 </span>
//                 <span className="dipstick__readout">{String(Math.round(scrollPct)).padStart(2, '0')}%</span>
//             </div>

//             <section className={`about__hero ${heroLoaded ? "is-loaded" : ""}`}>
//                 <div className="about__hero-bg">
//                     <div ref={heroGlowRef} className="about__hero-cursor-glow" />
//                     <div className="about__hero-glow about__hero-glow--gold" />
//                     <div className="about__hero-glow about__hero-glow--red" />
//                     <div className="about__hero-grid" />
//                     <div className="about__hero-ruler about__hero-ruler--top" />
//                     <div className="about__hero-ruler about__hero-ruler--left" />
//                 </div>

//                 <div className="about__hero-inner">
//                     <div className="about__hero-meta about__hero-meta--in">
//                         <span>FILE NO. WNR—2024—AB</span>
//                         <span className="about__hero-meta-dot" />
//                         <span>41.31°N · 69.28°E — TASHKENT, UZ</span>
//                     </div>

//                     <span className="about__eyebrow about__eyebrow--in">Since 2011 — Uzbekistan</span>

//                     <h1 className="about__hero-title">
//                         {heroWords.map((word, i) => (
//                             <span className="about__hero-word-mask" key={word + i}>
//                                 <span
//                                     className={`about__hero-word ${word === "engine" ? "is-accent" : ""}`}
//                                     style={{ transitionDelay: `${i * 60}ms` }}
//                                 >
//                                     {word}
//                                 </span>
//                             </span>
//                         ))}
//                     </h1>

//                     <p className="about__hero-text about__hero-text--in">
//                         From a single product line to a nationwide network — WINNER blends
//                         lubricants engineered for Uzbekistan's roads, climate, and drivers.
//                     </p>

//                     <div className="about__hero-grades about__hero-grades--in">
//                         {grades.map((g) => (
//                             <span key={g} className="about__hero-grade">{g}</span>
//                         ))}
//                     </div>

//                     <div className="about__hero-scroll about__hero-scroll--in">
//                         <span />
//                         <p>Scroll</p>
//                     </div>
//                 </div>
//             </section>

//             <section className="about__mission">
//                 <div className="about__mission-rule" />
//                 <div className="about__mission-sticky">
//                     <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark" variant="left">
//                         Our mission — 01
//                     </RevealBlock>
//                     <RevealBlock as="h2" className="about__mission-title" delay={100} variant="left">
//                         Quality isn't<br />an accident.<br /><em>It's a system.</em>
//                     </RevealBlock>
//                     <RevealBlock as="p" className="about__mission-note" delay={180} variant="left">
//                         Three principles run through every batch that leaves the plant.
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
//                 <div className="about__stats-grid-bg" />
//                 <span className="about__stats-tag">02 — BY THE NUMBERS</span>
//                 <div className="about__stats-grid">
//                     {stats.map((s, i) => (
//                         <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />
//                     ))}
//                 </div>
//             </section>

//             <section className="about__timeline" ref={timelineRef}>
//                 <RevealBlock as="span" className="about__eyebrow" variant="blur">03 — Our journey</RevealBlock>
//                 <RevealBlock as="h2" className="about__section-title" delay={60} variant="blur">
//                     Thirteen years, charted
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
//                             <span className="about__timeline-ghost">{m.year}</span>
//                             <div className="about__timeline-dot">
//                                 <span className="about__timeline-dot-ring" />
//                             </div>
//                             <div className="about__timeline-leader" />
//                             <div className="about__timeline-card">
//                                 <CornerBrackets variant="brackets--small" />
//                                 <div className="about__timeline-card-head">
//                                     <span className="about__timeline-year">{m.year}</span>
//                                     <span className="about__timeline-code">{m.code}</span>
//                                 </div>
//                                 <h3>{m.title}</h3>
//                                 <p>{m.text}</p>
//                             </div>
//                         </RevealBlock>
//                     ))}
//                 </div>
//             </section>

//             <section className="about__map-section">
//                 <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark">04 — Coverage</RevealBlock>
//                 <RevealBlock as="h2" className="about__section-title" delay={80}>
//                     Wherever the road goes
//                 </RevealBlock>
//                 <RevealBlock as="p" className="about__map-subtitle" delay={140}>
//                     Select a point on the grid to read its coverage data.
//                 </RevealBlock>

//                 <div className="about__map-layout">
//                     <RevealBlock className="about__map" delay={200} variant="scale">
//                         <CornerBrackets />
//                         <div className="about__map-ruler about__map-ruler--x">
//                             {Array.from({ length: 11 }).map((_, i) => <span key={i} />)}
//                         </div>
//                         <div className="about__map-ruler about__map-ruler--y">
//                             {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
//                         </div>
//                         <svg className="about__map-svg" viewBox="0 0 100 70">
//                             <rect x="2" y="2" width="96" height="66" rx="2" className="about__map-shape" />
//                             {regions.map((r, i) => (
//                                 <g
//                                     key={r.name}
//                                     className={`about__map-point ${activePoint === r.name ? "is-active" : ""}`}
//                                     style={{ animationDelay: `${i * 90}ms` }}
//                                     onMouseEnter={() => setActivePoint(r.name)}
//                                     onMouseLeave={() => setActivePoint(null)}
//                                     onClick={() => setActivePoint(r.name)}
//                                 >
//                                     <circle cx={r.x} cy={r.y} r="3.6" className="about__map-pulse" />
//                                     <circle cx={r.x} cy={r.y} r="1.3" className="about__map-dot" />
//                                 </g>
//                             ))}
//                         </svg>
//                     </RevealBlock>

//                     <RevealBlock className="about__map-panel" delay={260} variant="right">
//                         <span className="about__map-panel-label">READOUT</span>
//                         {activePoint ? (
//                             (() => {
//                                 const r = regions.find(rg => rg.name === activePoint)
//                                 return (
//                                     <>
//                                         <strong className="about__map-panel-name">{r.name}</strong>
//                                         <span className="about__map-panel-coord">{r.coord}</span>
//                                         <div className="about__map-panel-row">
//                                             <span>Dealer points</span>
//                                             <span>{r.dealers}</span>
//                                         </div>
//                                     </>
//                                 )
//                             })()
//                         ) : (
//                             <span className="about__map-panel-empty">Hover or tap a point —</span>
//                         )}
//                         <ul className="about__map-panel-list">
//                             {regions.map(r => (
//                                 <li
//                                     key={r.name}
//                                     className={activePoint === r.name ? "is-active" : ""}
//                                     onMouseEnter={() => setActivePoint(r.name)}
//                                     onMouseLeave={() => setActivePoint(null)}
//                                 >
//                                     <span>{r.name}</span>
//                                     <span>{r.dealers}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </RevealBlock>
//                 </div>
//             </section>

//             <section className="about__cta">
//                 <div className="about__cta-grid" />
//                 <RevealBlock as="span" className="about__eyebrow" delay={0}>05 — Get in touch</RevealBlock>
//                 <RevealBlock as="h2" delay={60}>Find your<br /><em>nearest dealer</em></RevealBlock>
//                 <RevealBlock as="p" delay={140}>
//                     120+ official points across 12 regions are ready to fit the right oil to your engine.
//                 </RevealBlock>
//                 <RevealBlock delay={220}>
//                     <button
//                         ref={ctaMagnet.ref}
//                         className="about__cta-btn"
//                         onMouseMove={ctaMagnet.onMouseMove}
//                         onMouseLeave={ctaMagnet.onMouseLeave}
//                     >
//                         <CornerBrackets variant="brackets--button" />
//                         <span>Find a dealer</span>
//                     </button>
//                 </RevealBlock>
//             </section>
//         </div>
//     )
// }

// export default About

import React, { useEffect, useRef, useState, useCallback } from 'react'
import "./about.scss"

const milestones = [
    { year: "2011", code: "WNR—01", title: "The foundation", text: "WINNER entered the Uzbek market with its first product line — a single conventional engine oil grade, blended in a rented facility on the outskirts of Tashkent and sold through a handful of independent garages." },
    { year: "2015", code: "WNR—02", title: "Production scaled up", text: "New blending lines launched on our own site, tripling annual output and letting us hold inventory ahead of demand for the first time instead of blending to order." },
    { year: "2018", code: "WNR—03", title: "Quality certified", text: "Compliance confirmed against international API and ACEA standards after an independent audit of our blending process, lab procedures, and batch traceability records." },
    { year: "2021", code: "WNR—04", title: "Regional network", text: "120+ official dealer points opened across 12 regions, each trained on the full product range so customers get the same recommendation whether they're in Tashkent or Nukus." },
    { year: "2024", code: "WNR—05", title: "Next-gen formulas", text: "A new fully synthetic line engineered for extreme heat resistance, developed specifically for the long highway stretches and high summer temperatures typical of Central Asian driving." },
]

const processSteps = [
    {
        title: "Sourcing",
        text: "Base oils are bought from vetted suppliers and checked against a viscosity and purity spec before they're ever pumped into a holding tank. Anything outside tolerance is rejected at the gate, not flagged later on the line.",
    },
    {
        title: "Blending",
        text: "Additive packages are mixed in small, traceable batches under controlled temperature, with every run logged against a batch number that follows the product all the way to the shelf.",
    },
    {
        title: "Testing",
        text: "Each batch goes through viscosity, flash point, and contamination checks in-house before release, mirroring the API and ACEA test methods rather than approximating them.",
    },
    {
        title: "Distribution",
        text: "Sealed canisters move through a regional network built to keep stock close to demand, so dealers rarely run a popular grade dry during peak season.",
    },
]

const stats = [
    { value: 120, suffix: "+", label: "Dealer points", code: "QTY.DLR" },
    { value: 12, suffix: "", label: "Regions covered", code: "QTY.REG" },
    { value: 13, suffix: "", label: "Years of experience", code: "QTY.YRS" },
    { value: 40, suffix: "+", label: "Product types", code: "QTY.SKU" },
]

const grades = ["5W-30", "10W-40", "15W-40", "0W-20"]

const regions = [
    { name: "Tashkent", dealers: 34, x: 68, y: 24, coord: "41.31°N 69.28°E" },
    { name: "Samarkand", dealers: 18, x: 46, y: 46, coord: "39.65°N 66.97°E" },
    { name: "Bukhara", dealers: 14, x: 28, y: 50, coord: "39.77°N 64.42°E" },
    { name: "Andijan", dealers: 12, x: 86, y: 30, coord: "40.78°N 72.34°E" },
    { name: "Fergana", dealers: 10, x: 80, y: 34, coord: "40.39°N 71.78°E" },
    { name: "Namangan", dealers: 9, x: 78, y: 22, coord: "40.99°N 71.67°E" },
    { name: "Khorezm", dealers: 8, x: 14, y: 30, coord: "41.55°N 60.63°E" },
    { name: "Nukus", dealers: 7, x: 10, y: 18, coord: "42.46°N 59.61°E" },
    { name: "Qarshi", dealers: 8, x: 42, y: 62, coord: "38.86°N 65.79°E" },
]

const useReveal = (options = {}) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.unobserve(node)
                }
            },
            { threshold: 0.2, ...options }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return [ref, visible]
}

const RevealBlock = ({ as: Tag = "div", className = "", delay = 0, variant = "up", children }) => {
    const [ref, visible] = useReveal()

    return (
        <Tag
            ref={ref}
            className={`${className} reveal reveal--${variant} ${visible ? "reveal--visible" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    )
}

const useCountUp = (target, duration = 1600, trigger = false) => {
    const [value, setValue] = useState(0)
    const started = useRef(false)

    useEffect(() => {
        if (!trigger || started.current) return
        started.current = true
        const start = performance.now()
        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = easeOutExpo(progress)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }, [trigger, target, duration])

    return value
}

const useTilt = (strength = 10) => {
    const ref = useRef(null)

    const onMouseMove = useCallback((e) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        node.style.setProperty('--tilt-x', `${(-py * strength).toFixed(2)}deg`)
        node.style.setProperty('--tilt-y', `${(px * strength).toFixed(2)}deg`)
        node.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`)
        node.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`)
    }, [strength])

    const onMouseLeave = useCallback(() => {
        const node = ref.current
        if (!node) return
        node.style.setProperty('--tilt-x', '0deg')
        node.style.setProperty('--tilt-y', '0deg')
    }, [])

    return { ref, onMouseMove, onMouseLeave }
}

const useMagnetic = (strength = 0.35) => {
    const ref = useRef(null)

    const onMouseMove = useCallback((e) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) * strength
        const y = (e.clientY - rect.top - rect.height / 2) * strength
        node.style.transform = `translate(${x}px, ${y}px)`
    }, [strength])

    const onMouseLeave = useCallback(() => {
        const node = ref.current
        if (!node) return
        node.style.transform = `translate(0, 0)`
    }, [])

    return { ref, onMouseMove, onMouseLeave }
}

// Recurring structural motif: technical corner brackets, like a measured/certified spec drawing.
const CornerBrackets = ({ variant = "" }) => (
    <span className={`brackets ${variant}`} aria-hidden="true">
        <span className="brackets__corner brackets__corner--tl" />
        <span className="brackets__corner brackets__corner--tr" />
        <span className="brackets__corner brackets__corner--bl" />
        <span className="brackets__corner brackets__corner--br" />
    </span>
)

const TiltCard = ({ index, title, text }) => {
    const { ref, onMouseMove, onMouseLeave } = useTilt(8)
    return (
        <RevealBlock
            className={`about__mission-card-wrap stagger-${index}`}
            delay={index * 130}
            variant={index % 2 === 0 ? "left" : "right"}
        >
            <div
                ref={ref}
                className="about__mission-card"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}>
                <span className="about__mission-card-glow" />
                <CornerBrackets />
                <span className="about__mission-card-ghost">{String(index + 1).padStart(2, '0')}</span>
                <span className="about__mission-card-index">SPEC.{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </RevealBlock>
    )
}

const StatItem = ({ value, suffix, label, code, trigger, delay }) => {
    const count = useCountUp(value, 1500 + delay, trigger)
    return (
        <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
            <CornerBrackets variant="brackets--light" />
            <span className="about__stat-code">{code}</span>
            <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>
                {count}{suffix}
            </span>
            <span className="about__stat-label">{label}</span>
            <span className="about__stat-gauge">
                <span
                    className="about__stat-gauge-fill"
                    style={{ width: trigger ? `${Math.min((value / 130) * 100, 100)}%` : "0%" }}
                />
            </span>
        </div>
    )
}

const About = () => {
    const [activePoint, setActivePoint] = useState(null)
    const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
    const [heroLoaded, setHeroLoaded] = useState(false)

    const heroGlowRef = useRef(null)
    const ctaMagnet = useMagnetic(0.3)
    const timelineRef = useRef(null)
    const [lineProgress, setLineProgress] = useState(0)

    useEffect(() => {
        const t = requestAnimationFrame(() => requestAnimationFrame(() => setHeroLoaded(true)))
        return () => cancelAnimationFrame(t)
    }, [])

    useEffect(() => {
        const handleMove = (e) => {
            const node = heroGlowRef.current
            if (!node) return
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100
            node.style.setProperty('--mx', `${x}%`)
            node.style.setProperty('--my', `${y}%`)
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const node = timelineRef.current
            if (node) {
                const rect = node.getBoundingClientRect()
                const vh = window.innerHeight
                const total = rect.height
                const seen = Math.min(Math.max(vh * 0.7 - rect.top, 0), total)
                setLineProgress(Math.min((seen / total) * 100, 100))
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const heroWords = ["Trust", "for", "every", "engine", "on", "the", "move"]

    return (
        <div className="about">

            <section className={`about__hero ${heroLoaded ? "is-loaded" : ""}`}>
                <div className="about__hero-bg">
                    <div ref={heroGlowRef} className="about__hero-cursor-glow" />
                    <div className="about__hero-glow about__hero-glow--gold" />
                    <div className="about__hero-glow about__hero-glow--red" />
                    <div className="about__hero-grid" />
                    <div className="about__hero-ruler about__hero-ruler--top" />
                    <div className="about__hero-ruler about__hero-ruler--left" />
                </div>

                <div className="about__hero-inner">
                    <div className="about__hero-meta about__hero-meta--in">
                        <span>FILE NO. WNR—2024—AB</span>
                        <span className="about__hero-meta-dot" />
                        <span>41.31°N · 69.28°E — TASHKENT, UZ</span>
                    </div>

                    <span className="about__eyebrow about__eyebrow--in">Since 2011 — Uzbekistan</span>

                    <h1 className="about__hero-title">
                        {heroWords.map((word, i) => (
                            <span className="about__hero-word-mask" key={word + i}>
                                <span
                                    className={`about__hero-word ${word === "engine" ? "is-accent" : ""}`}
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h1>

                    <p className="about__hero-text about__hero-text--in">
                        From a single product line to a nationwide network — WINNER blends
                        lubricants engineered for Uzbekistan's roads, climate, and drivers.
                        What started as one formula in 2011 is now a full catalogue of engine,
                        gear, and industrial oils, each one mixed, tested, and packed without
                        leaving the country — so the chain from lab bench to your engine bay
                        stays short, accountable, and easy to trace.
                    </p>

                    <div className="about__hero-grades about__hero-grades--in">
                        {grades.map((g) => (
                            <span key={g} className="about__hero-grade">{g}</span>
                        ))}
                    </div>

                    <div className="about__hero-scroll about__hero-scroll--in">
                        <span />
                        <p>Scroll</p>
                    </div>
                </div>
            </section>

            <section className="about__mission">
                <div className="about__mission-rule" />
                <div className="about__mission-sticky">
                    <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark" variant="left">
                        Our mission — 01
                    </RevealBlock>
                    <RevealBlock as="h2" className="about__mission-title" delay={100} variant="left">
                        Quality isn't<br />an accident.<br /><em>It's a system.</em>
                    </RevealBlock>
                    <RevealBlock as="p" className="about__mission-note" delay={180} variant="left">
                        Three principles run through every batch that leaves the plant. None
                        of them are negotiable, and each one shows up somewhere in the
                        finished bottle — in the additive package, in the cap, in the way a
                        dealer talks you through which grade your car actually needs.
                        We'd rather be slower and right than fast and forgettable.
                    </RevealBlock>
                </div>

                <div className="about__mission-content">
                    <TiltCard
                        index={0}
                        title="Technology"
                        text="Every formula is lab-tested and aligned with international API and ACEA standards, then re-checked in-house before a single batch ships. Base oils are selected for thermal stability first, additive packages second, so the chemistry holds up over the full service interval, not just on paper."
                    />
                    <TiltCard
                        index={1}
                        title="Local engineering"
                        text="Formulated for Uzbekistan's climate — built to handle scorching summers above 40°C and harsh continental winters without losing viscosity at either extreme. We tune pour point and shear stability around local fuel quality and the driving patterns of intercity routes, not a generic global average."
                    />
                    <TiltCard
                        index={2}
                        title="Trust"
                        text="120+ official dealers and thousands of drivers rely on WINNER products every day, from private car owners to fleet managers running dozens of vehicles. Every dealer is trained on our product range so the recommendation you get at the counter matches what your engine actually needs."
                    />
                </div>
            </section>

            <section className="about__process">
                <RevealBlock as="span" className="about__eyebrow about__eyebrow--dark">02 — How it's made</RevealBlock>
                <RevealBlock as="h2" className="about__section-title" delay={60}>
                    From base oil to bottle
                </RevealBlock>
                <RevealBlock as="p" className="about__process-intro" delay={120}>
                    Four stages stand between a raw base oil and a sealed canister on a
                    dealer's shelf. Each one has its own checklist, its own equipment, and
                    its own person responsible for signing it off.
                </RevealBlock>

                <div className="about__process-grid">
                    {processSteps.map((step, i) => (
                        <RevealBlock
                            key={step.title}
                            className="about__process-card"
                            delay={i * 110}
                            variant="up"
                        >
                            <CornerBrackets variant="brackets--small" />
                            <span className="about__process-step">{String(i + 1).padStart(2, '0')}</span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </RevealBlock>
                    ))}
                </div>
            </section>

            <section className="about__stats" ref={statsRef}>
                <div className="about__stats-grid-bg" />
                <div className="about__stats-head">
                    <span className="about__stats-tag">03 — BY THE NUMBERS</span>
                    <p className="about__stats-intro">
                        Thirteen years of steady, unglamorous work compound into a network
                        most competitors took twice as long to build — and into a catalogue
                        wide enough that a single dealer can outfit anything from a city
                        hatchback to a heavy truck off one shelf.
                    </p>
                </div>
                <div className="about__stats-grid">
                    {stats.map((s, i) => (
                        <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />
                    ))}
                </div>
            </section>

            <section className="about__timeline" ref={timelineRef}>
                <RevealBlock as="span" className="about__eyebrow" variant="blur">04 — Our journey</RevealBlock>
                <RevealBlock as="h2" className="about__section-title" delay={60} variant="blur">
                    Thirteen years, charted
                </RevealBlock>
                <RevealBlock as="p" className="about__timeline-intro" delay={120} variant="blur">
                    Every milestone below changed something concrete — a production line,
                    a certification, a region we could finally reach. Read it as a build
                    log, not a highlight reel.
                </RevealBlock>

                <div className="about__timeline-line">
                    <div className="about__timeline-line-fill" style={{ height: `${lineProgress}%` }} />
                </div>

                <div className="about__timeline-list">
                    {milestones.map((m, i) => (
                        <RevealBlock
                            key={m.year}
                            className={`about__timeline-item ${i % 2 === 0 ? "is-left" : "is-right"}`}
                            delay={i * 90}
                            variant={i % 2 === 0 ? "left" : "right"}
                        >
                            <span className="about__timeline-ghost">{m.year}</span>
                            <div className="about__timeline-dot">
                                <span className="about__timeline-dot-ring" />
                            </div>
                            <div className="about__timeline-leader" />
                            <div className="about__timeline-card">
                                <CornerBrackets variant="brackets--small" />
                                <div className="about__timeline-card-head">
                                    <span className="about__timeline-year">{m.year}</span>
                                    <span className="about__timeline-code">{m.code}</span>
                                </div>
                                <h3>{m.title}</h3>
                                <p>{m.text}</p>
                            </div>
                        </RevealBlock>
                    ))}
                </div>
            </section>

            {/* <section className="about__cta">
                <div className="about__cta-grid" />
                <RevealBlock as="span" className="about__eyebrow" delay={0}>06 — Get in touch</RevealBlock>
                <RevealBlock as="h2" delay={60}>Find your<br /><em>nearest dealer</em></RevealBlock>
                <RevealBlock as="p" delay={140}>
                    120+ official points across 12 regions are ready to fit the right oil
                    to your engine — whether that's a quick top-up or a full service plan
                    for a fleet. Every dealer carries the current catalogue and can order
                    in a specific grade within days if it isn't on the shelf.
                </RevealBlock>
                <RevealBlock delay={220}>
                    <button
                        ref={ctaMagnet.ref}
                        className="about__cta-btn"
                        onMouseMove={ctaMagnet.onMouseMove}
                        onMouseLeave={ctaMagnet.onMouseLeave}
                    >
                        <CornerBrackets variant="brackets--button" />
                        <span>Find a dealer</span>
                    </button>
                </RevealBlock>

                <RevealBlock className="about__cta-contact" delay={300}>
                    <div>
                        <span className="about__cta-contact-label">Head office</span>
                        <p>Tashkent, Uzbekistan — Yunusabad district</p>
                    </div>
                    <div>
                        <span className="about__cta-contact-label">Sales line</span>
                        <p>+998 71 200 00 00</p>
                    </div>
                    <div>
                        <span className="about__cta-contact-label">Working hours</span>
                        <p>Mon–Sat, 9:00–18:00</p>
                    </div>
                </RevealBlock>
            </section> */}
        </div>
    )
}

export default About