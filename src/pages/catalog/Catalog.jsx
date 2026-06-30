import React, { useEffect, useRef, useState } from "react";
import "./catalog.scss";

const catalogData = [
    {
        id: 1,
        index: "01",
        title: "Motor oils for passenger cars and light commercial vehicles",
        sub: "Passenger & Light Commercial",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M18 7h12l3 6v5H15v-5l3-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 18h20v17a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5V18Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 24h20" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        id: 2,
        index: "02",
        title: "Motor oils for diesel engines",
        sub: "Heavy-Duty & Fleet",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <rect x="7" y="16" width="24" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M31 21h6l4 5v6h-10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="15" cy="34" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="35" cy="34" r="3.4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        id: 3,
        index: "03",
        title: "Transmission oils",
        sub: "Manual & Automatic",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="17" cy="24" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="34" cy="15" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="34" cy="33" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M22.5 21l7-4M22.5 27l7 4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        id: 4,
        index: "04",
        title: "Hydraulic oils",
        sub: "Industrial & Heavy Equipment",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M10 33l12-16 6 7 8-11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="36" cy="13" r="2.5" fill="currentColor" />
                <path d="M7 37h34" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        id: 6,
        index: "06",
        title: "Antifreeze",
        sub: "Long-Life Coolant",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 5v38M11 12l26 24M37 12 11 36" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M17 10l7-6 7 6M17 38l7 6 7-6M10 17l-6 7 6 7M38 17l6 7-6 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: 8,
        index: "08",
        title: "Washer Fluid",
        sub: "Seasonal Formulas",
        icon: (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 6c6 6.5 11 13.5 11 20.5a11 11 0 1 1-22 0C13 19.5 18 12.5 24 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M16 30c2.5 4.5 6.5 7 11 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
];

const Catalog = () => {
    const [visible, setVisible] = useState([]);
    const [sectionVisible, setSectionVisible] = useState(false);
    const refs = useRef([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const itemObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = Number(entry.target.dataset.id);
                        setVisible((prev) => (prev.includes(id) ? prev : [...prev, id]));
                    }
                });
            },
            { threshold: 0.2 }
        );
        refs.current.forEach((el) => el && itemObserver.observe(el));

        const sectionObserver = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setSectionVisible(true)),
            { threshold: 0.15 }
        );
        if (sectionRef.current) sectionObserver.observe(sectionRef.current);

        return () => {
            itemObserver.disconnect();
            sectionObserver.disconnect();
        };
    }, []);

    const handleMove = (e, i) => {
        const el = refs.current[i];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
    };

    return (
        <section className="pit" ref={sectionRef}>

            <div className="pit__container">
                <header className={`pit__head${sectionVisible ? " pit__head--in" : ""}`}>
                    <div className="pit__head-row">
                        <span className="pit__flag" aria-hidden="true">
                            <span /><span /><span /><span />
                        </span>
                        <span className="pit__eyebrow">Full Product Line</span>
                    </div>
                    <h2 className="pit__title">Catalog</h2>
                </header>

                <div className="pit__grid">
                    {catalogData.map((item, i) => (
                        <a
                            href="/details"
                            key={item.id}
                            data-id={item.id}
                            ref={(el) => (refs.current[i] = el)}
                            onMouseMove={(e) => handleMove(e, i)}
                            className={`pit__card${visible.includes(item.id) ? " pit__card--in" : ""}`}
                            style={{ "--d": `${i * 90}ms` }}
                        >
                            <span className="pit__card-glow" aria-hidden="true" />
                            <span className="pit__stripe" aria-hidden="true" />

                            <div className="pit__icon">{item.icon}</div>

                            <h3 className="pit__card-title">{item.title}</h3>

                            <span className="pit__bolt pit__bolt--tl" aria-hidden="true" />
                            <span className="pit__bolt pit__bolt--br" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Catalog;