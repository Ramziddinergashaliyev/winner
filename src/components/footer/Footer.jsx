import React, { useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import { NavLink } from 'react-router-dom'
import 'react-international-phone/style.css'
import Reveal from '../reveal/Reveal'
import './footer.scss'

const PRODUCT_LINKS = [
    { label: 'Motor oils for passenger cars and light commercial vehicles', href: '/ategories/1' },
    { label: 'Motor oils for diesel engines', href: '/categories/2' },
    { label: 'Transmission fluid', href: '/categories/3' },
    { label: 'Hydraulic fluid', href: '/categories/4' },
    { label: 'Antifreeze', href: '/categories/5' },
    { label: 'Window washers', href: '/categories/6' },
]

const COMPANY_LINKS = [
    { label: 'About', href: '/about' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Distributor', href: '/distrbuter' },
    { label: 'Contact', href: '/contact' },
]

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
    </svg>
);

export default function Footer() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Footer form submitted:", form);
    };

    return (
        <footer className="site-footer">
            <div className="container">
                <Reveal as="div" className="site-footer__container site-footer__grid" variant="up">

                    <nav className="site-footer__col site-footer__col--bordered" aria-label="Products">
                        <h3 className="site-footer__heading">Products</h3>

                        <ul>
                            {PRODUCT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <NavLink to={link.href}>{link.label}</NavLink>
                                </li>
                            ))}
                        </ul>

                    </nav>

                    <nav className="site-footer__col site-footer__col--bordered" aria-label="Company">
                        <h3 className="site-footer__heading">Company</h3>

                        <ul>
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.label}>
                                    <NavLink to={link.href}>{link.label}</NavLink>
                                </li>
                            ))}
                        </ul>

                    </nav>

                    <div className="site-footer__col">
                        <h3 className="site-footer__heading">Contacts</h3>

                        <div className="site-footer__contact-item">
                            <span className="site-footer__icon"><PhoneIcon /></span>
                            <a className="site-footer__value" href="tel:+998712814930">
                                +998 71 281 49 30
                            </a>
                        </div>

                        <div className="site-footer__contact-item">
                            <span className="site-footer__icon"><PhoneIcon /></span>
                            <a className="site-footer__value" href="tel:+998712032031">
                                +998 71 203 20 31
                            </a>
                        </div>

                        <div className="site-footer__contact-item">
                            <span className="site-footer__icon"><MapPinIcon /></span>
                            <p className="site-footer__address">
                                Yakkasaray district, MFY "Muhandislar", Muqimi street, house 2
                            </p>
                        </div>

                        <div className="site-footer__contact-item">
                            <span className="site-footer__icon"><MailIcon /></span>
                            <a className="site-footer__value" href="mailto:infowin@gpggroup.uz">
                                infowin@gpggroup.uz
                            </a>
                        </div>
                    </div>

                    <div className="site-footer__col site-footer__col--form">
                        <div className="site-footer__form-card">
                            <h3 className="site-footer__heading site-footer__heading--light">Оставить сообщение</h3>

                            <form className="site-footer__form" onSubmit={handleSubmit}>
                                <label className="site-footer__sr-only" htmlFor="footer-name">
                                    Имя
                                </label>

                                <input
                                    id="footer-name"
                                    type="text"
                                    placeholder="Имя"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    required
                                />

                                <div className="site-footer__phone">
                                    <label className="site-footer__sr-only" htmlFor="footer-phone">
                                        Номер телефона
                                    </label>

                                    <PhoneInput
                                        defaultCountry="uz"
                                        value={form.phone}
                                        onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
                                        className="site-footer__phone-input"
                                        inputProps={{ id: "footer-phone", name: "phone", required: true }}
                                    />
                                </div>

                                <label className="site-footer__sr-only" htmlFor="footer-email">
                                    Электронная почта
                                </label>

                                <input
                                    id="footer-email"
                                    type="email"
                                    placeholder="Электронная почта"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    required
                                />

                                <label className="site-footer__sr-only" htmlFor="footer-message">
                                    Сообщение
                                </label>

                                <textarea
                                    id="footer-message"
                                    placeholder="Сообщение"
                                    rows={3}
                                    value={form.message}
                                    onChange={handleChange("message")}
                                />

                                <button type="submit" className="site-footer__submit">
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="site-footer__bottom">
                <div className="container site-footer__bottom-inner">
                    <span>© {new Date().getFullYear()} WINNER. All rights reserved.</span>
                    <NavLink>Privacy Policy</NavLink>
                </div>
            </div>
        </footer>
    );
}