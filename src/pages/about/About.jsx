// import React, { useEffect, useRef, useState, useCallback } from 'react'

// import "./about.scss"

// const stats = [
//     { value: 120, suffix: "+", label: "Official dealer points" },
//     { value: 12, suffix: "", label: "Regions covered" },
//     { value: 13, suffix: "", label: "Years on the market" },
//     { value: 40, suffix: "+", label: "Product formulas" },
// ]

// const values = [
//     {
//         title: "Precision engineering",
//         text: "Every formula is lab-tested and aligned with API and ACEA standards before a single batch leaves the plant. Base oils are chosen for thermal stability first, additives second.",
//         icon: "gear",
//     },
//     {
//         title: "Built for local roads",
//         text: "Tuned for Uzbekistan's climate — scorching summers above 40°C, harsh continental winters, and long highway stretches between cities.",
//         icon: "sun",
//     },
//     {
//         title: "Traceable quality",
//         text: "Every batch is logged with a number that follows the product from tank to shelf, so any canister can be traced back to its exact production run.",
//         icon: "shield",
//     },
//     {
//         title: "Nationwide trust",
//         text: "120+ trained dealers give the same recommendation whether you're in Tashkent or Nukus, backed by a distribution network built to keep stock close to demand.",
//         icon: "map",
//     }
// ]

// const processSteps = [
//     { title: "Sourcing", text: "Base oils are bought from vetted suppliers and checked against a viscosity and purity spec before they're pumped into a holding tank." },
//     { title: "Blending", text: "Additive packages are mixed in small, traceable batches under controlled temperature, every run logged against a batch number." },
//     { title: "Testing", text: "Each batch goes through viscosity, flash point, and contamination checks in-house, mirroring API and ACEA test methods." },
//     { title: "Distribution", text: "Sealed canisters move through a regional network built to keep stock close to demand across all 12 regions." },
// ]

// const productCategories = [
//     {
//         title: "EVF",
//         tag: "Electric Vehicle Fluid",
//         image: "/assets/images/products/evf.jpg",
//         points: [
//             "Developed with global car makers for high-end EV and HEV fluids.",
//             "Built on research that leads the next paradigm of lubricants.",
//             "Supplied to a global No.1 electric car company.",
//         ],
//     },
//     {
//         title: "Engine Oil",
//         tag: "VHVI YUBASE",
//         image: "/assets/images/products/engine-oil.jpg",
//         points: [
//             "Blended from VHVI base oil, certified by global car makers.",
//             "Improves fuel efficiency in any driving condition.",
//             "Meets OEM specification for major car markers.",
//         ],
//     },
//     {
//         title: "Gear Oil",
//         tag: "Anti-wear technology",
//         image: "/assets/images/products/gear-oil.jpg",
//         points: [
//             "VHVI base oil formulated for smooth, durable transmissions.",
//             "Supplied to global car makers on our own technology.",
//         ],
//     },
//     {
//         title: "Hydraulic / Industrial",
//         tag: "Heavy duty",
//         image: "/assets/images/products/hydraulic-oil.jpg",
//         points: [
//             "Optimized per application, longer drain intervals.",
//             "Supplied to construction and agricultural manufacturers.",
//         ],
//     },
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
//             style={{ transitionDelay: `${delay}ms` }}>
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

// const useTilt = (strength = 8) => {
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

// const useMagnetic = (strength = 0.3) => {
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

// const useParallax = (strength = 0.15) => {
//     const ref = useRef(null)

//     useEffect(() => {
//         const node = ref.current
//         if (!node) return
//         let ticking = false

//         const update = () => {
//             const rect = node.getBoundingClientRect()
//             const vh = window.innerHeight || document.documentElement.clientHeight
//             const centerOffset = (rect.top + rect.height / 2) - vh / 2
//             const shift = -(centerOffset * strength)
//             node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
//             ticking = false
//         }

//         const onScroll = () => {
//             if (!ticking) {
//                 ticking = true
//                 requestAnimationFrame(update)
//             }
//         }

//         update()
//         window.addEventListener('scroll', onScroll, { passive: true })
//         window.addEventListener('resize', onScroll)
//         return () => {
//             window.removeEventListener('scroll', onScroll)
//             window.removeEventListener('resize', onScroll)
//         }
//     }, [strength])

