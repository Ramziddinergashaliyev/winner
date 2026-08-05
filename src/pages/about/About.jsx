import React, { useEffect, useRef } from "react";
import "./about.scss";

import img1 from "../../assets/images/partfolio/antPart.webp";
import img2 from "../../assets/images/partfolio/engPart.webp";
import img3 from "../../assets/images/partfolio/hydrPart.webp";
import img4 from "../../assets/images/partfolio/transPart.webp";

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
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [rootRef]);
}

const stagger = (i) => ({ "--i": i });

const PORTFOLIO_ITEMS = [
    {
        key: "hydraulic",
        index: "01",
        eyebrow: "MOTOR OILS",
        title: "MOTOR OILS",
        img: img2,
        points: [
            "WINNER motor oils are formulated with carefully selected base oils and advanced additive technologies for reliable engine protection.",
            "They help reduce friction and wear, maintain engine cleanliness, and support stable performance under high loads and temperatures.",
            "Developed in accordance with recognized international standards, WINNER motor oils provide dependable protection for modern petrol and diesel engines."
        ],
    },
    {
        key: "evf",
        index: "02",
        eyebrow: "TRANSMISSION FLUIDS ",
        title: "TRANSMISSION FLUIDS ",
        img: img4,
        points: [
            "WINNER gear oils are formulated with high-quality base oils and advanced anti-wear additives to protect gears and transmission components under demanding operating conditions.",
            "They help reduce friction, support smooth gear operation, and provide reliable protection against wear, corrosion, and deposit formation.",
            "Excellent thermal and oxidation stability ensures lasting performance under high loads, pressure, and temperature."
        ],
    },
    {
        key: "engine",
        index: "03",
        eyebrow: "HYDRAULIC FLUIDS",
        title: "HYDRAULIC FLUIDS",
        img: img3,
        points: [
            "WINNER hydraulic fluids are formulated with high-quality base oils and advanced additives to ensure efficient power transmission and reliable system performance.",
            "They provide excellent protection against wear, corrosion, oxidation, and deposit formation, helping extend equipment service life.",
            "Stable viscosity and strong thermal performance ensure smooth operation under high pressure, heavy loads, and demanding working conditions."
        ],
    },
    {
        key: "gear",
        index: "04",
        eyebrow: "ANTIFREEZE & COOLANTS",
        title: "ANTIFREEZE & COOLANTS",
        img: img1,
        points: [
            "WINNER antifreeze and coolants provide efficient heat transfer and help maintain stable engine temperatures in demanding climate and driving conditions.",
            "Advanced formulations protect cooling-system components against corrosion, deposits, freezing, and overheating.",
            "Compatible with aluminium and mixed-metal cooling systems, WINNER coolants deliver reliable, long-lasting protection throughout the year."
        ],
    }
];

