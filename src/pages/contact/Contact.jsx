import React, { useState } from 'react'
import Reveal from '../../components/reveal/Reveal'
import { useGetProductsQuery } from '../../services/productApi'

import { useGetValue } from '../../hooks/useGetValue'
import { useTranslation } from 'react-i18next'
import './contact.scss'

const initialState = {
    name: '',
    phone: '',
    message: ''
}

const Contact = () => {
    const [form, setForm] = useState(initialState)
    const [submitted, setSubmitted] = useState(false)
    const { formData, setFormData, handleChange } = useGetValue({ initialState })
    const { data } = useGetProductsQuery()

    const { t, i18n } = useTranslation()

    const infoCards = [
        {
            label: t('address'),
            content: (
                <>
                    {t("address")}
                </>
            ),
        },
        {
            label: t('Номер телефона'),
            content: (
                <>
                    <a href="tel:+998712814930">+998 71 281 49 30</a>
                    <a href="tel:+998712032031">+998 71 203 20 31</a>
                </>
            ),
        },
        {
            label: t('Электронная почта'),
            content: <a href="mailto:infowin@gpggroup.uz">infowin@gpggroup.uz</a>,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData(initialState)
    }

    return (
        <section className="contact">
            <div className="contact__container container">

                <Reveal as="div" className="contact__head" variant="up">
                    <span className="contact__eyebrow">{t("Get in touch")}</span>

                    <h1 className="contact__title">
                        {t("Let's")}
                    </h1>

                    <p className="contact__subtitle">
                        {t("Questions")}
                    </p>
                </Reveal>

                <div className="contact__grid">

                    <div className="contact__info">
                        {infoCards?.map((card, index) => (
                            <Reveal
                                as="div"
                                className="contact__card"
                                key={card.label}
                                variant="left"
                                delay={index * 90}
                            >
                                <span className="contact__card-mark" />
                                <div className="contact__card-body">
                                    <span className="contact__card-label">{card.label}</span>
                                    <p className="contact__card-text">{card.content}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal as="div" className="contact__form-wrap" variant="right" delay={120}>
                        {submitted ? (
                            <div className="contact__success contact__success--in">
                                <span className="contact__success-mark">✓</span>
                                <h3>{t("Message sent")}</h3>
                                <p>{t("Thanks for")}</p>

                                <button
                                    type="button"
                                    className="contact__form-btn"
                                    onClick={() => {
                                        setSubmitted(false)
                                        setFormData(initialState)
                                    }}>
                                    {t("another")}
                                </button>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit}>
                                <h2 className="contact__form-title">{t("message")}</h2>

                                <label className="contact__field">
                                    <span>{t("Full name")}</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Smith"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label className="contact__field">
                                    <span>{t("Номер телефона")}</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+998 90 123 45 67"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label className="contact__field">
                                    <span>{t("Сообщение")}</span>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us what you need..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <button type="submit" className="contact__form-btn">
                                    {t("message")}
                                </button>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>

            <div className="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3248.230692956812!2d69.136341!3d41.200520000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDEyJzAxLjkiTiA2OcKwMDgnMTAuOCJF!5e1!3m2!1sen!2s!4v1762319654663!5m2!1sen!2s" style={{ width: "100%", height: "450px", border: "0px" }} loading="lazy"></iframe>
            </div>
        </section >
    )
}

export default Contact