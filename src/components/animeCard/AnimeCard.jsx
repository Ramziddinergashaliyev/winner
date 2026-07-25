import React, { useState } from 'react'

import img1 from "../../assets/images/bgauto.webp"
import img2 from "../../assets/images/bgauto1.webp"
import img3 from "../../assets/images/bgauto2.webp"

import "./animeCard.scss"

const TABS = [
    {
        id: "engine",
        label: "Motor oils for passenger cars",
        image: img1,
    },
    {
        id: "diesel",
        label: "Motor oils for diesel",
        image: img2,
    },
    {
        id: "transmission",
        label: "Transmission",
        image: img3,
    }
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
                <div
                    key={active.id}
                    className="anime-card__bg"
                    style={{ backgroundImage: `url(${active.image})` }}
                />
            </div>
        </div>
    )
}

export default AnimeCard