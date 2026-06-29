import React, { useEffect, useRef, useState, useCallback } from "react";
import "./about.scss";

const STATS = [
    { id: "stat-1", value: 18, suffix: "+", label: "Years of experience" },
    { id: "stat-2", value: 42, suffix: "", label: "Countries served" },
    { id: "stat-3", value: 250, suffix: "K+", label: "Units delivered" },
    { id: "stat-4", value: 99, suffix: "%", label: "Quality pass rate" },
];

const MILESTONES = [
    {
        id: "m-2008",
        year: "2008",
        title: "Founded",
        text: "WINNER started as a small lab with one goal — build oils that meet international standards for the local market.",
        image: "REPLACE_WITH_IMAGE_1",
    },
    {
        id: "m-2014",
        year: "2014",
        title: "Production scaled up",
        text: "A modern manufacturing facility went live, multiplying annual output tenfold.",
        image: "REPLACE_WITH_IMAGE_2",
    },
    {
        id: "m-2019",
        year: "2019",
        title: "International certification",
        text: "We earned API and ACEA certification, opening the door to European and Asian markets.",
        image: "REPLACE_WITH_IMAGE_3",
    },
    {
        id: "m-2026",
        year: "2026",
        title: "Today",
        text: "WINNER is one of the region's leading automotive lubricant brands, shipping to more than 40 countries.",
        image: "REPLACE_WITH_IMAGE_4",
    },
];

const useReveal = (threshold = 0.2) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
};

const useCountUp = (target, duration = 1400) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !started.current) {
                        started.current = true;

                        if (prefersReducedMotion) {
                            setValue(target);
                            return;
                        }

                        const startTime = performance.now();
                        const tick = (now) => {
                            const progress = Math.min(
                                (now - startTime) / duration,
                                1
                            );
                            const eased = 1 - Math.pow(1 - progress, 3);
                            setValue(Math.round(target * eased));
                            if (progress < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target, duration]);

    return [value, ref];
};

