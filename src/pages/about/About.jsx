// import React, { useEffect, useRef } from "react";
// import "./about.scss";

// function useScrollReveal(rootRef) {
//     useEffect(() => {
//         const root = rootRef.current;
//         if (!root) return;

//         const targets = root.querySelectorAll("[data-reveal]");
//         const prefersReducedMotion = window.matchMedia(
//             "(prefers-reduced-motion: reduce)"
//         ).matches;

//         if (prefersReducedMotion) {
//             targets.forEach((el) => el.classList.add("is-visible"));
//             return;
//         }

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("is-visible");
//                         observer.unobserve(entry.target);
//                     }
//                 });
//             },
//             { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
//         );

//         targets.forEach((el) => observer.observe(el));
//         return () => observer.disconnect();
//     }, [rootRef]);
// }

// const stagger = (i) => ({ "--i": i });

// export default function AboutSections() {
//     const rootRef = useRef(null);
//     useScrollReveal(rootRef);

//     return (
//         <div className="about" ref={rootRef}>

//             <section className="about-hero">
//                 <div className="about-hero__container">
//                     <div className="about-hero__content">

//                         <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
//                             ABOUT WINNER
//                         </div>

//                         <h1 className="about-hero__content-title" data-reveal style={stagger(1)}>
//                             POWERFUL PERFORMANCE. MADE WITH PURPOSE.
//                         </h1>

//                         <p className="about-hero__content-text" data-reveal style={stagger(2)}>
//                             For over 15 years, WINNER has engineered high-performance
//                             lubricants that protect, perform, and go the distance.
//                             Trusted at home. Chosen on every road.
//                         </p>

//                         <a href="#" className="link-arrow" data-reveal style={stagger(3)}>
//                             OUR STORY <span className="link-arrow__glyph">→</span>
//                         </a>

//                     </div>

//                     <div className="about-hero__image" data-reveal style={stagger(1)}></div>
//                 </div>
//             </section>

//             <section className="about-band">
//                 <div className="about-band-container container">
//                     <div className="about-band__title" data-reveal style={stagger(0)}>
//                         FROM TASHKENT TO THE ROAD
//                     </div>

//                     <div className="about-band__desc" data-reveal style={stagger(1)}>
//                         Founded in Tashkent in 2011, WINNER began with a clear mission:
//                         to create world-class lubricants engineered for real-world
//                         conditions. Today, we operate with modern technology, rigorous
//                         standards, and a commitment to delivering performance you can
//                         rely on.
//                     </div>

//                     <div className="about-band__numbers">
//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">15+</div>
//                             <div className="label">YEARS</div>
//                         </div>

//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">30+</div>
//                             <div className="label">MARKETS</div>
//                         </div>

//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">100+</div>
//                             <div className="label">PRODUCTS</div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="about-defines">
//                 <div className="about-defines-container container">

//                     <h2 className="about-defines__title" data-reveal style={stagger(0)}>
//                         WHAT DEFINES US
//                     </h2>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">01</div>
//                         <h3 className="about-defines__item-title">INNOVATION</h3>

//                         <p className="about-defines__item-text">
//                             We invest in research and advanced formulations to create
//                             lubricants that improve efficiency, protect engines, and
//                             extend equipment life.
//                         </p>
//                     </div>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">02</div>
//                         <h3 className="about-defines__item-title">QUALITY</h3>

//                         <p className="about-defines__item-text">
//                             Every product is manufactured under strict quality control,
//                             using premium base oils and advanced additive technology.
//                         </p>
//                     </div>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">03</div>
//                         <h3 className="about-defines__item-title">TRUST</h3>

//                         <p className="about-defines__item-text">
//                             We build lasting partnerships through consistency,
//                             transparency, and a deep commitment to our customers'
//                             success.
//                         </p>
//                     </div>

//                 </div>
//             </section>

//             <section className="about-quality">
//                 <div className="about-quality-container">
//                     <div className="about-quality__image" data-reveal style={stagger(0)}></div>

//                     <div className="about-quality__content">
//                         <h2 className="about-quality__content-title" data-reveal style={stagger(1)}>
//                             CONTROL AT EVERY STAGE
//                         </h2>

//                         <p className="about-quality__content-text" data-reveal style={stagger(2)}>
//                             From raw materials to finished product, every drop is tested.
//                             Our quality process ensures reliability, performance, and
//                             protection—every time.
//                         </p>

//                         <button className="btn btn--dark" data-reveal style={stagger(3)}>
//                             QUALITY PROCESS
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             <section className="about-banner">
//                 <div className="about-banner-container container">
//                     <h3 className="about-banner-title" data-reveal style={stagger(0)}>
//                         BUILT LOCALLY. DRIVEN GLOBALLY.
//                     </h3>