export default function AboutSections() {
    const rootRef = useRef(null);
    useScrollReveal(rootRef);

    return (
        <div className="about" ref={rootRef}>

            <section className="about-hero">
                <div className="about-hero__container">
                    <div className="about-hero__content">
                        <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
                            ABOUT WINNER
                        </div>

                        <p className="about-hero__content-text" data-reveal style={stagger(2)}>
                            Founded in 2011, WINNER is a trusted manufacturer of high-performance automotive fluids designed to protect engines and ensure reliable vehicle operation in demanding climate and driving conditions. The brand began its journey with the production of antifreeze and engine coolants, focusing on efficient heat transfer, corrosion protection, formulation stability, and long service life. Through continuous development and strict quality control, WINNER has become a leading name in Uzbekistan’s antifreeze market. Building on this experience, the brand expanded its portfolio to include advanced motor oils for petrol and diesel engines, formulated with carefully selected base oils and modern additive technologies to reduce wear, maintain engine cleanliness, improve fuel efficiency, and deliver stable performance under high loads and temperatures. Today, WINNER provides dependable fluid solutions for passenger cars, commercial vehicles, professional fleets, and industrial applications. Every product is manufactured through carefully controlled processes and systematically tested for viscosity stability, oxidation resistance, cooling efficiency, and material compatibility. Committed to innovation, quality, and environmental responsibility, WINNER continues to develop products that meet the evolving requirements of modern engines and international markets—protecting vehicles, extending equipment service life, and delivering confidence on every journey.
                        </p>
                    </div>

                    <div className="about-hero__image" data-reveal style={stagger(1)}></div>
                </div>
            </section>

            <section className="about-band">
                <div className="about-band-container container">
                    <div className="about-band__title" data-reveal style={stagger(0)}>
                        FROM ANTIFREEZE EXPERTISE TO MARKET LEADERSHIP
                    </div>

                    <div className="about-band__desc" data-reveal style={stagger(1)}>
                        Since entering the market in 2011 with antifreeze and coolant products, WINNER has earned the trust of drivers through consistent quality and reliable performance. Today, the brand offers advanced coolants and motor oils for passenger cars, commercial vehicles, and professional fleets.
                    </div>

                    <div className="about-band__numbers">
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">#1</div>
                            <div className="label">ANTIFREEZE BRAND IN UZBEKISTAN</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">OEM</div>
                            <div className="label">REQUIREMENTS</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">2011</div>
                            <div className="label">FOUNDED</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-portfolio">
                <div className="about-portfolio-container container">

                    <div className="about-portfolio__header">
                        <h2 className="about-portfolio__header-title" data-reveal style={stagger(1)}>
                            LUBRICANT PRODUCT PORTFOLIO
                        </h2>
                    </div>

                    <div className="about-portfolio__row">
                        {PORTFOLIO_ITEMS.map((item, i) => (
                            <article
                                className="about-portfolio__card"
                                key={item.key}
                                data-reveal
                                style={stagger(i + 2)}
                                tabIndex={0}
                            >
                                <div className="about-portfolio__card-inner">

                                    <div className="about-portfolio__card-index">{item.index}</div>

                                    <div className="about-portfolio__card-media">
                                        <div className={`about-portfolio__card-image about-portfolio__card-image--${item.key}`}>
                                            <img src={item.img} alt={item.title} loading="lazy" />
                                        </div>


                                        <div className="about-portfolio__card-tint"></div>
                                        <span className="about-portfolio__card-sweep"></span>
                                        <span className="about-portfolio__card-plus">+</span>
                                    </div>

                                    <div className="about-portfolio__card-content">
                                        <h3 className="about-portfolio__card-title">{item.title}</h3>

                                        <ul className="about-portfolio__card-list">
                                            {item.points.map((p, idx) => (
                                                <li key={idx}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="about-portfolio__card-bar"></div>

                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </section>

            <section className="about-quality">
                <div className="about-quality-container">
                    <div className="about-quality__image" data-reveal style={stagger(0)}></div>

                    <div className="about-quality__content">
                        <h2 className="about-quality__content-title" data-reveal style={stagger(1)}>
                            QUALITY & STANDARDS
                        </h2>

                        <p className="about-quality__content-text" data-reveal style={stagger(2)}>
                            Quality is built into every stage of WINNER production. From carefully selected raw materials to final packaging, each product undergoes rigorous laboratory testing and continuous quality control. We verify viscosity stability, oxidation resistance, thermal performance, and material compatibility to ensure reliable protection in demanding operating conditions. WINNER formulations are developed in accordance with recognized international standards and OEM requirements, delivering consistent quality and dependable performance in every product.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-defines">
                <div className="about-defines-container container">

                    <h2 className="about-defines__title" data-reveal style={stagger(0)}>
                        PRODUCT ADVANTAGES
                    </h2>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">01</div>

                        <h3 className="about-defines__item-title">EFFICIENT HEAT TRANSFER</h3>

                        <p className="about-defines__item-text">
                            WINNER coolants provide efficient heat dissipation and stable protection against freezing and overheating, even in extreme temperatures.
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">02</div>
                        <h3 className="about-defines__item-title">ADVANCED CORROSION PROTECTION</h3>

                        <p className="about-defines__item-text">
                            Advanced formulations protect aluminium and mixed-metal cooling systems against corrosion, deposits, and premature wear.
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">03</div>
                        <h3 className="about-defines__item-title">ENGINE PERFORMANCE & PROTECTION</h3>

                        <p className="about-defines__item-text">
                            WINNER motor oils reduce engine wear, maintain cleanliness, improve fuel efficiency, and deliver stable performance under high loads and temperatures.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
}