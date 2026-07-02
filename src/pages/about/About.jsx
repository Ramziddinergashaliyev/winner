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
        </div>
    )
}

export default About