//                     <button className="btn btn--light" data-reveal style={stagger(1)}>
//                         VIEW OUR PRODUCTS
//                     </button>
//                 </div>
//             </section>

//         </div>
//     );
// }


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
                    <div className="about-hero__content">

                        <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
                            WINNER BRAND STORY
                        </div>

                        <h1 className="about-hero__content-title" data-reveal style={stagger(1)}>
                            RELIABLE PROTECTION. HIGH EFFICIENCY.
                        </h1>

                        <p className="about-hero__content-text" data-reveal style={stagger(2)}>
                            Since 2011, WINNER has been manufacturing high-performance automotive
                            fluids that ensure reliable engine protection under the most demanding
                            operating conditions.
                        </p>

                        <a href="#history" className="link-arrow" data-reveal style={stagger(3)}>
                            OUR STORY <span className="link-arrow__glyph">→</span>
                        </a>

                    </div>

                    <div className="about-hero__image" data-reveal style={stagger(1)}></div>
                </div>
            </section>

            <section className="about-band" id="history">
                <div className="about-band-container container">
                    <div className="about-band__title" data-reveal style={stagger(0)}>
                        FROM FIRST ANTIFREEZE TO MARKET LEADERSHIP
                    </div>

                    <div className="about-band__desc" data-reveal style={stagger(1)}>
                        Starting in 2011 with the production of coolants, the WINNER brand
                        has gained the trust of vehicle owners and expanded its product range
                        to modern motor oils for passenger and commercial vehicles.
                    </div>

                    <div className="about-band__numbers">
                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">2011</div>
                            <div className="label">FOUNDING YEAR</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">#1</div>
                            <div className="label">IN ANTIFREEZE MARKET</div>
                        </div>

                        <div className="about-band__stat" data-reveal style={stagger(2)}>
                            <div className="num">OEM</div>
                            <div className="label">QUALITY STANDARDS</div>
                        </div>
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
                        <h3 className="about-defines__item-title">HEAT DISSIPATION & PROTECTION</h3>

                        <p className="about-defines__item-text">
                            WINNER coolants ensure stable heat transfer as well as resistance
                            to freezing and overheating at extreme temperatures.
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">02</div>
                        <h3 className="about-defines__item-title">CORROSION PROTECTION</h3>

                        <p className="about-defines__item-text">
                            Reliable protection against corrosion and deposits for aluminum
                            and mixed-metal engine systems.
                        </p>
                    </div>

                    <div className="about-defines__item" data-reveal style={stagger(1)}>
                        <div className="num">03</div>
                        <h3 className="about-defines__item-title">MOTOR OILS</h3>

                        <p className="about-defines__item-text">
                            Formulated with refined base oils and advanced additives,
                            our oils reduce wear, maintain cleanliness, and improve fuel economy.
                        </p>
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
                            All products undergo systematic testing for viscosity stability
                            and oxidation resistance. WINNER formulas comply with recognized
                            international standards and OEM requirements.
                        </p>

                        <button className="btn btn--dark" data-reveal style={stagger(3)}>
                            QUALITY STANDARDS
                        </button>
                    </div>
                </div>
            </section>

            <section className="about-banner">
                <div className="about-banner-container container">
                    <h3 className="about-banner-title" data-reveal style={stagger(0)}>
                        PROTECTING ENGINES. ENSURING CONFIDENCE ON EVERY JOURNEY.
                    </h3>

                    <button className="btn btn--light" data-reveal style={stagger(1)}>
                        PRODUCT CATALOG
                    </button>
                </div>
            </section>

        </div>
    );
}



// import React, { useEffect, useRef } from "react";
// import "./about.scss";

// function useScrollReveal(rootRef) {
//     useEffect(() => {
//         const root = rootRef.current;
//         if (!root) return;

//         const targets = root.querySelectorAll("[data-reveal]");
//         const prefersReducedMotion = window.matchMedia(
//             "(prefers-reduced-motion: reduce)"
//         ).matches;

//         if (prefersReducedMotion) {
//             targets.forEach((el) => el.classList.add("is-visible"));
//             return;
//         }

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("is-visible");
//                         observer.unobserve(entry.target);
//                     }
//                 });
//             },
//             { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
//         );

//         targets.forEach((el) => observer.observe(el));
//         return () => observer.disconnect();
//     }, [rootRef]);
// }

// const stagger = (i) => ({ "--i": i });

// export default function AboutSections() {
//     const rootRef = useRef(null);
//     useScrollReveal(rootRef);

//     return (
//         <div className="about" ref={rootRef}>

//             {/* HERO SECTION */}
//             <section className="about-hero">
//                 <div className="about-hero__container">
//                     <div className="about-hero__content">

//                         <div className="about-hero__content-eyebrow" data-reveal style={stagger(0)}>
//                             ИСТОРИЯ БРЕНДА WINNER
//                         </div>

