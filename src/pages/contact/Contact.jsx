import React, { useState } from 'react'
import './contact.scss'
import Reveal from '../../components/reveal/Reveal'

const infoCards = [
    {
        label: 'Address',
        content: (
            <>
                Яккасарайский р-н, &quot;Мухандислар МФЙ&quot;, <br /> ул.Мукими дом 2
            </>
        ),
    },
    {
        label: 'Phone',
        content: (
            <>
                <a href="tel:+998712814930">+998 71 281 49 30</a>
                <a href="tel:+998712032031">+998 71 203 20 31</a>
            </>
        ),
    },
    {
        label: 'Email',
        content: <a href="mailto:info@gpggroup.uz">info@gpggroup.uz</a>,
    },
]

const Contact = () => {
    const [form, setForm] = useState({ name: '', phone: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className="contact">
            <div className="contact__container container">
                <Reveal as="div" className="contact__head" variant="up">
                    <span className="contact__eyebrow">Get in touch</span>
                    <h1 className="contact__title">
                        Let&apos;s talk <span>lubricants.</span>
                    </h1>
                    <p className="contact__subtitle">
                        Questions about products, distribution, or partnership —
                        our team replies within one business day.
                    </p>
                </Reveal>

                <div className="contact__grid">
                    <div className="contact__info">
                        {infoCards.map((card, index) => (
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
                                <h3>Message sent</h3>
                                <p>Thanks for reaching out — we&apos;ll get back to you shortly.</p>
                                <button
                                    type="button"
                                    className="contact__form-btn"
                                    onClick={() => {
                                        setSubmitted(false)
                                        setForm({ name: '', phone: '', message: '' })
                                    }}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit}>
                                <h2 className="contact__form-title">Send a message</h2>

                                <label className="contact__field">
                                    <span>Full name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Smith"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label className="contact__field">
                                    <span>Phone number</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+998 90 123 45 67"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <label className="contact__field">
                                    <span>Message</span>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us what you need..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>

                                <button type="submit" className="contact__form-btn">
                                    Send message
                                </button>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default Contact