//     return ref
// }

// const Icon = ({ name }) => {
//     const paths = {
//         gear: "M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 100 8 4 4 0 000-8z",
//         sun: "M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
//         shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
//         map: "M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14",
//     }

//     return (
//         <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//             <path d={paths[name]} />
//         </svg>
//     )
// }

// const ValueCard = ({ index, title, text, icon }) => {
//     const { ref, onMouseMove, onMouseLeave } = useTilt(6)
//     return (
//         <RevealBlock className="about__value-wrap" delay={index * 100} variant="up">
//             <div ref={ref} className="about__value" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
//                 <span className="about__value-glow" />
//                 <span className="about__value-icon"><Icon name={icon} /></span>
//                 <h3>{title}</h3>
//                 <p>{text}</p>
//             </div>
//         </RevealBlock>
//     )
// }

// const StatItem = ({ value, suffix, label, trigger, delay }) => {
//     const count = useCountUp(value, 1500 + delay, trigger)
//     return (
//         <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
//             <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>{count}{suffix}</span>
//             <span className="about__stat-label">{label}</span>
//         </div>
//     )
// }

// const ProductColumn = ({ index, title, tag, image, points }) => {
//     const [ref, visible] = useReveal({ threshold: 0.15 })
//     const parallaxRef = useParallax(0.12)

//     return (
//         <div
//             ref={ref}
//             className={`about__pcol ${visible ? "is-visible" : ""}`}
//             style={{ transitionDelay: `${index * 90}ms` }}
//         >
//             <div className="about__pcol-image">
//                 <img ref={parallaxRef} src={image} alt={title} loading="lazy" />
//             </div>

//             <span className="about__pcol-tag">{tag}</span>
//             <h3 className="about__pcol-title">{title}</h3>
//             <span className="about__pcol-rule" />

//             <ul className="about__pcol-points">
//                 {points.map((point, idx) => (
//                     <li key={idx}>{point}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

// const About = () => {
//     const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
//     const [heroLoaded, setHeroLoaded] = useState(false)
//     const ctaMagnet = useMagnetic(0.25)

//     useEffect(() => {
//         const t = requestAnimationFrame(() => requestAnimationFrame(() => setHeroLoaded(true)))
//         return () => cancelAnimationFrame(t)
//     }, [])

//     const heroWords = ["Powerful", "performance,", "engineered", "at", "home"]

//     return (
//         <div className="about">

//             <section className={`about__hero ${heroLoaded ? "is-loaded" : ""}`}>
//                 <div className="about__hero-bg">
//                     <span className="about__hero-stripe" />
//                 </div>

//                 <div className="about__hero-inner container">
//                     <h1 className="about__hero-title">
//                         {heroWords.map((word, i) => (
//                             <span className="about__hero-word-mask" key={word + i}>
//                                 <span
//                                     className={`about__hero-word ${word === "home" ? "is-accent" : ""}`}
//                                     style={{ transitionDelay: `${i * 60}ms` }}
//                                 >
//                                     {word}
//                                 </span>
//                             </span>
//                         ))}
//                     </h1>
//                 </div>
//             </section>

//             <section className="about__intro container">
//                 <div className="about__intro-grid">
//                     <RevealBlock as="h2" className="about__intro-title" variant="left">
//                         Thirteen years of blending oil for Uzbek roads, not average ones.
//                     </RevealBlock>

//                     <RevealBlock as="p" className="about__intro-text" delay={100} variant="right">
//                         WINNER started in 2011 with one conventional engine oil grade and a
//                         rented facility outside Tashkent. Today we run our own blending lines,
//                         an in-house testing lab, and a dealer network that spans all twelve
//                         regions of the country. Every formula is developed for local
//                         conditions first — extreme summer heat, long highway distances, and
//                         the fuel quality drivers actually encounter — and checked against
//                         international API and ACEA standards second, so nothing here is a
//                         generic import with a new label.
//                     </RevealBlock>
//                 </div>
//             </section>