//                         <h1 className="about-hero__content-title" data-reveal style={stagger(1)}>
//                             НАДЁЖНАЯ ЗАЩИТА. ВЫСОКАЯ ЭФФЕКТИВНОСТЬ.
//                         </h1>

//                         <p className="about-hero__content-text" data-reveal style={stagger(2)}>
//                             С 2011 года WINNER производит высокоэффективные автомобильные
//                             технические жидкости, обеспечивающие надёжную защиту двигателей
//                             в самых сложных условиях эксплуатации.
//                         </p>

//                         <a href="#history" className="link-arrow" data-reveal style={stagger(3)}>
//                             НАША ИСТОРИЯ <span className="link-arrow__glyph">→</span>
//                         </a>

//                     </div>

//                     <div className="about-hero__image" data-reveal style={stagger(1)}></div>
//                 </div>
//             </section>

//             {/* STATS BAND SECTION */}
//             <section className="about-band" id="history">
//                 <div className="about-band-container container">
//                     <div className="about-band__title" data-reveal style={stagger(0)}>
//                         ОТ ПЕРВОГО АНТИФРИЗА ДО ЛИДЕРСТВА
//                     </div>

//                     <div className="about-band__desc" data-reveal style={stagger(1)}>
//                         Начав в 2011 году с производства охлаждающих жидкостей, бренд WINNER
//                         завоевал доверие автовладельцев и расширил ассортимент до современных
//                         моторных масел для легкового и коммерческого транспорта.
//                     </div>

//                     <div className="about-band__numbers">
//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">2011</div>
//                             <div className="label">ГОД ОСНОВАНИЯ</div>
//                         </div>

//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">№1</div>
//                             <div className="label">НА РЫНКЕ АНТИФРИЗОВ</div>
//                         </div>

//                         <div className="about-band__stat" data-reveal style={stagger(2)}>
//                             <div className="num">OEM</div>
//                             <div className="label">СТАНДАРТЫ КАЧЕСТВА</div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* DEFINES SECTION */}
//             <section className="about-defines">
//                 <div className="about-defines-container container">

//                     <h2 className="about-defines__title" data-reveal style={stagger(0)}>
//                         ПРЕИМУЩЕСТВА ПРОДУКЦИИ
//                     </h2>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">01</div>
//                         <h3 className="about-defines__item-title">ТЕПЛООТВОД И ЗАЩИТА</h3>

//                         <p className="about-defines__item-text">
//                             Охлаждающие жидкости WINNER обеспечивают стабильный теплообмен,
//                             устойчивость к замерзанию и перегреву при экстремальных температурах.
//                         </p>
//                     </div>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">02</div>
//                         <h3 className="about-defines__item-title">АНТИКОРРОЗИЯ</h3>

//                         <p className="about-defines__item-text">
//                             Надёжная защита от коррозии и отложений для алюминиевых и
//                             комбинированных металлических систем двигателя.
//                         </p>
//                     </div>

//                     <div className="about-defines__item" data-reveal style={stagger(1)}>
//                         <div className="num">03</div>
//                         <h3 className="about-defines__item-title">МОТОРНЫЕ МАСЛА</h3>

//                         <p className="about-defines__item-text">
//                             Масла на базе очищенных базовых масел и современных присадок
//                             снижают износ, поддерживают чистоту и повышают экономию топлива.
//                         </p>
//                     </div>

//                 </div>
//             </section>

//             {/* QUALITY SECTION */}
//             <section className="about-quality">
//                 <div className="about-quality-container">
//                     <div className="about-quality__image" data-reveal style={stagger(0)}></div>

//                     <div className="about-quality__content">
//                         <h2 className="about-quality__content-title" data-reveal style={stagger(1)}>
//                             КАЧЕСТВО И СТАНДАРТЫ
//                         </h2>

//                         <p className="about-quality__content-text" data-reveal style={stagger(2)}>
//                             Вся продукция проходит системные испытания на стабильность вязкости
//                             и устойчивость к окислению. Формулы WINNER соответствуют признанным
//                             международным стандартам и требованиям автопроизводителей (OEM).
//                         </p>

//                         <button className="btn btn--dark" data-reveal style={stagger(3)}>
//                             СТАНДАРТЫ КАЧЕСТВА
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             <section className="about-banner">
//                 <div className="about-banner-container container">
//                     <h3 className="about-banner-title" data-reveal style={stagger(0)}>
//                         ЗАЩИЩАЯ ДВИГАТЕЛИ. ОБЕСПЕЧИВАЯ УВЕРЕННОСТЬ В КАЖДОЙ ПОЕЗДКЕ.
//                     </h3>

//                     <button className="btn btn--light" data-reveal style={stagger(1)}>
//                         КАТАЛОГ ПРОДУКЦИИ
//                     </button>
//                 </div>
//             </section>

//         </div>
//     );
// }