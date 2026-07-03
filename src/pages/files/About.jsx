import React, { useEffect, useRef, useState, useCallback } from 'react'
import "./about.scss"

const stats = [
    { value: 120, suffix: "+", label: "Official dealer points" },
    { value: 12, suffix: "", label: "Regions covered" },
    { value: 13, suffix: "", label: "Years on the market" },
    { value: 40, suffix: "+", label: "Product formulas" },
]

const values = [
    {
        title: "Precision engineering",
        text: "Every formula is lab-tested and aligned with API and ACEA standards before a single batch leaves the plant. Base oils are chosen for thermal stability first, additives second.",
        icon: "gear",
    },
    {
        title: "Built for local roads",
        text: "Tuned for Uzbekistan's climate — scorching summers above 40°C, harsh continental winters, and long highway stretches between cities.",
        icon: "sun",
    },
    {
        title: "Traceable quality",
        text: "Every batch is logged with a number that follows the product from tank to shelf, so any canister can be traced back to its exact production run.",
        icon: "shield",
    },
    {
        title: "Nationwide trust",
        text: "120+ trained dealers give the same recommendation whether you're in Tashkent or Nukus, backed by a distribution network built to keep stock close to demand.",
        icon: "map",
    },
]

const processSteps = [
    { title: "Sourcing", text: "Base oils are bought from vetted suppliers and checked against a viscosity and purity spec before they're pumped into a holding tank." },
    { title: "Blending", text: "Additive packages are mixed in small, traceable batches under controlled temperature, every run logged against a batch number." },
    { title: "Testing", text: "Each batch goes through viscosity, flash point, and contamination checks in-house, mirroring API and ACEA test methods." },
    { title: "Distribution", text: "Sealed canisters move through a regional network built to keep stock close to demand across all 12 regions." },
]

const productCategories = [
    { title: "Engine oils", grades: "0W-20 · 5W-30 · 10W-40 · 15W-40", text: "Fully synthetic, semi-synthetic and mineral grades for passenger cars, SUVs and light commercial vehicles." },
    { title: "Gear & transmission", grades: "75W-90 · 80W-90 · ATF", text: "GL-4/GL-5 gear oils and automatic transmission fluids engineered for high-load, high-heat drivetrains." },
    { title: "Industrial lubricants", grades: "Hydraulic · Compressor", text: "Formulated for manufacturing and construction equipment that runs long hours in demanding conditions." },
    { title: "Greases & specialty", grades: "Lithium · Multi-purpose", text: "Water-resistant, high-temperature greases for chassis, bearings and industrial machinery." },
]

const certifications = ["API", "ACEA", "ISO 9001", "JASO"]

const milestones = [
    { year: "2011", title: "The foundation", text: "WINNER entered the Uzbek market with its first product line — a single conventional engine oil grade, blended and sold through a handful of independent garages." },
    { year: "2015", title: "Production scaled up", text: "New blending lines launched on our own site, tripling annual output and letting us hold inventory ahead of demand." },
    { year: "2018", title: "Quality certified", text: "Compliance confirmed against international API and ACEA standards after an independent audit of our blending process and lab procedures." },
    { year: "2021", title: "Regional network", text: "120+ official dealer points opened across 12 regions, each trained on the full product range." },
    { year: "2024", title: "Next-gen formulas", text: "A new fully synthetic line engineered for extreme heat resistance, built for Central Asian driving conditions." },
]

const grades = ["5W-30", "10W-40", "15W-40", "0W-20"]

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

