import React from 'react'
import './info.scss'
import Reveal from '../reveal/Reveal'

import img1 from '../../assets/images/info.png'
import img2 from '../../assets/images/info2.png'
import img3 from '../../assets/images/info3.png'

const cards = [
    {
        number: '01',
        image: img1,
        title: ['Built For', 'Victory'],
        text: 'WINNER is a high-tech motor oil engineered for extreme conditions and maximum performance.',
        link: 'Learn More',
    },
    {
        number: '02',
        image: img2,
        title: ['Technology', 'That Leads'],
        text: 'Advanced formulas and strict quality control deliver engine protection, power, and reliability — mile after.',
        link: 'Our Technology',
    },
    {
        number: '03',
        image: img3,
        title: ['Trusted By', 'Champions'],
        text: 'WINNER is chosen by professional racers and teams worldwide. Winners choose the best.',
        link: 'Our Partners',
    },
]

const CheckeredFlag = ({ id }) => (
    <svg className="info-card__flag-icon" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id={`checker-${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#fff" />
                <rect width="3" height="3" fill="#111" />
                <rect x="3" y="3" width="3" height="3" fill="#111" />
            </pattern>
        </defs>
        <line x1="4" y1="2" x2="4" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
            d="M4 4 L22 4 L18 8.5 L22 13 L4 13 Z"
            fill={`url(#checker-${id})`}
            stroke="currentColor"
            strokeWidth="0.5"
        />
    </svg>
)

const ArrowIcon = () => (
    <svg className="info-card__arrow" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5 3l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const Info = () => {
    return (
        <section className="info container">
            <div className="info__container">
                {cards.map((card, index) => (
                    <Reveal
                        as="div"
                        className="info-card"
                        key={card.number}
                        variant="up"
                        delay={index * 120}
                        style={{
                            backgroundImage: `linear-gradient(100deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.85) 35%, rgba(8,8,8,0.4) 65%, rgba(8,8,8,0.05) 100%), url(${card.image})`,
                        }}
                    >
                        <div className="info-card__badge">
                            <span className="info-card__number">{card.number}</span>
                            <CheckeredFlag id={index} />
                        </div>

                        <div className="info-card__body">
                            <h3 className="info-card__title">
                                {card.title.map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </h3>

                            <span className="info-card__divider" />

                            <p className="info-card__text">{card.text}</p>

                            <a href="#" className="info-card__link">
                                {card.link}
                                <ArrowIcon />
                            </a>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Info
