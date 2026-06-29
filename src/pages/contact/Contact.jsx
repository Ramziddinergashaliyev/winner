import React, { useState } from 'react'
import "./contact.scss"

const Contact = () => {
    const [form, setForm] = useState({ name: "", phone: "", message: "" })
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

                <div className="contact__head">
                    <h1 className="contact__title">
                        Let's talk <span>lubricants.</span>
                    </h1>
                    <p className="contact__subtitle">
                        Questions about products, distribution, or partnership —
                        our team replies within one business day.
                    </p>
                </div>

                <div className="contact__grid">

                    <div className="contact__info">
                        <div className="contact__card">
                            <span className="contact__card-mark" />
                            <div className="contact__card-body">
                                <span className="contact__card-label">Address</span>
                                <p className="contact__card-text">
                                    Яккасарайский р-н, "Мухандислар МФЙ", <br /> ул.Мукими дом 2
                                </p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <span className="contact__card-mark" />
                            <div className="contact__card-body">
                                <span className="contact__card-label">Phone</span>
                                <p className="contact__card-text">
                                    <a href="tel:+998712001122">+998 71 200 11 22</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <span className="contact__card-mark" />
                            <div className="contact__card-body">
                                <span className="contact__card-label">Email</span>
                                <p className="contact__card-text">
                                    <a href="mailto:info@winner-lubricants.com">
                                        info@winner-lubricants.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact__card">
                            <span className="contact__card-mark" />
                            <div className="contact__card-body">
                                <span className="contact__card-label">Working hours</span>
                                <p className="contact__card-text">
                                    Mon – Sat, 09:00 – 18:00
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="contact__form-wrap">
                        {submitted ? (
                            <div className="contact__success">
                                <span className="contact__success-mark">✓</span>
                                <h3>Message sent</h3>
                                <p>Thanks for reaching out — we&apos;ll get back to you shortly.</p>
                                <button
                                    type="button"
                                    className="contact__form-btn"
                                    onClick={() => {
                                        setSubmitted(false)
                                        setForm({ name: "", phone: "", message: "" })
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
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact