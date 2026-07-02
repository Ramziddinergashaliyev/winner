import React from 'react'
import './history.scss'
import Reveal from '../reveal/Reveal'

import img1 from '../../assets/images/history1.webp'
import img2 from '../../assets/images/history2.webp'
import img3 from '../../assets/images/history3.webp'

const cards = [
    {
        image: img1,
        title: 'Innovation',
        text: 'In-house R&D and testing under extreme conditions.',
    },
    {
        image: img2,
        title: 'Performance',
        text: 'Maximum engine protection and power at every stage of the road.',
    },
    {
        image: img3,
        title: 'Victory',
        text: 'Trusted by champions and professionals worldwide.',
    },
]

const History = () => {
    return (
        <section className="history">
            <div className="history__container container">
                <Reveal as="div" className="history__intro" variant="left">
                    <span className="history__eyebrow">Brand History</span>

                    <h2 className="history__title">
                        More than oil.
                        <span className="history__title-accent">It&apos;s the DNA of winners.</span>
                    </h2>

                    <p className="history__text">
                        WINNER is the result of a passion for technology, speed, and flawless
                        quality. We craft oils that unlock your engine&apos;s full potential in any
                        conditions.
                    </p>
                </Reveal>

                <div className="history__cards">
                    {cards.map((card, index) => (
                        <Reveal
                            as="div"
                            className="history-card"
                            key={card.title}
                            variant="up"
                            delay={index * 100}
                        >
                            <div className="history-card__image">
                                <img src={card.image} alt={card.title} loading="lazy" />
                            </div>

                            <div className="history-card__body">
                                <h3 className="history-card__title">{card.title}</h3>
                                <p className="history-card__text">{card.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default History
