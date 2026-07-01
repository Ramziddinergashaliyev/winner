import React from 'react'
import "./history.scss"

import img1 from "../../assets/images/history1.webp"
import img2 from "../../assets/images/history2.webp"
import img3 from "../../assets/images/history3.webp"

const cards = [
    {
        image: img1,
        title: "Innovation",
        text: "In-house R&D and testing under extreme conditions.",
    },
    {
        image: img2,
        title: "Performance",
        text: "Maximum engine protection and power at every stage of the road.",
    },
    {
        image: img3,
        title: "Victory",
        text: "Trusted by champions and professionals worldwide.",
    },
]

const History = () => {
    return (
        <section className="history">
            <div className="history__container container">
                <div className="history__intro">
                    <span className="history__eyebrow">Brand History</span>

                    <h2 className="history__title">
                        More than oil.
                        <span className="history__title-accent">It's the DNA of winners.</span>
                    </h2>

                    <p className="history__text">
                        WINNER is the result of a passion for technology, speed, and flawless
                        quality. We craft oils that unlock your engine's full potential in any
                        conditions.
                    </p>
                </div>

                <div className="history__cards">
                    {cards.map((card) => (
                        <div className="history-card" key={card.title}>
                            <div className="history-card__image">
                                <img src={card.image} alt={card.title} loading="lazy" />
                            </div>

                            <div className="history-card__body">
                                <h3 className="history-card__title">{card.title}</h3>
                                <p className="history-card__text">{card.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default History