//             <section className="about__values container">
//                 <RevealBlock as="span" className="about__eyebrow" variant="left">What we stand for</RevealBlock>

//                 <RevealBlock as="h2" className="about__section-title" delay={60} variant="left">
//                     Quality isn't an accident
//                 </RevealBlock>

//                 <div className="about__values-grid">
//                     {values.map((v, i) => <ValueCard key={v.title} index={i} {...v} />)}
//                 </div>
//             </section>

//             <section className="about__prods container">
//                 <RevealBlock as="h2" className="about__section-title" delay={60} variant="left">
//                     Lubricant product portfolio
//                 </RevealBlock>

//                 <div className="about__pcol-row">
//                     {productCategories.map((p, i) => (
//                         <ProductColumn key={p.title} index={i} {...p} />
//                     ))}
//                 </div>
//             </section>

//             <section className="about__stats" ref={statsRef}>
//                 <div className="about__stats-grid container">
//                     {stats.map((s, i) => <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />)}
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default About


import React from "react";
import "./about.scss";

export default function AboutSections() {
    return (
        <div className="about">

            <section className="about-hero">
                <div className="about-hero__container container">
                    <div className="about-hero__content">
                        <div className="about-hero__content-eyebrow">ABOUT WINNER</div>
                        <h1 className="about-hero__content-title">POWERFUL PERFORMANCE. MADE WITH PURPOSE.</h1>
                        <p className="about-hero__content-text">
                            For over 15 years, WINNER has engineered high-performance
                            lubricants that protect, perform, and go the distance.
                            Trusted at home. Chosen on every road.
                        </p>
                        <a href="#" className="link-arrow">OUR STORY →</a>
                    </div>
                    <div className="about-hero__watermark">15</div>
                    <div className="about-hero__image">
                        <svg viewBox="0 0 700 460" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#c9dceb" />
                                    <stop offset="1" stopColor="#eef2f4" />
                                </linearGradient>

                                <linearGradient id="tank" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0" stopColor="#e7eaed" />
                                    <stop offset="0.35" stopColor="#c3c8cd" />
                                    <stop offset="0.55" stopColor="#eef0f2" />
                                    <stop offset="1" stopColor="#8f959c" />
                                </linearGradient>
                                <linearGradient id="building" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#eef0f1" />
                                    <stop offset="1" stopColor="#d7dadd" />
                                </linearGradient>
                            </defs>

                            <rect x="0" y="0" width="700" height="300" fill="url(#sky)" />
                            <rect x="0" y="290" width="700" height="170" fill="#b9bec3" />
                            <rect x="0" y="300" width="700" height="6" fill="#a7acb2" />

                            <rect x="420" y="150" width="260" height="150" fill="url(#building)" />
                            <rect x="420" y="140" width="260" height="12" fill="#c7ccd0" />

                            <g fill="#aab0b6">
                                <rect x="440" y="170" width="10" height="120" />
                                <rect x="465" y="170" width="10" height="120" />
                                <rect x="490" y="170" width="10" height="120" />
                                <rect x="515" y="170" width="10" height="120" />
                                <rect x="540" y="170" width="10" height="120" />
                                <rect x="565" y="170" width="10" height="120" />
                                <rect x="590" y="170" width="10" height="120" />
                                <rect x="615" y="170" width="10" height="120" />
                                <rect x="640" y="170" width="10" height="120" />
                                <rect x="665" y="170" width="10" height="120" />
                            </g>

                            <rect x="20" y="190" width="180" height="110" fill="#d3d7da" />
                            <rect x="20" y="182" width="180" height="10" fill="#bfc4c8" />
                            <rect x="35" y="215" width="150" height="60" fill="#c1c6ca" />

                            <g fill="#5c7a52">
                                <ellipse cx="230" cy="285" rx="16" ry="20" />
                                <ellipse cx="260" cy="290" rx="14" ry="17" />
                                <ellipse cx="205" cy="292" rx="12" ry="15" />
                            </g>

                            <g stroke="#3f5636" strokeWidth="3">
                                <line x1="230" y1="285" x2="230" y2="300" />
                                <line x1="260" y1="290" x2="260" y2="302" />
                                <line x1="205" y1="292" x2="205" y2="303" />
                            </g>

                            <g>
                                <rect x="80" y="150" width="46" height="150" rx="4" fill="url(#tank)" />
                                <ellipse cx="103" cy="150" rx="23" ry="8" fill="#f2f4f5" />
                                <rect x="80" y="140" width="46" height="10" fill="#9aa0a6" />

                                <rect x="140" y="110" width="54" height="190" rx="4" fill="url(#tank)" />
                                <ellipse cx="167" cy="110" rx="27" ry="9" fill="#f2f4f5" />
                                <rect x="140" y="98" width="54" height="12" fill="#9aa0a6" />

                                <rect x="210" y="130" width="50" height="170" rx="4" fill="url(#tank)" />
                                <ellipse cx="235" cy="130" rx="25" ry="8" fill="#f2f4f5" />

                                <rect x="275" y="95" width="58" height="205" rx="4" fill="url(#tank)" />
                                <ellipse cx="304" cy="95" rx="29" ry="9" fill="#f2f4f5" />
                                <rect x="275" y="83" width="58" height="12" fill="#9aa0a6" />

                                <rect x="345" y="140" width="48" height="160" rx="4" fill="url(#tank)" />
                                <ellipse cx="369" cy="140" rx="24" ry="8" fill="#f2f4f5" />

                                <rect x="405" y="115" width="52" height="185" rx="4" fill="url(#tank)" />
                                <ellipse cx="431" cy="115" rx="26" ry="8" fill="#f2f4f5" />
                                <rect x="405" y="103" width="52" height="12" fill="#9aa0a6" />

                                <rect x="465" y="160" width="42" height="140" rx="4" fill="url(#tank)" />
                                <ellipse cx="486" cy="160" rx="21" ry="7" fill="#f2f4f5" />
                            </g>

                            <g stroke="#8b9096" strokeWidth="4" fill="none">
                                <path d="M126 260 H140" />
                                <path d="M194 250 H210" />
                                <path d="M260 240 H275" />
                                <path d="M333 230 H345" />
                                <path d="M393 245 H405" />
                                <path d="M457 255 H465" />
                            </g>

                            <g stroke="#a3a8ad" strokeWidth="2">
                                <line x1="0" y1="330" x2="700" y2="330" />
                                <line x1="0" y1="370" x2="700" y2="370" />
                            </g>
                        </svg>
                    </div>
                </div>
            </section>

            <section className="about-band">
                <div className="about-band-container container">
                    <div className="about-band__title">FROM TASHKENT TO THE ROAD</div>
                    <div className="about-band__desc">
                        Founded in Tashkent in 2011, WINNER began with a clear mission:
                        to create world-class lubricants engineered for real-world
                        conditions. Today, we operate with modern technology, rigorous
                        standards, and a commitment to delivering performance you can
                        rely on.
                    </div>

                    <div className="about-band__numbers">
                        <div className="about-band__stat">
                            <div className="num">15+</div>
                            <div className="label">YEARS</div>
                        </div>

                        <div className="about-band__stat">
                            <div className="num">30+</div>
                            <div className="label">MARKETS</div>
                        </div>

                        <div className="about-band__stat">
                            <div className="num">100+</div>
                            <div className="label">PRODUCTS</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-defines">
                <div className="about-defines-container container">
                    <h2 className="about-defines__title">WHAT DEFINES US</h2>
                    <div className="about-defines__item">
                        <div className="num">01</div>
                        <h3 className="about-defines__item-title">INNOVATION</h3>
                        <p className="about-defines__item-text">
                            We invest in research and advanced formulations to create
                            lubricants that improve efficiency, protect engines, and
                            extend equipment life.
                        </p>
                    </div>
                    <div className="about-defines__item">
                        <div className="num">02</div>
                        <h3 className="about-defines__item-title">QUALITY</h3>
                        <p className="about-defines__item-text">
                            Every product is manufactured under strict quality control,
                            using premium base oils and advanced additive technology.
                        </p>
                    </div>
                    <div className="about-defines__item">
                        <div className="num">03</div>
                        <h3 className="about-defines__item-title">TRUST</h3>
                        <p className="about-defines__item-text">
                            We build lasting partnerships through consistency,
                            transparency, and a deep commitment to our customers'
                            success.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-quality">
                <div className="about-quality-container container">
                    <div className="about-quality__image">
                        <svg viewBox="0 0 640 460" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <defs>
                                <linearGradient id="labbg" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0" stopColor="#1e1f23" />
                                    <stop offset="1" stopColor="#0e0e10" />
                                </linearGradient>
                                <linearGradient id="oilamber" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#e8a23a" />
                                    <stop offset="1" stopColor="#a85f16" />
                                </linearGradient>
                                <linearGradient id="bottleg" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#2c2d31" />
                                    <stop offset="1" stopColor="#0c0c0e" />
                                </linearGradient>
                            </defs>

                            <rect x="0" y="0" width="640" height="460" fill="url(#labbg)" />
                            <rect x="0" y="330" width="640" height="130" fill="#0a0a0b" />

                            <g opacity="0.35">
                                <path d="M470 220 L490 220 L505 300 Q505 320 480 320 Q455 320 455 300 Z" fill="#3a3b40" />
                                <path d="M540 200 L556 200 L568 280 Q568 298 548 298 Q528 298 528 280 Z" fill="#3a3b40" />
                            </g>

                            <path d="M255 190 L285 190 L305 300 Q305 330 270 330 Q235 330 235 300 Z" fill="none" stroke="#8a8d92" strokeWidth="3" />
                            <path d="M243 270 Q243 300 270 300 Q297 300 297 270 L305 300 Q305 322 270 322 Q235 322 235 300 Z" fill="url(#oilamber)" />
                            <rect x="252" y="180" width="36" height="14" fill="none" stroke="#8a8d92" strokeWidth="3" />

                            <path d="M330 260 L392 260 L386 340 Q386 352 361 352 Q336 352 336 340 Z" fill="none" stroke="#8a8d92" strokeWidth="3" />
                            <path d="M340 320 Q340 340 361 340 Q382 340 382 320 L386 340 Q386 348 361 348 Q336 348 336 340 Z" fill="url(#oilamber)" />

                            <g>
                                <path d="M380 150 Q400 165 405 210 L392 215 Q385 175 368 162 Z" fill="#e7e9ea" />
                                <rect x="386" y="205" width="14" height="55" rx="6" fill="#e7e9ea" />
                                <rect x="389" y="255" width="8" height="18" fill="#c9ccd0" />
                                <circle cx="393" cy="276" r="3.5" fill="url(#oilamber)" />
                            </g>

                            <g>
                                <rect x="80" y="240" width="46" height="110" rx="4" fill="url(#bottleg)" stroke="#3a3b40" strokeWidth="1.5" />
                                <rect x="92" y="222" width="22" height="20" fill="#1a1a1c" />
                                <rect x="88" y="270" width="34" height="34" rx="2" fill="#e2231a" />
                                <text x="105" y="291" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">WINNER</text>

                                <rect x="140" y="235" width="46" height="115" rx="4" fill="url(#bottleg)" stroke="#3a3b40" strokeWidth="1.5" />
                                <rect x="152" y="216" width="22" height="20" fill="#1a1a1c" />
                                <rect x="148" y="266" width="34" height="34" rx="2" fill="#e2231a" />
                                <text x="165" y="287" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">WINNER</text>
                            </g>

                            <ellipse cx="160" cy="380" rx="220" ry="60" fill="#e2231a" opacity="0.08" />
                        </svg>
                    </div>
                    <div className="about-quality__content">
                        <h2 className="about-quality__content-title">CONTROL AT EVERY STAGE</h2>
                        <p className="about-quality__content-text">
                            From raw materials to finished product, every drop is tested.
                            Our quality process ensures reliability, performance, and
                            protection—every time.
                        </p>
                        <button className="btn-outline">QUALITY PROCESS</button>
                    </div>
                </div>
            </section>

            <section className="about-banner">
                <div className="about-banner-container container">
                    <h3 className="about-banner-title">BUILT LOCALLY. DRIVEN GLOBALLY.</h3>
                    <button className="btn-white">VIEW OUR PRODUCTS</button>
                </div>
            </section>

        </div>
    );
}