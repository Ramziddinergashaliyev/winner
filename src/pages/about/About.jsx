import React, { useEffect, useRef } from "react";
import "./about.scss";

import img1 from "../../assets/images/partfolio/antPart.webp";
import img2 from "../../assets/images/partfolio/engPart.webp";
import img3 from "../../assets/images/partfolio/hydrPart.webp";
import img4 from "../../assets/images/partfolio/transPart.webp";
import { useTranslation } from "react-i18next";

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

const PORTFOLIO_ITEMSRU = [
    {
        key: "hydraulic",
        index: "01",
        eyebrow: "МОТОРНЫЕ МАСЛА",
        title: "МОТОРНЫЕ МАСЛА",
        img: img2,
        points: [
            "Моторные масла WINNER изготовлены на основе тщательно подобранных базовых масел и передовых присадочных технологий для надёжной защиты двигателя.",
            "Они помогают снизить трение и износ, поддерживают чистоту двигателя и обеспечивают стабильную работу при высоких нагрузках и температурах.",
            "Разработанные в соответствии с признанными международными стандартами, моторные масла WINNER обеспечивают надёжную защиту современных бензиновых и дизельных двигателей."
        ],
    },
    {
        key: "evf",
        index: "02",
        eyebrow: "ТРАНСМИССИОННЫЕ ЖИДКОСТИ",
        title: "ТРАНСМИССИОННЫЕ ЖИДКОСТИ",
        img: img4,
        points: [
            "Трансмиссионные масла WINNER изготовлены на основе высококачественных базовых масел и современных противоизносных присадок для защиты шестерён и элементов трансмиссии в сложных условиях эксплуатации.",
            "Они помогают снизить трение, обеспечивают плавную работу шестерён и надёжную защиту от износа, коррозии и образования отложений.",
            "Отличная термическая и окислительная стабильность обеспечивает долговечную работу при высоких нагрузках, давлении и температурах."
        ],
    },
    {
        key: "engine",
        index: "03",
        eyebrow: "ГИДРАВЛИЧЕСКИЕ ЖИДКОСТИ",
        title: "ГИДРАВЛИЧЕСКИЕ ЖИДКОСТИ",
        img: img3,
        points: [
            "Гидравлические жидкости WINNER изготовлены на основе высококачественных базовых масел и современных присадок для эффективной передачи мощности и надёжной работы системы.",
            "Они обеспечивают отличную защиту от износа, коррозии, окисления и образования отложений, способствуя продлению срока службы оборудования.",
            "Стабильная вязкость и высокая термическая устойчивость обеспечивают плавную работу при высоком давлении, значительных нагрузках и сложных условиях эксплуатации."
        ],
    },
    {
        key: "gear",
        index: "04",
        eyebrow: "АНТИФРИЗ И ОХЛАДИТЕЛИ",
        title: "АНТИФРИЗ И ОХЛАДИТЕЛИ",
        img: img1,
        points: [
            "Антифризы и охлаждающие жидкости WINNER обеспечивают эффективный отвод тепла и помогают поддерживать стабильную температуру двигателя в сложных климатических и дорожных условиях.",
            "Передовые составы защищают компоненты системы охлаждения от коррозии, отложений, замерзания и перегрева.",
            "Совместимые с алюминиевыми и разнометаллическими системами охлаждения, охлаждающие жидкости WINNER обеспечивают надёжную и долговечную защиту круглый год."
        ],
    }
];

const PORTFOLIO_ITEMSEN = [
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
        eyebrow: "TRANSMISSION FLUIDS",
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
    const { t, i18n } = useTranslation()

    const PORTFOLIOCARDS = i18n?.languages?.[0] === "ru" ? PORTFOLIO_ITEMSRU : PORTFOLIO_ITEMSEN

    return (
        <div className="about" ref={rootRef}>

            <section className="about-hero">
                <div className="about-hero__container">
                    <div className="about-hero__content">
                        <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
                            {t("ABOUT WINNER")}
                        </div>

                        <p className="about-hero__content-text" data-reveal style={stagger(2)}>
                            {t("about_text")}
                        </p>
                    </div>

                    <div className="about-hero__image" data-reveal style={stagger(1)}></div>
                </div>
            </section>

            <section className="about-band">
                <div className="about-band-container container">
                    <div className="about-band__title" data-reveal style={stagger(0)}>
                        {t("LEADERSHIP")}
                    </div>

                    <div className="about-band__desc" data-reveal style={stagger(1)}>
                        {t("entering")}
                    </div>

                    <div className="about-band__numbers">
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">#1</div>
                            <div className="label">{t("BRAND IN")}</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">OEM</div>
                            <div className="label">{t("REQUIREMENTS")}</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">2011</div>
                            <div className="label">{t("FOUNDED")}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-portfolio">
                <div className="about-portfolio-container container">

                    <div className="about-portfolio__header">
                        <h2 className="about-portfolio__header-title" data-reveal style={stagger(1)}>
                            {t("PORTFOLIO")}
                        </h2>
                    </div>

                    <div className="about-portfolio__row">
                        {PORTFOLIOCARDS?.map((item, i) => (
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
                            {t("QUALITY & STANDARDS")}
                        </h2>

                        <p className="about-quality__content-text" data-reveal style={stagger(2)}>
                            {t("every product")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-defines">
                <div className="about-defines-container container">

                    <h2 className="about-defines__title" data-reveal style={stagger(0)}>
                        {t("PRODUCT ADVANTAGES")}
                    </h2>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">01</div>

                        <h3 className="about-defines__item-title">{t("TRANSFER")}</h3>

                        <p className="about-defines__item-text">
                            {t("temperatures")}
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">02</div>
                        <h3 className="about-defines__item-title">{t("CORROSION")}</h3>

                        <p className="about-defines__item-text">
                            {t("premature")}
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">03</div>
                        <h3 className="about-defines__item-title">{t("PERFORMANCE")}</h3>

                        <p className="about-defines__item-text">
                            {t("stable")}
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
}