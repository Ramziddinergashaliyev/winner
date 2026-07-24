import React, { useState } from 'react'

import img from "../../assets/images/winner.webp"

import "./animeCard.scss"

const TABS = [
    {
        id: "engine",
        label: "Motor oils for passenger cars",
        tag: "Engine Oil",
        title: ["Power that", "never quits."],
        text: "Yuqori haroratda ham dvigatelni ishqalanishdan himoya qiluvchi, quvvatni saqlab qoluvchi ilg'or motor moyi.",
        badges: ["Fully Synthetic", "5W-30", "API SN"],
        image: img,
    },
    {
        id: "diesel",
        label: "Motor oils for diesel",
        tag: "diesel",
        title: ["Confidence in", "every shift."],
        text: "Advanced transmission fluid engineered for smooth operation, excellent thermal stability, and reliable protection in every driving condition.",
        badges: ["Fully Synthetic", "4 L", "DEX VI"],
        image: img,
    },
    {
        id: "transmission",
        label: "Transmission",
        tag: "Transmission Fluid",
        title: ["Confidence in", "every shift."],
        text: "Advanced transmission fluid engineered for smooth operation, excellent thermal stability, and reliable protection in every driving condition.",
        badges: ["Fully Synthetic", "4 L", "DEX VI"],
        image: img,
    },
    {
        id: "cooling",
        label: "Hydraulic oils",
        tag: "Coolant",
        title: ["Stay cool,", "stay steady."],
        text: "Har qanday ob-havo sharoitida dvigatelni qizib ketishdan va muzlab qolishdan himoya qiluvchi antifriz.",
        badges: ["Long Life", "1 L", "G12+"],
        image: img,
    },
    {
        id: "industrial",
        label: "Antifreeze",
        tag: "Industrial Oil",
        title: ["Built for", "heavy duty."],
        text: "Sanoat uskunalari uchun mo'ljallangan, yuqori bosim va yukga bardosh beruvchi kuchli moylash mahsuloti.",
        badges: ["Heavy Duty", "20 L", "ISO VG 68"],
        image: img,
    },
    {
        id: "industrial",
        label: "Windscreen washer",
        tag: "Industrial Oil",
        title: ["Built for", "heavy duty."],
        text: "Sanoat uskunalari uchun mo'ljallangan, yuqori bosim va yukga bardosh beruvchi kuchli moylash mahsuloti.",
        badges: ["Heavy Duty", "20 L", "ISO VG 68"],
        image: img,
    },
]

const AnimeCard = () => {
    const [activeId, setActiveId] = useState(TABS[1].id)
    const active = TABS.find((t) => t.id === activeId)

    return (
        <div className="anime-card">
            <nav className="anime-card__nav">
                <div className="anime-card__nav-inner">
                    <ul className="anime-card__tabs container">
                        {TABS.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    type="button"
                                    className={
                                        "anime-card__tab" +
                                        (tab.id === activeId ? " anime-card__tab--active" : "")
                                    }
                                    onClick={() => setActiveId(tab.id)}>
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="anime-card__body">
                <div className="anime-card__image-wrap">
                    <span className="anime-card__blob" aria-hidden="true" />

                    <img
                        key={active.id}
                        src={active.image}
                        alt={active.label}
                        className="anime-card__image"
                    />
                </div>

                <div key={active.id + "-content"} className="anime-card__content">
                    <span className="anime-card__tag">{active.tag}</span>

                    <h1 className="anime-card__title">
                        {active.title[0]} <br /> {active.title[1]}
                    </h1>

                    <p className="anime-card__text">{active.text}</p>

                    <div className="anime-card__specs">
                        {active.badges.map((badge, i) => (
                            <React.Fragment key={badge}>
                                {i !== 0 && <span className="anime-card__divider" />}
                                <span className="anime-card__spec">{badge}</span>
                            </React.Fragment>
                        ))}
                    </div>

                    <button type="button" className="anime-card__btn">
                        View {active.label} Range
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AnimeCard