const useTilt = (strength = 8) => {
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

const useMagnetic = (strength = 0.3) => {
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

const Icon = ({ name }) => {
    const paths = {
        gear: "M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 100 8 4 4 0 000-8z",
        sun: "M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
        shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4",
        map: "M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14",
    }
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    )
}

const ValueCard = ({ index, title, text, icon }) => {
    const { ref, onMouseMove, onMouseLeave } = useTilt(6)
    return (
        <RevealBlock className="about__value-wrap" delay={index * 100} variant="up">
            <div ref={ref} className="about__value" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                <span className="about__value-glow" />
                <span className="about__value-icon"><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </RevealBlock>
    )
}

const StatItem = ({ value, suffix, label, trigger, delay }) => {
    const count = useCountUp(value, 1500 + delay, trigger)
    return (
        <div className="about__stat" style={{ transitionDelay: `${delay}ms` }}>
            <span className={`about__stat-value ${trigger ? "is-counted" : ""}`}>{count}{suffix}</span>
            <span className="about__stat-label">{label}</span>
        </div>
    )
}

const About = () => {
    const [statsRef, statsVisible] = useReveal({ threshold: 0.4 })
    const [heroLoaded, setHeroLoaded] = useState(false)
    const timelineRef = useRef(null)
    const [lineProgress, setLineProgress] = useState(0)
    const ctaMagnet = useMagnetic(0.25)

    useEffect(() => {
        const t = requestAnimationFrame(() => requestAnimationFrame(() => setHeroLoaded(true)))
        return () => cancelAnimationFrame(t)
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

    const heroWords = ["Powerful", "performance,", "engineered", "at", "home"]

    return (
        <div className="about">

            <section className={`about__hero ${heroLoaded ? "is-loaded" : ""}`}>
                <div className="about__hero-bg">
                    <span className="about__hero-stripe" />
                </div>

                <div className="about__hero-inner container">
                    <h1 className="about__hero-title">
                        {heroWords.map((word, i) => (
                            <span className="about__hero-word-mask" key={word + i}>
                                <span
                                    className={`about__hero-word ${word === "home" ? "is-accent" : ""}`}
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h1>

                    <p className="about__hero-text about__hero-text--in">
                        From a single product line to a nationwide network — WINNER blends
                        engine, gear, and industrial oils engineered for Uzbekistan's roads
                        and climate, mixed, tested, and packed without leaving the country.
                    </p>

                    <div className="about__hero-grades about__hero-grades--in">
                        {grades.map((g) => <span key={g} className="about__hero-grade">{g}</span>)}
                    </div>
                </div>
            </section>

            <section className="about__intro container">
                <RevealBlock as="span" className="about__eyebrow" variant="left">Who we are</RevealBlock>
                <div className="about__intro-grid">
                    <RevealBlock as="h2" className="about__intro-title" variant="left">
                        Thirteen years of blending oil for Uzbek roads, not average ones.
                    </RevealBlock>
                    <RevealBlock as="p" className="about__intro-text" delay={100} variant="right">
                        WINNER started in 2011 with one conventional engine oil grade and a
                        rented facility outside Tashkent. Today we run our own blending lines,
                        an in-house testing lab, and a dealer network that spans all twelve
                        regions of the country. Every formula is developed for local
                        conditions first — extreme summer heat, long highway distances, and
                        the fuel quality drivers actually encounter — and checked against
                        international API and ACEA standards second, so nothing here is a
                        generic import with a new label.
                    </RevealBlock>
                </div>
            </section>

            <section className="about__values container">
                <RevealBlock as="span" className="about__eyebrow" variant="left">What we stand for</RevealBlock>
                <RevealBlock as="h2" className="about__section-title" delay={60} variant="left">
                    Quality isn't an accident
                </RevealBlock>
                <div className="about__values-grid">
                    {values.map((v, i) => <ValueCard key={v.title} index={i} {...v} />)}
                </div>
            </section>

            <section className="about__process">
                <div className="container">
                    <RevealBlock as="span" className="about__eyebrow about__eyebrow--light" variant="left">How it's made</RevealBlock>
                    <RevealBlock as="h2" className="about__section-title about__section-title--light" delay={60} variant="left">
                        From base oil to bottle
                    </RevealBlock>

                    <div className="about__process-grid">
                        {processSteps.map((step, i) => (
                            <RevealBlock key={step.title} className="about__process-card" delay={i * 100} variant="up">
                                <span className="about__process-step">{String(i + 1).padStart(2, '0')}</span>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </RevealBlock>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about__stats" ref={statsRef}>
                <div className="about__stats-grid container">
                    {stats.map((s, i) => <StatItem key={s.label} {...s} trigger={statsVisible} delay={i * 120} />)}
                </div>
            </section>

            <section className="about__products container">
                <RevealBlock as="span" className="about__eyebrow" variant="left">Product range</RevealBlock>
                <RevealBlock as="h2" className="about__section-title" delay={60} variant="left">
                    One catalogue, every engine
                </RevealBlock>
                <RevealBlock as="p" className="about__products-intro" delay={100} variant="left">
                    From city hatchbacks to heavy trucks and factory floors, a single WINNER
                    dealer can outfit almost anything off one shelf.
                </RevealBlock>

                <div className="about__products-grid">
                    {productCategories.map((p, i) => (
                        <RevealBlock key={p.title} className="about__product-card" delay={i * 90} variant="up">
                            <span className="about__product-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3>{p.title}</h3>
                            <span className="about__product-grades">{p.grades}</span>
                            <p>{p.text}</p>
                        </RevealBlock>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default About
