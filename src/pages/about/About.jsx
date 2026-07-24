import React, { useEffect, useRef } from "react";
import "./about.scss";

function useScrollReveal(rootRef) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const targets = root.querySelectorAll("[data-reveal]");
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            targets.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [rootRef]);
}

const stagger = (i) => ({ "--i": i });

export default function AboutSections() {
    const rootRef = useRef(null);
    useScrollReveal(rootRef);

    return (
        <div className="about" ref={rootRef}>

            <section className="about-hero">
                <div className="about-hero__container">
                    <div className="about-hero__content container">
                        <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
                            ABOUT WINNER
                        </div>
                        <h1 className="about-hero__content-title" data-reveal style={stagger(1)}>
                            POWERFUL PERFORMANCE. MADE WITH PURPOSE.
                        </h1>
                        <p className="about-hero__content-text" data-reveal style={stagger(2)}>
                            For over 15 years, WINNER has engineered high-performance
                            lubricants that protect, perform, and go the distance.
                            Trusted at home. Chosen on every road.
                        </p>
                        <a href="#" className="link-arrow" data-reveal style={stagger(3)}>
                            OUR STORY <span className="link-arrow__glyph">→</span>
                        </a>
                    </div>

                    <div className="about-hero__image" data-reveal style={stagger(1)}></div>
                </div>
            </section>

            <section className="about-band">
                <div className="about-band-container container">
                    <div className="about-band__title" data-reveal style={stagger(0)}>
                        FROM TASHKENT TO THE ROAD
                    </div>
                    <div className="about-band__desc" data-reveal style={stagger(1)}>
                        Founded in Tashkent in 2011, WINNER began with a clear mission:
                        to create world-class lubricants engineered for real-world
                        conditions. Today, we operate with modern technology, rigorous
                        standards, and a commitment to delivering performance you can
                        rely on.
                    </div>

                    <div className="about-band__numbers">
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">15+</div>
                            <div className="label">YEARS</div>
                        </div>
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">30+</div>
                            <div className="label">MARKETS</div>
                        </div>
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">100+</div>
                            <div className="label">PRODUCTS</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-defines">
                <div className="about-defines-container container">
                    <h2 className="about-defines__title" data-reveal style={stagger(0)}>
                        WHAT DEFINES US
                    </h2>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">01</div>
                        <h3 className="about-defines__item-title">INNOVATION</h3>
                        <p className="about-defines__item-text">
                            We invest in research and advanced formulations to create
                            lubricants that improve efficiency, protect engines, and
                            extend equipment life.
                        </p>
                    </div>
                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">02</div>
                        <h3 className="about-defines__item-title">QUALITY</h3>
                        <p className="about-defines__item-text">
                            Every product is manufactured under strict quality control,
                            using premium base oils and advanced additive technology.
                        </p>
                    </div>
                    <div className="about-defines__item" data-reveal style={stagger(1)}>
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
                <div className="about-quality-container">
                    <div className="about-quality__image" data-reveal style={stagger(0)}></div>

                    <div className="about-quality__content">
                        <h2 className="about-quality__content-title" data-reveal style={stagger(1)}>
                            CONTROL AT EVERY STAGE
                        </h2>
                        <p className="about-quality__content-text" data-reveal style={stagger(2)}>
                            From raw materials to finished product, every drop is tested.
                            Our quality process ensures reliability, performance, and
                            protection—every time.
                        </p>
                        <button className="btn btn--dark" data-reveal style={stagger(3)}>
                            QUALITY PROCESS
                        </button>
                    </div>
                </div>
            </section>

            <section className="about-banner">
                <div className="about-banner-container container">
                    <h3 className="about-banner-title" data-reveal style={stagger(0)}>
                        BUILT LOCALLY. DRIVEN GLOBALLY.
                    </h3>
                    <button className="btn btn--light" data-reveal style={stagger(1)}>
                        VIEW OUR PRODUCTS
                    </button>
                </div>
            </section>

        </div>
    );
}