const TiltImage = ({ src, alt, className = "", placeholderLabel }) => {
    const frameRef = useRef(null);
    const reduced = useRef(
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const handleMouseMove = useCallback((e) => {
        if (reduced.current) return;
        const frame = frameRef.current;
        if (!frame) return;

        const rect = frame.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = (-y * 8).toFixed(2);
        const rotateY = (x * 8).toFixed(2);

        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        frame.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
        frame.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
    }, []);

    const handleMouseLeave = useCallback(() => {
        const frame = frameRef.current;
        if (!frame) return;
        frame.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }, []);

    return (
        <div
            className={`tilt-image ${className}`}
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {src ? (
                <img className="tilt-image__img" src={src} alt={alt} />
            ) : (
                <div className="tilt-image__placeholder">
                    <span>{placeholderLabel || "Image"}</span>
                </div>
            )}
            <span className="tilt-image__glow" aria-hidden="true" />
            <span className="tilt-image__edge" aria-hidden="true" />
        </div>
    );
};

const RevealBlock = ({
    as: Tag = "div",
    className = "",
    children,
    index = 0,
    threshold = 0.2,
}) => {
    const [ref, visible] = useReveal(threshold);
    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`}
            style={{ "--stagger": index }}
        >
            {children}
        </Tag>
    );
};

const StatBlock = ({ stat, index }) => {
    const [value, countRef] = useCountUp(stat.value);
    const [revealRef, visible] = useReveal(0.3);

    return (
        <div
            className={`about-stats__item reveal ${visible ? "is-visible" : ""
                }`}
            ref={(node) => {
                countRef.current = node;
                revealRef.current = node;
            }}
            style={{ "--stagger": index }}
        >
            <span className="about-stats__number">
                {value}
                <span className="about-stats__suffix">{stat.suffix}</span>
            </span>
            <span className="about-stats__label">{stat.label}</span>
        </div>
    );
};

const TimelineRow = ({ item, index }) => {
    const [ref, visible] = useReveal(0.25);
    const align = index % 2 === 0 ? "left" : "right";

    return (
        <article
            ref={ref}
            className={`timeline-row timeline-row--${align} reveal ${visible ? "is-visible" : ""
                }`}
        >
            <div className="timeline-row__media">
                <TiltImage
                    src=""
                    placeholderLabel={`Photo — ${item.year}`}
                    className="timeline-row__tilt"
                />
            </div>
            <div className="timeline-row__copy">
                <span className="timeline-row__year">{item.year}</span>
                <h3 className="timeline-row__title">{item.title}</h3>
                <p className="timeline-row__text">{item.text}</p>
            </div>
        </article>
    );
};

const About = () => {
    const heroRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <main className="about">
            <section className="about-hero" ref={heroRef}>
                <div
                    className="about-hero__media"
                    style={{
                        transform: `translateY(${scrollY * -0.05}px)`,
                    }}
                >
                    <TiltImage
                        src=""
                        placeholderLabel="Hero photo — engine / product shot"
                        className="about-hero__tilt"
                    />
                    <span className="about-hero__media-tag">01 — About</span>
                </div>

                <div className="about-hero__copy">
                    <span className="about-hero__eyebrow">
                        <span className="about-hero__eyebrow-dot" />
                        About WINNER
                    </span>

                    <h1 className="about-hero__title">
                        <span className="about-hero__title-row">
                            Engineered
                        </span>
                        <span className="about-hero__title-row">
                            for{" "}
                            <span className="about-hero__title-accent">
                                motion.
                            </span>
                        </span>
                    </h1>

                    <p className="about-hero__text">
                        WINNER is an automotive lubricant brand built on
                        engineering precision. We don't just make oil — we
                        build trust into every engine we protect.
                    </p>

                    <div className="about-hero__facts">
                        <div className="about-hero__fact">
                            <span className="about-hero__fact-value">
                                2008
                            </span>
                            <span className="about-hero__fact-label">
                                Founded
                            </span>
                        </div>
                        <div className="about-hero__fact">
                            <span className="about-hero__fact-value">
                                Tashkent
                            </span>
                            <span className="about-hero__fact-label">
                                Headquarters
                            </span>
                        </div>
                        <div className="about-hero__fact">
                            <span className="about-hero__fact-value">
                                42
                            </span>
                            <span className="about-hero__fact-label">
                                Countries served
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-split">
                <div className="about-split__sticky">
                    <span className="about-split__numeral" aria-hidden="true">
                        02
                    </span>
                    <span className="about-split__tag">Our mission</span>
                    <h2 className="about-split__heading">
                        A precise
                        <br />
                        formula for
                        <br />
                        every engine.
                    </h2>
                    <p className="about-split__body">
                        Every WINNER formula is tested in real road
                        conditions — from desert heat to mountain cold.
                    </p>
                </div>

                <div className="about-split__panels">
                    <RevealBlock
                        as="article"
                        className="about-split__panel"
                        index={0}
                    >
                        <TiltImage
                            src=""
                            placeholderLabel="Photo — lab testing"
                            className="about-split__tilt"
                        />
                        <div className="about-split__panel-copy">
                            <span className="about-split__panel-index">
                                01
                            </span>
                            <h3>Laboratory testing</h3>
                            <p>
                                Every batch goes through rigorous viscosity
                                and thermal-stability testing before it ships.
                            </p>
                        </div>
                    </RevealBlock>

                    <RevealBlock
                        as="article"
                        className="about-split__panel"
                        index={1}
                    >
                        <TiltImage
                            src=""
                            placeholderLabel="Photo — manufacturing line"
                            className="about-split__tilt"
                        />
                        <div className="about-split__panel-copy">
                            <span className="about-split__panel-index">
                                02
                            </span>
                            <h3>Precision manufacturing</h3>
                            <p>
                                Automated filling lines and closed-loop
                                quality checks keep every unit consistent.
                            </p>
                        </div>
                    </RevealBlock>

                    <RevealBlock
                        as="article"
                        className="about-split__panel about-split__panel--quote"
                        index={2}
                    >
                        <p className="about-split__quote-text">
                            "Quality isn't an accident — it's the result of
                            daily discipline."
                        </p>
                        <span className="about-split__quote-author">
                            WINNER Engineering Team
                        </span>
                    </RevealBlock>
                </div>
            </section>

            <section className="about-stats">
                <span className="about-stats__numeral" aria-hidden="true">
                    03
                </span>
                <div className="about-stats__marquee" aria-hidden="true">
                    <div className="about-stats__marquee-track">
                        <span>WINNER&nbsp;&middot;&nbsp;</span>
                        <span>ENGINEERED&nbsp;&middot;&nbsp;</span>
                        <span>FOR&nbsp;MOTION&nbsp;&middot;&nbsp;</span>
                        <span>WINNER&nbsp;&middot;&nbsp;</span>
                        <span>ENGINEERED&nbsp;&middot;&nbsp;</span>
                        <span>FOR&nbsp;MOTION&nbsp;&middot;&nbsp;</span>
                    </div>
                </div>

                <div className="about-stats__grid">
                    {STATS.map((stat, i) => (
                        <StatBlock key={stat.id} stat={stat} index={i} />
                    ))}
                </div>
            </section>

            <section className="about-timeline">
                <div className="about-timeline__head">
                    <span className="about-timeline__numeral" aria-hidden="true">
                        04
                    </span>
                    <h2 className="about-timeline__heading">Our path</h2>
                </div>

                <div className="about-timeline__rows">
                    {MILESTONES.map((item, i) => (
                        <TimelineRow key={item.id} item={item} index={i} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default About;