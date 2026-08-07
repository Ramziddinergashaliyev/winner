import React from 'react'
import Reveal from '../reveal/Reveal'
import img1 from '../../assets/images/history1.webp'
import img2 from '../../assets/images/history2.webp'
import img3 from '../../assets/images/history3.webp'

import './history.scss'
import { useTranslation } from 'react-i18next'

const cardsEn = [
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
    }
]

const cardsRU = [
    {
        image: img1,
        title: 'Инновации',
        text: 'Собственные исследования и испытания в экстремальных условиях.',
    },
    {
        image: img2,
        title: 'Производительность',
        text: 'Максимальная защита двигателя и мощность на каждом этапе пути.',
    },
    {
        image: img3,
        title: 'Победа',
        text: 'Доверие чемпионов и профессионалов по всему миру.',
    }
]

const History = () => {
    const { t, i18n } = useTranslation()

    const cardsData = i18n?.languages?.[0] === "ru" ? cardsRU : cardsEn

    return (
        <section className="history">
            <div className="history__container container">
                <Reveal as="div" className="history__intro" variant="left">
                    <h2 className="history__title">
                        {t("more")}
                        <span className="history__title-accent">{t("DNA")}</span>
                    </h2>

                    <p className="history__text">{t("the result")}</p>
                </Reveal>

                <div className="history__cards">
                    {cardsData?.map((card, index) => (
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