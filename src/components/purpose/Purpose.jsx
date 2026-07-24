import React, { useEffect, useRef, useState } from 'react'
import "./purpose.scss"
import { FaArrowRight } from 'react-icons/fa'

const items = [
    {
        id: 1,
        title: "FORMULATION",
        desc: "Advanced additive chemistry designed for performance, protection, and efficiency.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6h10" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 6v11.5L11 34a4 4 0 0 0 3.5 6h19a4 4 0 0 0 3.5-6l-9-16.5V6" strokeWidth="2" strokeLinejoin="round" />
                <path d="M15 28h18" strokeWidth="2" strokeLinecap="round" />
                <circle cx="21" cy="24" r="1.3" fill="currentColor" stroke="none" />
                <circle cx="27" cy="32" r="1" fill="currentColor" stroke="none" />
                <circle cx="24" cy="22" r="1" fill="currentColor" stroke="none" />
            </svg>
        )
    },
    {
        id: 2,
        title: "TESTING",
        desc: "Extensive lab and field tests under extreme conditions to ensure reliability.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="8" width="24" height="34" rx="2" strokeWidth="2" />
                <path d="M18 8v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" strokeWidth="2" />
                <path d="M17 20l4 4 8-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="purpose__icon-check" />
                <path d="M17 30h10" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 35h7" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 3,
        title: "QUALITY CONTROL",
        desc: "Strict quality systems at every stage to deliver consistent excellence.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5l14 5v11c0 9-6 16-14 17-8-1-14-8-14-17V10l14-5z" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 24l4.5 4.5L31 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="purpose__icon-check" />
            </svg>
        )
    }
]


const Purpose = () => {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = sectionRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.unobserve(node)
                }
            },
            { threshold: 0.25 }
        )

        observer.observe(node)
        return () => observer.disconnect()

    }, [])

    return (
        <section
            ref={sectionRef}
            className={`purpose ${visible ? "purpose--visible" : ""}`}
        >
            <div className="purpose__container container">
                <div className="purpose__intro">
                    <h2 className="purpose__title">
                        <span>ENGINEERED</span>
                        <span>WITH PURPOSE.</span>
                    </h2>

                    <p className="purpose__desc">
                        Every WINNER product is the result of innovation, rigorous
                        testing, and strict quality control - delivering performance
                        you can rely on, every time.
                    </p>

                    <a href="#technology" className="purpose__link">
                        <span>OUR TECHNOLOGY</span>

                        <FaArrowRight />
                    </a>
                </div>

                <div className="purpose__divider" aria-hidden="true" />

                <div className="purpose__grid">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="purpose__item"
                            style={{ transitionDelay: `${0.15 + index * 0.12}s` }}>
                            <div className="purpose__icon">{item.icon}</div>
                            <h3 className="purpose__item-title">{item.title}</h3>
                            <p className="purpose__item-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Purpose